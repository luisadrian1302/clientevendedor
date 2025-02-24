import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { verificarUsuario } from '../../actions/AuthAction';
const Confirmacion = () => {

    const dispatch = useDispatch();
    const navegate = useNavigate();
    const { token } = useParams();
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  
  const handlePinChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSubmit = async () => {
   

     let text ="";
     
     pin.map(e =>{
        text = text + e;
     })
     const data ={
        code: text,
        correo: token
     }
     dispatch(verificarUsuario(data, navegate))
  
     

    

  }

  return (

    <Container className='w-md-50  mt-5'>

    <Col md={6} className="bg-white p-4 rounded-lg shadow-sm max-w-3xl mx-auto">
      {/* Navigation */}
    

      <div className="text-center">
        <h5 className="mb-4 text-base font-medium">Verificar correo electronico</h5>
        
        {/* Phone Icon */}
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-blue-500 p-3 w-16 h-16 flex items-center justify-center">
            <Mail  size={180} />
          </div>
        </div>

        {/* Phone Number and Instructions */}
        <p className="text-gray-500 mb-4">Coloque su pin</p>

        {/* PIN Input Fields */}
        <Row className="  mb-4 ">
            <Col lg={8} md={12} sm={9} className='d-flex m-auto '>
           
          {pin.map((digit, index) => (
            <Col className='' >
            <input
              key={index}
              id={`pin-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              className="text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={2}
              style={{width: "40px", height: "40px"}}
            />
            </Col>
            
          ))}
           </Col>
        </Row>

        {/* Buttons */}
        <Button  className="w-75 d-block m-auto btn-warning btn bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md mb-3"
        onClick={(e) => handleSubmit(e) }>
          Verificar PIN
        </Button>
        
        <button className=" w-50 d-block m-auto btn btn-outlet-dark text-gray-800 ">
          Volver a mandar PIN
        </button>
      </div>
    </Col>
    </Container>
    
  );
};

export default Confirmacion;
