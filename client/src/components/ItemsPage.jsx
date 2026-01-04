import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import ItemCard from '../components/ItemCard';

const ItemsPage = ({ type, title }) => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const typeParam = type.toLowerCase();
            const res = await axios.get(`/api/items?type=${typeParam}&search=${search}&category=${category}`, config);
            setItems(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [type, search, category]);

    return (
        <Container className="py-4">
            {/* Page Header */}
            <div className="page-header fade-in-up">
                <h1 className="page-title">{title}</h1>
                <p className="page-subtitle">Browse through items reported by your peers</p>
            </div>

            {/* Search & Filter */}
            <Row className="mb-4 g-3 fade-in-up">
                <Col md={7}>
                    <InputGroup>
                        <InputGroup.Text>🔍</InputGroup.Text>
                        <Form.Control
                            placeholder="Search by item name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={5}>
                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Laptop">💻 Laptop</option>
                        <option value="Phone">📱 Phone</option>
                        <option value="Wallet">👛 Wallet</option>
                        <option value="Documents">📄 Documents</option>
                        <option value="ID Card">🪪 ID Card</option>
                        <option value="Others">📦 Others</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* Items Grid */}
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mt-3">Loading items...</p>
                </div>
            ) : items.length > 0 ? (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {items.map((item, index) => (
                        <Col key={item._id} className={`fade-in-up delay-${(index % 3) + 1}`}>
                            <ItemCard item={item} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon">
                        {type === 'lost' ? '😢' : '🎉'}
                    </div>
                    <h3 className="empty-state-title">No items found</h3>
                    <p className="empty-state-text">Try adjusting your search or filters</p>
                </div>
            )}
        </Container>
    );
};

export default ItemsPage;
