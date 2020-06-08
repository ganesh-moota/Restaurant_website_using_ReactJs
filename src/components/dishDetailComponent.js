import React, { Component } from 'react';
import {Card,CardBody,CardText,CardImg,CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control,LocalForm, Errors } from 'react-redux-form';

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

function RenderComments({comments, addComment , dishId}){
    return(
        <div>
            <ul className="list-unstyled">
            {comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric',month: 'short',day: '2-digit'}).format(new Date(comment.date))}</p>
                    </li>
                );
            })
            }
            </ul>
            
            <CommentForm addComment={addComment} dishId={dishId}/>
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
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        );
    } else{
        return <div></div>;
    }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            isModalOpen:false,
        }
    }

    toggleModal = () => {
        this.setState({
            isModalOpen:!this.state.isModalOpen,
        });
    }

    handleSubmit = (values) => {
        this.props.addComment(this.props.dishId,values.rating,values.author,values.comment)
        this.toggleModal(); 
    }

    render(){
        return(
            <>
                <Button outline className="btn" onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-froup">
                                <Label md={12}>Rating</Label>
                                <Col>
                                    <Control.select 
                                            model=".rating" 
                                            id="rating" 
                                            name="rating"
                                            placeholder="rating"
                                            className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                    </Control.select>  
                                </Col>
                            </Row>
                            <Row className="form-froup">
                                <Label md={12}>Your Name</Label>
                                <Col>
                                    <Control.text 
                                        model=".author" 
                                        id="author" 
                                        name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength:minLength(3),
                                            maxLength:maxLength(15)
                                        }}
                                    />
                                    <Errors className="text-danger"
                                        model=".author"
                                        show="touched" 
                                        messages=
                                        {{
                                            required:"Required",
                                            minLength:"Must be atleast 3 characters long",
                                            maxLength:"Must be 15 characters or less"
                                        }}
                                    />  
                                </Col>
                            </Row>
                            <Row className="form-froup">
                                <Label md={12}>Comment</Label>
                                <Col>
                                    <Control.textarea 
                                            model=".comment" 
                                            id="comment" 
                                            name="comment"
                                            placeholder=""
                                            rows="6"
                                            className="form-control"
                                    />  
                                </Col>
                            </Row>
                            <Row className="form-group mt-2">
                                <Col>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default DishDetail;