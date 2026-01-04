import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';


// Note: I will need to install date-fns or just use native date formatting
// For now native:
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

const ItemCard = ({ item, onDelete, isOwnPost }) => {
    return (
        <Card className="h-100 shadow-sm hover-scale">
            {item.image && (
                <Card.Img variant="top" src={`http://localhost:5000/${item.image}`} style={{ height: '200px', objectFit: 'cover' }} />
            )}
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title>{item.name}</Card.Title>
                    <Badge bg={item.type === 'lost' ? 'danger' : 'success'}>
                        {item.type.toUpperCase()}
                    </Badge>
                </div>
                <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>
                <Card.Text>
                    {item.description}
                </Card.Text>

                <div className="text-secondary small mb-3">
                    <div>📅 {formatDate(item.date)}</div>
                    <div>📍 {item.place}</div>
                    <div>📞 {item.contact}</div>
                </div>

                {isOwnPost && (
                    <Button variant="outline-danger" size="sm" onClick={() => onDelete(item._id)}>
                        Delete
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default ItemCard;
