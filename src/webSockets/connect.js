import { Client } from '@stomp/stompjs';

const token = localStorage.getItem('token'); 
const stompClient = new Client({
    brokerURL: 'ws://localhost:8080/ws',
    connectHeaders: {
      Authorization: `Bearer ${token}`
    },
    onConnect: () => {
      console.log('Conectado con autenticación');
    },
    onStompError: (error) => {
      console.error('Error de STOMP:', error);
    },
  });

export const connect = (onMessageReceived) => {
  stompClient.onConnect = () => {
    console.log("Conectado a WebSocket");

    
    const userId = localStorage.getItem('email'); // Este ID lo determinas tú según tu aplicación
    stompClient.publish({
        destination: '/app/register',
        body: userId
    });


    
    stompClient.subscribe('/queue/specific-user/' + userId, (message) => {
        console.log('Mensaje recibido para mí:', message.body);
        onMessageReceived( message.body);

    });
    // stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
    //   console.log("desdede mensajes");
      
    //   onMessageReceived((prev) => [...prev, message.body]);
    // });

  };

  stompClient.activate();
};

export const sendMessage = (msg) => {
  if (stompClient.connected) {
    
    stompClient.publish({
      destination: '/app/notify',
      body: JSON.stringify(msg),
    });
  }
};

export const disconnect = () => {
  if (stompClient) stompClient.deactivate();
};
