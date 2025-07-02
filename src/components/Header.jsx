import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Image from 'react-bootstrap/Image';
import { FaPlus } from "react-icons/fa";

function Header(props) {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container> 
          <Navbar.Brand><img src={require('../components/logo.png')} className="img-fluid" style={{height:'40px'}}/></Navbar.Brand>
        <button type="button" className="btn btn-primary" onClick={props.onaddclick}>
                    <FaPlus className="mb-1" /> Add New Book
                  </button>
        </Container>

      </Navbar>
      
      {/* <Container className="side">
        <Nav >
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
      </Container> */}
    </>
  );
}

export default Header;
