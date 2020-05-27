import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import Header from './headerComponent';
import Footer from './footerComponent';
import Home from './homeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './menuComponent';

class Main extends Component{

    constructor(props){
        super(props);
        this.state = {
            dishes:DISHES,
            selectedDish:null
        }
    }

    onDishSelect(dishId){
        this.setState({selectedDish:dishId});
    }

    render(){
        return(
            <>
            <Header/>
            
            <Switch>
            <Route path="/home" component={()=><Home/>}/>
            <Route path="/menu" component={()=><Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/>}/>
            <Route path="/home" component={()=><Home/>}/>
            <Redirect to="/home"/>
            </Switch>
            <Footer/>
            {/* <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/> */}
            {/* <DishDetail dish={this.state.dishes.filter((dish)=>dish.id === this.state.selectedDish)[0]}/> */}
            
            </>
        );
    }
}

export default Main;
