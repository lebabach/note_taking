import React, { useState } from 'react';
import { login } from '../fetch';
import { useNavigate } from 'react-router-dom';
import BodyBox from './boxes/BodyBox';
import InfoBox from './boxes/InfoBox';
import WarningBox from './boxes/WarningBox';
import PropTypes from 'prop-types';

export default function Login({ setUserLoggedIn, setSnackBarOpen, setSnackMessage }) {
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setInputData({
            ...inputData,
            [event.target.name]: value
        });
    };

    async function loginHandler(event) {
        event.preventDefault();
        try {
            const result = await login(inputData.email, inputData.password);
            if (result.status === 200) {
                console.log(result);
                console.log('Successfully logged in on server!');
                localStorage.setItem('token', result.data.jwt);
                setUserLoggedIn(true);
                setSnackMessage(`Successfully logged in as: ${result.data.email}`);
                setSnackBarOpen(true);
                navigate("/");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Unauthorized. Please check your email and password and try again.');
            } else {
                setError('Failed to log in. Please try again.');
            }
        }
    }

    return (
        <div>
            <InfoBox text={'Log in with E-Mail & Password to manage your notes.'} />
            <BodyBox content={
                <form>
                    <label htmlFor="email">E-Mail:</label><br />
                    <input type="text" id="email" name="email" value={inputData.email} onChange={handleChange}></input>
                    <br /><br />
                    <label htmlFor="password">Password:</label><br />
                    <input type="password" id="password" name="password" value={inputData.password} onChange={handleChange}></input>
                    <br /><br />
                    <input type="submit" onClick={loginHandler}></input>
                </form>
            }>
            </BodyBox>
            {error && <WarningBox text={error} />}
        </div>
    );
}

Login.propTypes = {
    setUserLoggedIn: PropTypes.func.isRequired,
    setSnackBarOpen: PropTypes.func.isRequired,
    setSnackMessage: PropTypes.func.isRequired
};