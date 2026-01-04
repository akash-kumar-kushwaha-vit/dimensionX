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
            // Ensure type is lowercase for API
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
        <Container>
            <h2 className="mb-4">{title}</h2>

            <Row className="mb-4">
                <Col md={6}>
                    <InputGroup>
                        <Form.Control
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={4}>
                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Phone">Phone</option>
                        <option value="Wallet">Wallet</option>
                        <option value="Documents">Documents</option>
                        <option value="ID Card">ID Card</option>
                        <option value="Others">Others</option>
                    </Form.Select>
                </Col>
            </Row>

            {loading ? <p>Loading...</p> : (
                <Row xs={1} md={3} className="g-4">
                    {items.map(item => (
                        <Col key={item._id}>
                            <ItemCard item={item} />
                        </Col>
                    ))}
                    {items.length === 0 && <p className="text-center text-muted">No items found.</p>}
                </Row>
            )}
        </Container>
    );
};

export default ItemsPage;
