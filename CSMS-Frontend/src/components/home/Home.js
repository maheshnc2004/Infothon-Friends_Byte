import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { getAllProduceDetails } from '../../api/ProduceService'; // Updated service
import HomeProducePic from '../../assets/farm1.png' // Replace with a relevant image
import ProduceCard from '../produce-details/produce-page-utilities/ProduceCard' // Updated component

export default function Home() {
    const navigate = useNavigate();
    const [produce, setProduce] = useState([]);

    useEffect(() => {
        getAllProduceDetails().then(res => {
            setProduce(res.data);
        }).catch(err => {
            toast.error("Failed to load produce!!", {
                position: 'top-center',
                hideProgressBar: true
            });
        });
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className='hero-section position-relative d-flex justify-content-end align-items-center mt-5'>
                <div className='text-light mx-3 text-capitalize tracking-in-expand' style={{ width: '26rem', fontSize: '3.5rem' }}>
                    <h1 className="">Find Fresh Products for Your Needs!</h1>
                    <div className='w-100 d-flex justify-content-start'>
                        <Button className='p-3 color-p puff-in-center' onClick={() => navigate("/produce-gallery")}>
                            Browse Here
                        </Button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-3">
                <Container fluid>
                    <Row>
                        <Col md={6} className='d-flex justify-content-center flex-column px-5'>
                            <h2 className='pb-3 fw-bold'>About Us</h2>
                            <p>
                                We connect farmers with customers looking for fresh, organic, and local produce. Our platform
                                empowers farmers by giving them a space to showcase their goods, and customers can easily browse
                                and purchase high-quality products.
                            </p>
                        </Col>
                        <Col md={6} className="d-flex justify-content-center p-0">
                            <div>
                                <img src={HomeProducePic} alt="About Us" className="shadow img-fluid" style={{ borderRadius: '50%' }} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Recent Produce Display Section */}
            <section className='recent-produce'>
                <h2 className='fw-bolder ms-5 my-3'>Recent Listings</h2>
                <Container fluid={'xl'}>
                    <Row className='w-100 m-0 p-4'>
                        {produce?.slice(0, 3)?.map((item, index) => (
                            <Col lg={4} md={4} sm={6} xs={12} key={index} className="my-2">
                                <ProduceCard produce={item} />
                            </Col>
                        ))}
                    </Row>
                    <Link to="/produce-gallery">
                        <Button className='mt-2 mb-4 color-p'>View All Listings</Button>
                    </Link>
                </Container>
            </section>
        </div>
    );
}
