import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProductDetails } from '../../../api/ProductDetailService';
import { uploadProductImage } from '../../../api/UserService';
import { CustomContext } from '../../../context/AuthContext';
import { CropTypes } from '../../../data/Data';

export default function AddCrop() {
    const context = CustomContext();
    const navigate = useNavigate();
    const [cropTypes, setCropTypes] = useState([]);
    const [inputVal, setInputVal] = useState({ name: '', price: '', quantity: '' });
    const [selectOpt, setSelectOpt] = useState({ cropType: '', farmingMethod: '', season: '' });
    const [images, setImages] = useState([]);
    const seasons = ["Spring", "Summer", "Autumn", "Winter"];
    const farmingMethods = ["Organic", "Conventional", "Hydroponic"];

    useEffect(() => {
        setCropTypes(CropTypes);
    }, []);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setInputVal((prev) => ({ ...prev, [name]: value }));
    }

    function handleSelectChange(value, fieldName) {
        setSelectOpt((prev) => ({ ...prev, [fieldName]: value }));
    }

    function handleImageChange(event) {
        setImages([...event.target?.files]);
    }

    async function handleClick(event) {
        if (Object.values(inputVal).some(val => !val) || Object.values(selectOpt).some(val => !val)) {
            toast.error("Details cannot be empty!!", { position: "top-center" });
            event.preventDefault();
            return;
        }

        const farmerId = context?.user?.id;
        const productData = { ...inputVal, ...selectOpt };
        try {
            const response = await createProductDetails(farmerId, productData);
            toast.success("Product details added successfully!!", { position: "top-center" });
            const productId = response?.data?.id;
            uploadProductImage(productId, images).catch(() => {
                toast.error("Error while uploading images!!", { position: "top-center" });
            });
            navigate(`/product/${response.data?.name}`, { state: { productId } });
        } catch {
            toast.error("Couldn't add product details!!", { position: "top-center" });
        }
    }

    function handleReset() {
        setInputVal({ name: '', price: '', quantity: '' });
        setImages([]);
        setSelectOpt({ cropType: '', farmingMethod: '', season: '' });
    }

    return (
        <Container fluid="xl">
            <div className='add-product w-100 m-auto'>
                <div className='w-100 shadow p-3'>
                    <h1 className='fs-1 fw-bold text-center'>Add a Product</h1>
                    <Row className='my-2'>
                        <Col md={6} className='my-2'>
                            <Form.Label htmlFor='name'>Product Name</Form.Label>
                            <Form.Control type="text" placeholder='Enter Product Name' id="name" name="name" value={inputVal.name} onChange={handleInputChange} />
                        </Col>
                        <Col md={6} className='my-2'>
                            <Form.Label htmlFor='price'>Price</Form.Label>
                            <Form.Control type="number" placeholder='Enter Price' id="price" name="price" value={inputVal.price} onChange={handleInputChange} />
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col md={6} className='my-2'>
                            <Form.Label htmlFor='quantity'>Quantity</Form.Label>
                            <Form.Control type="number" placeholder='Enter Quantity' id="quantity" name="quantity" value={inputVal.quantity} onChange={handleInputChange} />
                        </Col>
                        <Col md={6} className='my-2'>
                            <Form.Label htmlFor='image'>Upload Product Images</Form.Label>
                            <Form.Control type="file" id='image' name="image" onChange={handleImageChange} multiple />
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col md={4} className="my-2">
                            <Dropdown>
                                <Dropdown.Toggle className='color-p w-100'> {selectOpt.cropType || 'Crop Type'} </Dropdown.Toggle>
                                <Dropdown.Menu className='dropdown-menu-dark'>
                                    {cropTypes.map((type, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            onClick={() => handleSelectChange(type, 'cropType')}
                                            style={{ color: '#000' }}
                                        >
                                            {type}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col md={4} className="my-2">
                            <Dropdown>
                                <Dropdown.Toggle className='color-p w-100'>{selectOpt.season || 'Season'}</Dropdown.Toggle>
                                <Dropdown.Menu className='dropdown-menu-dark'>
                                    {seasons.map((season, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            onClick={() => handleSelectChange(season, 'season')}
                                            style={{ color: '#000' }}
                                        >
                                            {season}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col md={4} className="my-2">
                            <Dropdown>
                                <Dropdown.Toggle className='color-p w-100'>{selectOpt.farmingMethod || 'Farming Method'}</Dropdown.Toggle>
                                <Dropdown.Menu className='dropdown-menu-dark'>
                                    {farmingMethods.map((method, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            onClick={() => handleSelectChange(method, 'farmingMethod')}
                                            style={{ color: '#000' }}
                                        >
                                            {method}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <div className='w-100 d-flex justify-content-center gap-3 my-4'>
                        <Button variant='secondary' className='w-50' onClick={handleReset}>Reset</Button>
                        <Button variant='success' className='w-50' onClick={handleClick}>Add Product</Button>
                    </div>
                </div>
            </div>
        </Container>
    );
}
