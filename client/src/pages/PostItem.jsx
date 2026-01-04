import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PostItem = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: 'lost',
        name: '',
        category: 'Others',
        description: '',
        date: '',
        place: '',
        contact: ''
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);

        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/items', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            navigate(formData.type === 'lost' ? '/lost-items' : '/found-items');
        } catch (error) {
            console.error(error);
            setError('Failed to post item. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="py-4 d-flex justify-content-center">
            <Card className="p-4 fade-in-up" style={{ maxWidth: '600px', width: '100%' }}>
                <div className="text-center mb-4">
                    <div className="feature-icon mx-auto mb-3">
                        {formData.type === 'lost' ? '😢' : '🎉'}
                    </div>
                    <h2 className="page-title">Post an Item</h2>
                    <p className="page-subtitle">Help connect items with their owners</p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="form-select-lg"
                        >
                            <option value="lost">😢 I Lost Something</option>
                            <option value="found">🎉 I Found Something</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="What is the item?"
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select name="category" value={formData.category} onChange={handleChange}>
                            <option value="Laptop">💻 Laptop</option>
                            <option value="Phone">📱 Phone</option>
                            <option value="Wallet">👛 Wallet</option>
                            <option value="Documents">📄 Documents</option>
                            <option value="ID Card">🪪 ID Card</option>
                            <option value="Others">📦 Others</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            placeholder="Describe the item in detail..."
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name="date" required onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="place"
                                placeholder="e.g. Library, Cafeteria"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Contact Info</Form.Label>
                        <Form.Control
                            type="text"
                            name="contact"
                            placeholder="Email or Phone number"
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Upload Image (Optional)</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                        <Form.Text className="text-muted">
                            Adding a photo helps others identify your item
                        </Form.Text>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 btn-lg"
                        disabled={submitting}
                    >
                        {submitting ? 'Posting...' : '🚀 Post Item'}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default PostItem;
