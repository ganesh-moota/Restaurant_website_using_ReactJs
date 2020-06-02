import React,{Component} from 'react';
import { Navbar, NavbarBrand,Nav, NavItem,Jumbotron, Collapse, NavbarToggler, Modal, ModalHeader, ModalBody, Button,Form, FormGroup, Label, Input } from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component{

    constructor(props){
        super(props);

        this.state = {
            isNavOpen:false,
            isModalOpen:false,
        }
    }

    handleLogin = (event) => {
        this.toggleModal();

        alert("Username : "+this.username.value+", Password : "+this.password.value+", Remember : "+this.remember.value);
        event.preventDefault();
    }

    toggleNav = () => {
        this.setState({
            isNavOpen:!this.state.isNavOpen,
        });
    }

    toggleModal = () => {
        this.setState({
            isModalOpen:!this.state.isModalOpen,
        });
    }

    render(){
        return(
            <>
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className="mr-auto" href="/home">
                        <img src="assets/images/logo.png" width="41" height="30" alt="Ristorante Con Fusion"></img>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span><i className="fa fa-home fa-lg"></i></span> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/aboutus">
                                    <span><i className="fa fa-info fa-lg"></i></span> About Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu">
                                    <span><i className="fa fa-list fa-lg"></i></span> Menu
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/contactus">
                                    <span><i className="fa fa-address-card fa-lg"></i></span> Contact Us
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span>Login</Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                        <h1>Ristorante con Fusion</h1>
                        <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username" innerRef={(input)=>this.username=input}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" innerRef={(input)=>this.password=input}></Input>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="remember" innerRef={(input)=>this.remember=input}/>Remember me
                            </Label>                    
                        </FormGroup>
                        <Button type="submit" color="primary" value="submit" onClick={this.handleLogin}>Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
            </>
        );
    }
}

export default Header;