import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Alert, Form } from 'react-bootstrap';
import ItemCard from '../components/ItemCard';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [myItems, setMyItems] = useState([]);
    const [msg, setMsg] = useState('');
    const [uploading, setUploading] = useState(false);

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
            fetchMyItems();
            setTimeout(() => setMsg(''), 3000);
        } catch (error) {
            console.error(error);
            setMsg('Failed to delete item');
        }
    };

    const handlePictureUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('picture', file);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.put('/api/auth/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            const updatedUser = res.data.user;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            if (setUser) setUser(updatedUser);
            setMsg('Profile picture updated!');
            setTimeout(() => setMsg(''), 3000);
        } catch (error) {
            console.error(error);
            setMsg('Failed to upload picture');
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        fetchMyItems();
    }, []);

    const pictureUrl = user?.picture?.startsWith('uploads/')
        ? `http://localhost:5000/${user.picture}`
        : user?.picture;

    return (
        <Container className="py-4">
            {/* Profile Header */}
            <div className="profile-card mb-5 fade-in-up">
                <div className="d-flex align-items-center flex-wrap gap-4">
                    <div className="profile-avatar-wrapper">
                        {pictureUrl ? (
                            <img
                                src={pictureUrl}
                                alt="Profile"
                                className="profile-avatar"
                                width="120"
                                height="120"
                            />
                        ) : (
                            <div className="profile-avatar-placeholder">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <Form.Label
                            htmlFor="picture-upload"
                            className="profile-upload-btn"
                            title="Change Profile Picture"
                        >
                            📷
                        </Form.Label>
                        <Form.Control
                            type="file"
                            id="picture-upload"
                            onChange={handlePictureUpload}
                            accept="image/*"
                            className="d-none"
                            disabled={uploading}
                        />
                    </div>
                    <div>
                        <h2 className="mb-1 fw-bold">{user?.name}</h2>
                        <p className="mb-2 opacity-75">{user?.email}</p>
                        <span className="badge bg-light text-dark">
                            📊 {myItems.length} Posts
                        </span>
                        {uploading && <span className="ms-2 badge bg-light text-dark">Uploading...</span>}
                    </div>
                </div>
            </div>

            {/* My Posts Section */}
            <div className="page-header fade-in-up">
                <h2 className="page-title">My Posts</h2>
            </div>

            {msg && <Alert variant="info" onClose={() => setMsg('')} dismissible className="fade-in-up">{msg}</Alert>}

            {myItems.length > 0 ? (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {myItems.map((item, index) => (
                        <Col key={item._id} className={`fade-in-up delay-${(index % 3) + 1}`}>
                            <ItemCard item={item} isOwnPost={true} onDelete={handleDelete} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="empty-state fade-in-up">
                    <div className="empty-state-icon">📭</div>
                    <h3 className="empty-state-title">No posts yet</h3>
                    <p className="empty-state-text">Start by posting a lost or found item!</p>
                </div>
            )}
        </Container>
    );
};

export default Profile;
