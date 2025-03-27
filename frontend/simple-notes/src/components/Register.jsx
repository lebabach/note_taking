import React from 'react'
import { useState } from 'react';
import BodyBox from './boxes/BodyBox'
import InfoBox from './boxes/InfoBox'
import WarningBox from './boxes/WarningBox'
import SuccessBox from './boxes/SuccessBox';
import { register } from '../fetch';

export default function Register() {

    const [inputData, setInputData] = useState({
        email: "",
        password: ""
      });

    const [warningMessage, setWarningMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setInputData({
            ...inputData,
            [event.target.name]: value
        });
    };

    async function registerHandler(event) {
        event.preventDefault();
        const result = await register(inputData.email, inputData.password)
        console.log(result);
        if (result.status == 200) {
            console.log('Successfully added user on server!');
            setWarningMessage("")
            setSuccessMessage(<SuccessBox text={'User registered successfully. You can now log in.'} />);
        }
        else if (result.status == 500) {
            setWarningMessage( <WarningBox text="Error while registering. Try again" />);
        }
        else {
            console.log('E-Mail already taken. Try again');
            setSuccessMessage("")
            setWarningMessage(<WarningBox text={result.data.message} />);
        }
    }

  return (
    <div>
      <InfoBox text={'Sign up with a new account if you are not registered yet.'} />
      <BodyBox content={
        <form>
          <label htmlFor="email">E-Mail:</label><br/>
          <input type="text" id="email" name="email" value={inputData.email} onChange={handleChange}></input>
          <br/><br/>
          <label htmlFor="password">Password:</label><br/>
          <input type="password" id="password" name="password" value={inputData.password} onChange={handleChange}></input>
          <br></br><br></br>
          <input type="submit" onClick={registerHandler}></input>
        </form> }
        >
       </BodyBox>
       {warningMessage}
       {successMessage}
    </div>
  )
}
