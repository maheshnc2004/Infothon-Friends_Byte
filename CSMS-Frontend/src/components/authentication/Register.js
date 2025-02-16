import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUser, getSingleUser, updateUser, uploadUserProfileImage } from '../../api/UserService';
import { TOAST_PROP } from '../../App'
import { validateRegisterInfo } from '../../validation/validate'
import avatar from '../../assets/avatar.jpg';

export default function Register() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [inputVal, setInputVal] = useState({
        name: '', 
        email: '', 
        phone: '', 
        address: '', 
        city: '', 
        password: ''
    });

    const [role, setRole] = useState(state?.addRole || 'customer'); // Default to "customer"
    const [image, setImage] = useState(null);
    const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        if (role === "seller") {
            getSingleUser(state?.userId).then(res => {
                const registeredUser = res.data;
                setInputVal({
                    name: registeredUser?.name,
                    email: registeredUser?.email,
                    phone: registeredUser?.phone,
                    address: registeredUser?.address,
                    city: registeredUser?.city,
                    password: registeredUser?.password
                });
            }).catch(err => console.log(err));
        }
    }, [role, state]);

    function handleChange(event) {
        const { name, value } = event.target;
        setInputVal((prevVal) => ({ ...prevVal, [name]: value }));
    }

    function handleImageChange(event) {
        setImage(event.target.files[0]);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0] || avatar);
        fileReader.onload = () => setProfilePic(fileReader.result);
    }

    const handleClick = () => {
        if (!inputVal.name || !inputVal.email || !inputVal.password) {
            toast.error("Please fill all required fields");
            return;
        }

        const userData = { ...inputVal, role };

        if (role === "seller") {
            updateUser(state?.userId, userData, role).then(res => {
                localStorage.setItem("user", JSON.stringify(res.data));
                toast.success("Updated successfully!", { position: 'top-center' });
                navigate("/farmer-dashboard");
            }).catch(() => toast.error("Something went wrong!"));
        } else {
            createUser(userData).then(res => {
                localStorage.setItem("user", JSON.stringify(res.data));
                uploadUserProfileImage(res.data?.id, image).catch(console.log);
                toast.success("Registered successfully!", { position: 'top-center' });
                navigate("/customer-dashboard");
            }).catch(() => toast.error("Couldn't register user"));
        }
    };

    return (
        <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
            <h1 className='text-center my-3 text-p'>
                {role === "seller" ? "Confirm your Details" : 'Sign Up'}
            </h1>
            <Form className='w-75 py-3'>
                <Row>
                    <Col className='profile my-2'>
                        <div className='w-100 d-flex justify-content-center align-items-center'>
                            <label htmlFor="profile" style={{ cursor: 'pointer' }}>
                                <Image src={profilePic || avatar} className="rounded-circle" style={{ width: '10rem', maxHeight: '10rem' }} />
                            </label>
                            <input type='file' id="profile" onChange={handleImageChange} style={{ display: 'none' }} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} xs={12} className='my-2'>
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control name="name" id="name" type='text' placeholder='Enter your name' onChange={handleChange} value={inputVal.name} />
                    </Col>
                    <Col md={6} xs={12} className='my-2'>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control name="email" id="email" type='email' placeholder='Enter email' onChange={handleChange} value={inputVal.email} />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} xs={12} className='my-2'>
                        <Form.Label htmlFor="phone">Phone</Form.Label>
                        <Form.Control name="phone" id="phone" type='number' placeholder='Enter phone' onChange={handleChange} value={inputVal.phone} />
                    </Col>
                    <Col md={6} xs={12} className='my-2'>
                        <Form.Label htmlFor="address">Address</Form.Label>
                        <Form.Control name="address" id="address" type='text' placeholder='Enter address' onChange={handleChange} value={inputVal.address} />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} xs={12} className='my-2'>
                        <Form.Label htmlFor="city">City</Form.Label>
                        <Form.Control name="city" id="city" type='text' placeholder='Enter city' onChange={handleChange} value={inputVal.city} />
                    </Col>
                    <Col md={6} xs={12} className='my-2'>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control name="password" id="password" type='password' placeholder='Enter password' onChange={handleChange} value={inputVal.password} />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className='my-2'>
                        <Form.Label htmlFor="role">Role</Form.Label>
                        <Form.Control as="select" name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="customer">Customer</option>
                            <option value="seller">Farmer</option>
                        </Form.Control>
                    </Col>
                </Row>
                <div className='d-flex justify-content-center mt-4'>
                    <Button color='color-p' className='w-50' onClick={handleClick}>
                        {role === "seller" ? "Confirm" : 'Register'}
                    </Button>
                </div>
                {role !== "seller" && <div className='text-center mt-4'>Already registered? Then Login!!</div>}
            </Form>
        </div>
    );
}
