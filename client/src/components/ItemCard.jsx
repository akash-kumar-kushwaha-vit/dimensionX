import React from 'react';
import { Card, Button } from 'react-bootstrap';

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
};

const ItemCard = ({ item, onDelete, isOwnPost }) => {
    return (
        <Card className="item-card">
            <div className="card-img-wrapper">
                {item.image ? (
                    <Card.Img
                        variant="top"
                        src={`http://localhost:5000/${item.image}`}
                        className="card-img-top"
                    />
                ) : (
                    <div className="d-flex align-items-center justify-content-center bg-light h-100 text-muted">
                        <span style={{ fontSize: '3rem' }}>📦</span>
                    </div>
                )}
                <div className={`card-badge ${item.type === 'lost' ? 'badge-lost' : 'badge-found'}`}>
                    {item.type}
                </div>
            </div>

            <div className="card-content">
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <div className="card-category">{item.category}</div>
                        <h3 className="card-title">{item.name}</h3>
                    </div>
                </div>

                <p className="card-desc">{item.description}</p>

                <div className="item-meta-row">
                    <div className="meta-item" title="Date Reported">
                        <span>📅</span>
                        <span>{formatDate(item.date)}</span>
                    </div>
                    <div className="meta-item text-truncate" style={{ maxWidth: '120px' }} title={item.place}>
                        <span>📍</span>
                        <span>{item.place}</span>
                    </div>
                </div>

                {/* Show contact only on hover or interaction? Keeping it visible for utility */}
                <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                    <div className="meta-item text-primary fw-bold" style={{ fontSize: '0.9rem' }}>
                        <span>📞 {item.contact}</span>
                    </div>
                    {isOwnPost && (
                        <Button
                            variant="link"
                            className="text-danger p-0 text-decoration-none"
                            onClick={() => onDelete(item._id)}
                        >
                            <small>Delete</small>
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default ItemCard;
