import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function AboutCrop({ crop }) {
    return (
        <ListGroup as="ul">
            <ListGroup.Item action className='text-capitalize'>
                <span>Farmer Name: </span>
                <span>{crop?.user?.name}</span>
            </ListGroup.Item>
            <ListGroup.Item action className='text-capitalize'>
                Crop Name: <span>{crop?.name}</span>
            </ListGroup.Item>
            <ListGroup.Item action className='text-capitalize'>
                Type: <span>{crop?.type}</span>
            </ListGroup.Item>
            <ListGroup.Item action className='text-capitalize'>
                Price per Unit: <span>₹{crop?.price}</span>
            </ListGroup.Item>
            <ListGroup.Item action className='text-capitalize'>
                Harvest Year: <span>{!crop?.harvestYear ? "Not mentioned" : crop?.harvestYear}</span>
            </ListGroup.Item>
            <ListGroup.Item action className='text-capitalize'>
                Yield Category: <span>{crop?.yieldCategory}</span>
            </ListGroup.Item>
            <ListGroup.Item action className='text-capitalize'>
                Organic: <span>{crop?.organic ? "Yes" : "No"}</span>
            </ListGroup.Item>
        </ListGroup>
    );
}
