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
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';


const mapStateToProps = (state) => {
    return {
        dishes:state.dishes,
        comments:state.comments,
        leaders:state.leaders,
        promotions:state.promotions,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment)),
    fetchDishes:()=>{dispatch(fetchDishes())},
    fetchComments:()=>{dispatch(fetchComments())},
    fetchPromos:()=>{dispatch(fetchPromos())},
    resetFeedbackForm:() => {dispatch(actions.reset('feedback'))}
});



class Main extends Component{

    // constructor(props){
    //     super(props);
    // }

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    AboutPage = () => {
        return(
            <About leaders={this.props.leaders}/>
        );
    }

    DishwithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
                isLoading={this.props.dishes.isLoading}
                errMsg={this.props.dishes.errMsg}
                comments={this.props.comments.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}
                commentsErrMsg={this.props.comments.errMsg}
                addComment={this.props.addComment} />
        );
    }

    HomePage = () => {
        return(
            <Home 
                dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMsg={this.props.dishes.errMsg}
                leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
                promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                promoLoading={this.props.promotions.isLoading}
                promoErrMsg={this.props.promotions.errMsg}
            />
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
                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}/>
                <Redirect to="/home"/>
            </Switch>
            <Footer/>
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
