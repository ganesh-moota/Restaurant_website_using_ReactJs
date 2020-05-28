import React, { Component } from 'react';
import Header from './headerComponent';
import Footer from './footerComponent';
import Home from './homeComponent';
import Menu from './menuComponent';
import Contact from './contactComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { Switch, Route, Redirect } from 'react-router-dom';
import DishDetail from './dishDetailComponent';

class Main extends Component{

    constructor(props){
        super(props);
        this.state = {
            dishes:DISHES,
            comments:COMMENTS,
            leaders:LEADERS,
            promotions:PROMOTIONS
        }
    }

    HomePage = () => {
        return(
            <Home 
                dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
                leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
                promotion={this.state.promotions.filter((promo)=>promo.featured)[0]}
            />
        );
    }

    DishwithId = ({match}) => {
        return(
            <DishDetail dish={this.state.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
            comments={this.state.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}/>
        );
    }

    render(){
        return(
            <>
            <Header/>
            <Switch>
                <Route path="/home" component={this.HomePage}/>
                <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/>}/>
                <Route path="/menu/:dishId" component={this.DishwithId}/>
                <Route exact path="/contactus" component={Contact}/>
                <Redirect to="/home"/>
            </Switch>
            <Footer/>
            </>
        );
    }
}

export default Main;
