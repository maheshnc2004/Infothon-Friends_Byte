import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Dropdown, FormControl, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBidding, getAllBiddingsByCropId } from '../../../api/BiddingService';
import { getAllImagesByCropID, getSingleCropDetails } from '../../../api/CropDetailService';
import { TOAST_PROP } from '../../../App';
import { CustomContext } from '../../../context/AuthContext';
import Login from '../../authentication/Login';
import AboutCrop from '../crop-page-utilities/AboutCrop';
import GetSellerDetails from '../crop-page-utilities/GetSellerDetails';

export default function CropPage() {
    const location = useLocation();
    const context = CustomContext();
    const navigate = useNavigate();

    const cropId = location.state?.cropId;
    const bidPrice = ["5000", "10000", "15000", "20000", "25000", "30000", "40000", "50000"];

    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show);

    const [showSellerDetail, setShowshowSellerDetail] = useState(false);
    const toggleSellerDetail = () => setShowshowSellerDetail(!showSellerDetail);

    const [crop, setCrop] = useState(null);
    const [cropImages, setCropImages] = useState([]);
    const [bidInput, setBidInput] = useState('');
    const [cropBiddings, setCropBiddings] = useState([]);
    const [isBidded, setIsBidded] = useState(null);

    function loadSingleCropDetails() {
        getSingleCropDetails(cropId).then(res => {
            setCrop(res.data);
        }).catch(err => {
            console.log(err);
            toast.error("Couldn't load crop details!!", TOAST_PROP);
        });
    }

    function loadCropImages() {
        getAllImagesByCropID(cropId).then(res => {
            setCropImages(res.data);
        }).catch(err => {
            console.log(err);
            toast.error("Couldn't load images!!", TOAST_PROP);
        });
    }

    function loadAllBiddingsOfCrop() {
        getAllBiddingsByCropId(cropId).then(res => {
            setCropBiddings(res.data);
        }).catch(err => {
            console.log(err);
            toast.error("Failed to load biddings", TOAST_PROP);
        });
    }

    useEffect(() => {
        loadSingleCropDetails();
        loadCropImages();
        loadAllBiddingsOfCrop();
    }, []);

    useEffect(() => {
        loadAllBiddingsOfCrop();
    }, [isBidded]);

    function submitBidding() {
        const bidData = { bidAmount: bidInput };
        if (crop?.user.id === context?.user?.id) {
            toast.error("You cannot bid on your own crop", TOAST_PROP);
            return;
        } else {
            toast.promise(createBidding(context?.user?.id, cropId, bidData), {
                pending: "Submitting...",
                error: "Error occurred while bidding!!",
                success: "Bidding added successfully!!"
            }).then(res => {
                setBidInput('');
            }).catch(err => console.log(err));
        }
    }

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <Carousel fade className='w-100 my-3 bg-dark'>
                        {cropImages.map((cropImage, index) => (
                            <Carousel.Item key={index} className="d-flex justify-content-center shadow">
                                <img
                                    className="d-block"
                                    src={cropImage}
                                    style={{ height: '70vh', width: '60vw', objectFit: 'fill' }}
                                    alt="Crop Pic"
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>

                <Col md={12} sm={12} xs={12}>
                    <Row>
                        <Col md={8}>
                            <div className='my-3'>
                                <div className='d-flex justify-content-between align-items-center my-3'>
                                    <h1 className='text-s'>About Crop</h1>
                                    <div className='w-25'>
                                        <Button className='color-p w-100 my-2'
                                            onClick={context?.isAuthenticated ? toggleSellerDetail : toggle}>
                                            Get Seller Details
                                        </Button>
                                        {context?.isAuthenticated
                                            ? <GetSellerDetails crop={crop} show={showSellerDetail} toggle={toggleSellerDetail} />
                                            : <Login show={show} toggle={toggle} />
                                        }
                                    </div>
                                </div>
                                <AboutCrop crop={crop} />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className='my-3 p-1'>
                                <h3>Make An Offer</h3>
                                <div className='my-2'>
                                    <span className='my-2'>Select A Bid Amount</span>
                                    <Dropdown className='w-100 my-2'>
                                        <Dropdown.Toggle className='color-p w-100'>
                                            <span className='w-100' onClick={() => setIsBidded(false)}>{bidInput === "" ? 'Amount' : "₹" + bidInput}</span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className='w-100 mt-2'>
                                            <div className='d-flex justify-content-center my-2'>
                                                <FormControl
                                                    className='w-75'
                                                    type="number"
                                                    placeholder='₹ Enter an amount'
                                                    value={bidInput}
                                                    onChange={(e) => setBidInput(e.target.value)}
                                                />
                                            </div>
                                            {bidPrice.map((bid, index) => (
                                                <Dropdown.Item key={index}
                                                    className='text-dark' onClick={(e) => {
                                                        setBidInput(bid);
                                                        setIsBidded(false);
                                                    }} as={"span"}>
                                                    ₹{bid}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                        <Button className='btn btn-sm btn-secondary mt-2'
                                            onClick={() => {
                                                context?.isAuthenticated ? submitBidding() : toggle();
                                                setIsBidded(true);
                                            }}>
                                            Submit
                                        </Button>
                                        <Login show={show} toggle={toggle} />
                                    </Dropdown><hr />

                                    <div className='my-3'>
                                        <h5>Recent Biddings</h5>
                                        {cropBiddings?.length !== 0 ?
                                            <div className='mt-3'>
                                                {cropBiddings?.slice(0, 2)?.map((bidding, index) => (
                                                    <Card className='my-2' key={index}>
                                                        <div className='d-flex justify-content-between align-items-center px-2'>
                                                            <p className='d-flex flex-column p-1 m-0'>
                                                                <span>Date</span>
                                                                <span>{bidding?.bidDate}</span>
                                                            </p>
                                                            <p className='d-flex flex-column p-1 m-0'>
                                                                <span>Amount</span>
                                                                <span>{"₹" + bidding?.bidAmount}</span>
                                                            </p>
                                                        </div>
                                                    </Card>
                                                ))}
                                                <Button className='color-p mt-1'
                                                    onClick={() => {
                                                        navigate("/bidding/dashboard",
                                                            { state: { crop: crop, biddings: cropBiddings } })
                                                    }}>
                                                    See All Biddings
                                                </Button>
                                            </div>
                                            : <div className='d-flex justify-content-center align-items-center' style={{ height: '15vh' }}>
                                                <h5 className='text-center'>No Biddings</h5>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
