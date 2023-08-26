
import './App.css';
import { BrowserRouter as Router, Routes, Route,Switch} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Alert from './components/Alert';

function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message,color,type)=>{
    setAlert({
      message : message,
      color:color,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  };
  return (
    <>
    <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Switch>
            <Route  path="/about"><About showAlert={showAlert}/></Route>
            <Route  path="/login" ><Login showAlert={showAlert}/></Route>
            <Route  path="/signup"><Signup showAlert={showAlert}/></Route>
            <Route exact path="/" ><Home showAlert={showAlert}/></Route> 
            </Switch>
          </div>
        </Router>
    </>
  );
}

export default App;
