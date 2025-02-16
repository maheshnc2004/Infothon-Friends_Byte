import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function GetSellerDetails(props) {
    const crop = props.crop;  // Replacing car with crop

    return (
        <Modal show={props.show} onHide={props.toggle}>
            <Modal.Header closeButton>
                <Modal.Title className='text-p'>Farmer Details</Modal.Title> {/* Adjusted title */}
            </Modal.Header>
            <Modal.Body className='text-capitalize'>
                <p>Name : {crop?.user?.name}</p>
                <p>Email : {crop?.user?.email}</p>
                <p>Phone : {crop?.user?.phone}</p>
                <p>City : {crop?.user?.city}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.toggle}>
                    Close
                </Button>
                <Button className='color-p' onClick={props.toggle}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
