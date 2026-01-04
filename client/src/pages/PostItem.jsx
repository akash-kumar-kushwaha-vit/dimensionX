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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            };

            await axios.post('/api/items', data, config);
            navigate(formData.type === 'lost' ? '/lost-items' : '/found-items');
        } catch (error) {
            console.error(error);
            setError('Failed to post item. Please try again.');
        }
    };

    return (
        <Container className="d-flex justify-content-center">
            <Card className="p-4 shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="mb-4 text-center">Post an Item</h2>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mb-3"
                    >
                        <option value="lost">I Lost Something 😢</option>
                        <option value="found">I Found Something 🎉</option>
                    </Form.Select>

                    <Form.Group className="mb-3">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control type="text" name="name" required onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select name="category" value={formData.category} onChange={handleChange}>
                            <option>Laptop</option>
                            <option>Phone</option>
                            <option>Wallet</option>
                            <option>Documents</option>
                            <option>ID Card</option>
                            <option>Others</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" required onChange={handleChange} />
                    </Form.Group>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name="date" required onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" name="place" placeholder="e.g. Library" required onChange={handleChange} />
                        </div>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Contact Info</Form.Label>
                        <Form.Control type="text" name="contact" placeholder="Email or Phone" required onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Upload Image (Optional)</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Post Item
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default PostItem;
