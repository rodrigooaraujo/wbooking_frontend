import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import socketio from 'socket.io-client';

import api from '../../services/api';
import './style.css';

export default function Dashboard() {

    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');

    //ensures the connection is being created only when we have a different user
    const socket = useMemo(() => socketio(api.defaults.baseURL, {
        query: {
            user_id
        }
    }), [user_id]);


    useEffect(() => {
        socket.on('bookingRequest', data => {
            setRequests([...requests, data]);
        });
    }, [requests, socket]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');

            console.log(user_id);

            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);
        setRequests(requests.filter(request => request._id != id));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);
        setRequests(requests.filter(request => request._id != id));
    }


    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> has requested a spot at <strong>{request.spot.company} </strong>
                            on <strong> {request.date}</strong>
                        </p>
                        <button className="accept" onClick={() => handleAccept(request._id)}>ACCEPT</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>REJECT</button>
                    </li>
                ))}
            </ul>
            <ul className="spot-list">
                {
                    spots.map(spot => (
                        <li key={spot._id}>
                            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                            <strong>{spot.company}</strong>
                            <span>{spot.price ? `A$${spot.price}/day` : 'Free'}</span>
                        </li>
                    ))
                }
            </ul>

            <Link to="/new">
                <button className="btn"> Create new spot</button>
            </Link>
        </>
    );
}