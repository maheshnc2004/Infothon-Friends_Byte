import React, { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteCropDetails, getAllImagesByCropID } from '../../../api/CropDetailService'; // Update to crop API
import { TOAST_PROP } from '../../../App';
import cropPlaceholder from '../../../assets/crop-placeholder.jpg'; // Add a placeholder image for crops
import { CustomContext } from '../../../context/AuthContext';
import ConfirmModal from '../../../utilities/ConfirmModal';

export default function CropCard({ crop }) {

    const { pathname } = useLocation();
    const { isAuthenticated, user } = CustomContext();
    const [cropImages, setCropImages] = useState([]);
    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show);

    useEffect(() => {
        getAllImagesByCropID(crop?.id).then(res => {
            setCropImages(res.data);
        }).catch(err => {
            console.log(err);
            console.clear();
        });
    }, [crop?.id]);

    function handleDelete() {
        deleteCropDetails(crop?.id).then(res => {
            toast.success("Crop deleted successfully!!", TOAST_PROP);
        }).catch(err => {
            console.log(err);
            toast.error("Failed to delete crop", TOAST_PROP);
        });
    }

    return (
        <div>
            <Card className="w-100">
                <Card.Img 
                    variant="top" 
                    src={cropImages.length === 0 ? cropPlaceholder : cropImages[0] || cropImages[1]} 
                    style={{ width: '100%', height: '200px', objectFit: 'fill' }} 
                />
                <Card.Body>
                    <div className='text-capitalize d-flex justify-content-between' style={{ fontSize: '1.1rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>{crop?.name}</span>
                        <span>₹{crop?.price}</span>
                    </div>
                    <div className='d-flex justify-content-between my-2'>
                        <div className='d-flex flex-column text-capitalize'>
                            <span style={{ fontSize: '0.85rem' }} className='text-s fw-bold'>Year</span>
                            <span>{crop?.harvestYear !== null ? crop?.harvestYear : "NA"}</span>
                        </div>
                        <div className='d-flex flex-column text-capitalize'>
                            <span style={{ fontSize: '0.85rem' }} className='text-s fw-bold'>Yield</span>
                            <span>{crop?.yieldCategory}</span>
                        </div>
                    </div>
                    <Link to={`/crop/${crop?.name}`} state={{ cropId: crop?.id }}>
                        <Button className={'color-p w-100'}>
                            View Crop
                        </Button>
                    </Link>
                    {(isAuthenticated && (crop?.user?.name === user?.name) && pathname === "/users/profile") && (
                        <>
                            <Button variant='secondary' className='my-2 w-100' onClick={toggle}>
                                Delete
                            </Button>
                            <ConfirmModal 
                                show={show}
                                toggle={toggle}
                                title={"Delete Crop"}
                                body={"Are you sure you want to delete this crop and its details?"}
                                action={handleDelete}
                            />
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}
