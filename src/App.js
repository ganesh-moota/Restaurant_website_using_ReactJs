import React, { Component } from 'react';
import  {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './components/menuComponent';
import { DISHES } from './shared/dishes';


class App extends Component{

  state = {
    dishes:DISHES,
  }

  render(){
    return(
      <>
        <Navbar dark color="primary">
          <div className="container">
          <NavbarBrand href="#">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes}/>
      </>
    );
  }
}

export default App;
