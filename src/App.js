import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'
import AppRouter from './routes/AppRouter';
import './styles/body.css'

function App() {
  return (
    <Provider store={store}>
      
      <AppRouter/>
    </Provider>
  );
}

export default App;
