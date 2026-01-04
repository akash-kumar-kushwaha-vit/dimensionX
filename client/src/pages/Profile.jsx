import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ItemCard from '../components/ItemCard';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [myItems, setMyItems] = useState([]);
    const [msg, setMsg] = useState('');

    const fetchMyItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/items/my-items', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMyItems(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/items/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMsg('Item deleted successfully');
            fetchMyItems(); // Refresh list
        } catch (error) {
            console.error(error);
            setMsg('Failed to delete item');
        }
    };

    useEffect(() => {
        fetchMyItems();
    }, []);

    return (
        <Container>
            <div className="d-flex align-items-center mb-4">
                {user?.picture && <img src={user.picture} alt="Profile" className="rounded-circle me-3" width="60" />}
                <div>
                    <h2>{user?.name}</h2>
                    <p className="text-muted">{user?.email}</p>
                </div>
            </div>

            <h4 className="mb-4">My Posts</h4>
            {msg && <Alert variant="info" onClose={() => setMsg('')} dismissible>{msg}</Alert>}

            <Row xs={1} md={3} className="g-4">
                {myItems.map(item => (
                    <Col key={item._id}>
                        <ItemCard item={item} isOwnPost={true} onDelete={handleDelete} />
                    </Col>
                ))}
                {myItems.length === 0 && <p>You haven't posted anything yet.</p>}
            </Row>
        </Container>
    );
};

export default Profile;
