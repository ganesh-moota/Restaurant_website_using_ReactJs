import React, { Component } from 'react';

import Header from './headerComponent';
import Footer from './footerComponent';
import Home from './homeComponent';
import Menu from './menuComponent';
import Contact from './contactComponent';

import DishDetail from './dishDetailComponent';
import About from './aboutComponent';

import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import { connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        dishes:state.dishes,
        comments:state.comments,
        leaders:state.leaders,
        promotions:state.promotions,
    }
}

class Main extends Component{

    constructor(props){
        super(props);
    }

    HomePage = () => {
        return(
            <Home 
                dish={this.props.dishes.filter((dish)=>dish.featured)[0]}
                leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
                promotion={this.props.promotions.filter((promo)=>promo.featured)[0]}
            />
        );
    }

    DishwithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
            comments={this.props.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}/>
        );
    }

    AboutPage = () => {
        return(
            <About leaders={this.props.leaders}/>
        );
    }

    render(){
        return(
            <>
            <Header/>
            <Switch>
                <Route path="/home" component={this.HomePage}/>
                <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/>}/>
                <Route path="/menu/:dishId" component={this.DishwithId}/>
                <Route path="/aboutus" component={this.AboutPage} />
                <Route exact path="/contactus" component={Contact}/>
                <Redirect to="/home"/>
            </Switch>
            <Footer/>
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));
