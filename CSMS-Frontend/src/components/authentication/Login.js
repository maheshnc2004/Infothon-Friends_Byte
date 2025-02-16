import React, { useState, useContext } from 'react';
import { Button, Col, Form, FormGroup, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CustomContext } from '../../context/AuthContext';

export default function Login(props) {
    const navigate = useNavigate();
    const context = useContext(CustomContext);

    const [inputVal, setInputVal] = useState({
        email: '',
        password: '',
        role: 'customer' // Default role set to "customer"
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputVal((prevVal) => ({ ...prevVal, [name]: value }));
    };

    const handleClick = async (event) => {
        event.preventDefault();
        if (!inputVal.email || !inputVal.password) {
            alert("Please fill out all fields");
            return;
        }

        const loginPayload = {
            email: inputVal.email,
            password: inputVal.password,
            role: inputVal.role
        };

        try {
            await context?.login(loginPayload); // Wait for the login to complete

            // Role-based navigation after login
            if (inputVal.role === 'farmer') {
                navigate('/AddCrop');
            } else {
                navigate('/CropDetails');
            }

            // Close the modal after a successful login
            props.toggle();
        } catch (error) {
            console.error("Login failed", error);
            alert("Failed to log in. Please check your credentials.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Modal show={props.show} onHide={props.toggle} className="w-100 shadow" size="lg">
                <Modal.Header closeButton>
                    <h1 className="w-100 text-center text-p">Sign In to Continue</h1>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center gap-2 w-100 p-0">
                    <Row className="border w-100">
                        <Col md={6} className="p-0">
                            <div className="login-pic border"></div>
                        </Col>
                        <Col md={6}>
                            <Form className="px-3 py-3">
                                <FormGroup className="my-3">
                                    <Form.Label htmlFor="user_email">Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your email"
                                        name="email"
                                        id="user_email"
                                        onChange={handleChange}
                                        value={inputVal.email}
                                    />
                                </FormGroup>
                                <FormGroup className="my-3">
                                    <Form.Label htmlFor="user_password">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        name="password"
                                        id="user_password"
                                        onChange={handleChange}
                                        value={inputVal.password}
                                    />
                                </FormGroup>
                                <FormGroup className="my-3">
                                    <Form.Label htmlFor="user_role">Role</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="role"
                                        id="user_role"
                                        onChange={handleChange}
                                        value={inputVal.role}
                                    >
                                        <option value="customer">Buyer</option>
                                        <option value="farmer">Farmer</option>
                                    </Form.Control>
                                </FormGroup>
                                <Button className="w-100 my-3 color-p" onClick={handleClick}>
                                    Submit
                                </Button>
                                <div className="text-center w-100">
                                    <span
                                        onClick={() => {
                                            props.toggle();
                                            navigate("/register");
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Not a member? <span className="text-s text-decoration-underline">Register Here</span>
                                    </span>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}
