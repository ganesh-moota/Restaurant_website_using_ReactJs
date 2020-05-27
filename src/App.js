import React, { Component } from 'react';
import  {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './components/menuComponent';


class App extends Component{
  render(){
    return(
      <>
        <Navbar dark color="primary">
          <div className="container">
          <NavbarBrand href="#">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu/>
      </>
    );
  }
}

export default App;
