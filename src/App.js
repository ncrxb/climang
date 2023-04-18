import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import myImage from './k.png';
import { getAuth, signInAnonymously } from "firebase/auth";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import Clima from './clima';

import { getRandomCity } from './utils';

//import { async } from '@firebase/util';


function App() {
  const login = () => {
    signInAnonymously(getAuth()).then(usuario => console.log(usuario));
  }

  const activarMensajes = async ()=>{
    const token = await getToken(messaging, {
      vapidKey:"BMytynGgDFAhCOTtlS7Ikr0N3y2RKo8qB7MnEWS54bPMmKkx3q8XwA3O0ic5IscsnfQMGoRTPR9gXOrntE7DBrA"
    }).catch(error => console.log("Error al generar el token"));

    if(token) console.log("Este es tu token: "+ token);
    if(!token) console.log("Error en generar el token")
  }

  React.useEffect(()=>{
    onMessage(messaging, message=>{
      console.log("Tu mensaje: ", message);
      toast(message.notification.title);
    })

  }, []);

  return (
    <div >
    <Clima city={getRandomCity()} />
    <ToastContainer />
    <div style={{ 
  display: 'flex', 
  justifyContent: 'flex-end', // alinea los elementos al final del contenedor
  gap: '20px',  
  backgroundColor: 'black', 
  height: 200,
}}>
  <button onClick={login} style={{ 
    height: 100, 
    backgroundColor: '#4CAF50', 
    color: 'white', 
    padding: '12px 20px', 
    border: 'none', 
    borderRadius: '90px', 
    cursor: 'pointer', 
    fontSize: 25,
    flexGrow: 1 // hace que el botón se expanda para llenar el espacio sobrante
  }}>
    LOGIN
  </button>
  <button onClick={activarMensajes} style={{  
    height: 100, 
    backgroundColor: ' #ff1a1a', 
    color: 'white', 
    padding: '12px 20px', 
    border: 'none', 
    borderRadius: '100px', 
    cursor: 'pointer', 
    fontSize: 25,
    flexGrow: 1 // hace que el botón se expanda para llenar el espacio sobrante
  }}>
    TOKEN
  </button>
</div>
    
  </div>
);

}

export default App;
/*
return (
    <div className="App">
      <header className="App-header">
        <img src={myImage} className="App-logo" alt="logo" />
        <h4>Hello world</h4>
        <p>
          Oh no you didn't start the code
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
*/