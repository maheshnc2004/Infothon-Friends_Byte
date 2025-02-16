// src/components/produce-details/produce-page-utilities/ProduceCard.js
import React from 'react';

export default function ProduceCard({ produce }) {
    return (
        <div className="produce-card">
            <h3>{produce.name}</h3>
            <p>Price: {produce.price}</p>
            <p>Quantity: {produce.quantity}</p>
        </div>
    );
}
