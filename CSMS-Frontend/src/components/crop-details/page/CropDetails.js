import React, { useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

const CropDetails = () => {
  const [crops, setCrops] = useState([
    {
      name: 'Wheat',
      description: 'Wheat is a cereal grain that is widely cultivated for its seed.',
      price: 1500,
      quantity: '50 kg',
      location: 'Farm in Springfield',
      sellerName: 'John Doe',
    },
    {
      name: 'Rice',
      description: 'Rice is a staple food for more than half of the world’s population.',
      price: 1200,
      quantity: '30 kg',
      location: 'Green Valley Farms',
      sellerName: 'Jane Smith',
    },
    {
      name: 'Maize',
      description: 'Maize is a cereal grain first domesticated by indigenous peoples in southern Mexico.',
      price: 1400,
      quantity: '40 kg',
      location: 'Sunny Acres',
      sellerName: 'Mark Lee',
    },
    {
      name: 'Barley',
      description: 'Barley is a major cereal grain grown in temperate climates globally.',
      price: 1000,
      quantity: '20 kg',
      location: 'Blue Hills Farm',
      sellerName: 'Alice Johnson',
    },
  ]);

  const handleBuyNow = (cropName) => {
    alert(`Buying ${cropName} is currently under development.`);
  };

  return (
    <Container className="py-4">
      <Row>
        {crops.map((crop, index) => (
          <Col md={6} className="mb-4" key={index}>
            <Card className="p-3 shadow-lg">
              <Card.Body>
                <h2 className="text-capitalize mb-3">{crop.name}</h2>
                <p><strong>Description:</strong> {crop.description}</p>
                <p><strong>Price:</strong> ₹{crop.price} per {crop.quantity}</p>
                <p><strong>Available Quantity:</strong> {crop.quantity}</p>
                <p><strong>Location:</strong> {crop.location}</p>
                <p><strong>Seller:</strong> {crop.sellerName}</p>
                <Button variant="success" className="w-100 mt-3" onClick={() => handleBuyNow(crop.name)}>
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Useful Information Section */}
      <Row className="mt-5">
        <Col md={12}>
          <h3>Useful Information</h3>
          <ul>
            <li>Ensure the crops meet your quality requirements before purchase.</li>
            <li>Contact the seller for more details if necessary.</li>
            <li>Check local market prices to ensure a fair deal.</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default CropDetails;
