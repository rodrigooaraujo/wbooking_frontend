import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.png';

import './styles.css';

export default function New({ history }) {

    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const previewThumbnail = useMemo(() => { return thumbnail ? URL.createObjectURL(thumbnail) : null }
        , [thumbnail]);

    async function handleSubmit(event) {

        event.preventDefault();

        const data = new FormData();

        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        const response = await api.post('spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');

    }

    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="file"
                id="thumbnail"
                style={{ backgroundImage: `url(${previewThumbnail})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input id="file" type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Upload Image" width="30px" height="30px"></img>

            </label>

            <label htmlFor="company">Company*</label>
            <input
                id="company"
                placeholder="Your amazing company"
                value={company}
                onChange={event => setCompany(event.target.value)}>
            </input >
            <label htmlFor="techs">Technologies* <span> (split by comma)</span></label>
            <input
                id="techs"
                placeholder="Which techs are you using?"
                value={techs}
                onChange={event => setTechs(event.target.value)}>
            </input>

            <label htmlFor="price">Daily price* <span> (Empty when it's for free)</span></label>
            <input
                id="price"
                placeholder="Daily price"
                value={price}
                onChange={event => setPrice(event.target.value)}>
            </input>

            <button className="btn" type="submit">Create</button>

        </form>
    )
}