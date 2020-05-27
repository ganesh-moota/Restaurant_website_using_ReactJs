import React,{Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay} from 'reactstrap';
// import {DISHES} from '../shared/dishes'

class Menu extends Component{
    constructor(props){
        super(props);

        this.state = {
            selectedDish:null,
        }
    }

    onDishSelect(dish){
        this.setState({
            selectedDish:dish,
        });
    }

    renderDish(dish){
        if(dish!=null){
            return(
                <Card>
                    <CardImg src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>
                </Card>
            );
        }else{
            return <div></div>;
        }
    }
    render(){
        const menu = this.props.dishes.map((dish) =>{
            return(
                <div className="col-12 col-md-5  m-1">
                    <Card key={dish.id} onClick={()=>{this.onDishSelect(dish)}}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    <div className="col-12 m-1">
                        {this.renderDish(this.state.selectedDish)}
                    </div>
                </div>
            </div>
        );
    }        
}

export default Menu;