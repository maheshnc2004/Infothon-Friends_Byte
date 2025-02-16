import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomContext } from '../../context/AuthContext';

export default function Logout(props) {
    const context = CustomContext();

    return (
        <>
            <Modal show={props.show} onHide={props.toggle} aria-labelledby="logout-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="logout-modal-title">Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={() => {
                            props.toggle();
                            context.logout();
                        }}
                    >
                        Confirm
                    </Button>
                    <Button className='color-p' onClick={props.toggle}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
