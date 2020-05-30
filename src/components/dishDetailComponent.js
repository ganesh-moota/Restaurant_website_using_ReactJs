import React from 'react';
import {Card,CardBody,CardText,CardImg,CardTitle, Breadcrumb, BreadcrumbItem,} from 'reactstrap';
import {Link} from 'react-router-dom';

    function RenderDish({dish}){
        return(
            <Card>
                <CardImg src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>
                        {dish.description}
                    </CardText>
                </CardBody>
            </Card> 
        );
    }

    function RenderComments({comments}){
        return(
            <div>
                {comments.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric',month: 'short',day: '2-digit'}).format(new Date(comment.date))}</p>
                        </div>
                );
                })
                }
            </div>
        );
    }

    function DishDetail(props){
        if(props.dish != null){
            return(
                <div className="row">
                    <div className="col-12">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/menu">Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                        <RenderComments comments={props.comments}/>
                        </ul>
                    </div>
                </div>
            );
        } else{
            return <div></div>;
        }
    }

export default DishDetail;