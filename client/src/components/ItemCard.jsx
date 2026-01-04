import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Calendar, MapPin, Phone, Trash2, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

const ItemCard = ({ item, onDelete, isOwnPost }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleMessage = () => {
        // Navigate to chat with the owner data passed in state
        if (item.postedBy) {
            navigate('/chat', { state: { startChatWith: item.postedBy } });
        }
    };

    return (
        <Card className="premium-card">
            <div className="card-img-container">
                {item.image ? (
                    <Card.Img
                        variant="top"
                        src={`${API_BASE_URL}/${item.image}`}
                        className="card-img-content"
                    />
                ) : (
                    <div className="d-flex align-items-center justify-content-center bg-light h-100 text-muted">
                        <span style={{ fontSize: '4rem' }}>📦</span>
                    </div>
                )}

                <div className="category-badge">{item.category}</div>
                <div className={`status-badge ${item.type === 'lost' ? 'status-lost' : 'status-found'}`}>
                    {item.type}
                </div>
            </div>

            <div className="card-body-content">
                <h3 className="h5 fw-bold mb-2 text-dark">{item.name}</h3>
                <p className="text-muted mb-4 small line-clamp-2" style={{ lineHeight: '1.6', height: '3.2em', overflow: 'hidden' }}>
                    {item.description}
                </p>

                <div className="card-meta d-flex flex-column gap-2">
                    <div className="d-flex w-100 align-items-center gap-2 text-secondary">
                        <Calendar size={16} className="text-primary" />
                        <span>{formatDate(item.date)}</span>
                    </div>
                    <div className="d-flex w-100 align-items-center gap-2 text-secondary">
                        <MapPin size={16} className="text-secondary" />
                        <span className="text-truncate">{item.place}</span>
                    </div>
                </div>

                <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2 text-dark fw-medium small">
                        <Phone size={14} className="text-success" />
                        {item.contact}
                    </div>

                    <div className="d-flex gap-2">
                        {/* Message Button (Only if not own post) */}
                        {!isOwnPost && item.postedBy && item.postedBy._id !== user?._id && (
                            <Button
                                variant="light"
                                size="sm"
                                className="text-primary bg-primary bg-opacity-10 border-0 rounded-circle p-2 d-flex align-items-center"
                                onClick={handleMessage}
                                title="Message Owner"
                            >
                                <MessageCircle size={16} />
                            </Button>
                        )}

                        {/* Delete Button (Only if own post) */}
                        {isOwnPost && (
                            <Button
                                variant="light"
                                size="sm"
                                className="text-danger bg-danger bg-opacity-10 border-0 rounded-circle p-2 d-flex align-items-center"
                                onClick={() => onDelete(item._id)}
                                title="Delete Post"
                            >
                                <Trash2 size={16} />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ItemCard;
