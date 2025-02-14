import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import Axios from 'axios'
import { updateAuthenticated, updateProfile } from '../redux/stateSlice';
import App from './App';


export default function UserBox() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.updater.profile);
  const authenticated = useSelector((state) => state.updater.authenticated);
  const username = useSelector((state) => state.updater.userName);

  console.log('authenticated', authenticated)

  const dispatchFunctionProfile = async () => {

    //const result = await Axios.get('/api/getuserdetails');
    //simulating the result in a real scenario
    //THIS IS NOT A SECURE WAY OF DOING IT
    const result = await Axios.get(`/api/getuserdetails?username=${username}`);
    console.log('result userbox', result)
    //dummy input to make sure it works
    const userBoxInputs = {name: result.data.username,
      email: result.data.email,
      profilePic: result.data.profileimage}
    
    dispatch(updateProfile(userBoxInputs))
  }

  const dispatchLogout = () => {
    dispatch(updateAuthenticated(false));

    //window.location is a quick fix and i do not like it
    //the best way would have been to use react router history method
    window.location.replace('http://localhost:8080');
  }

  useEffect(async () => {
    dispatchFunctionProfile()
  }, []);

  return (
    <div className="column">
      <div className="box is-size-4 has-text-white is-full-height">
        <img src={profile.profilePic}></img>
         <p>
          Welcome {profile.name}!
        </p>
        <p>{profile.email}</p>
        <button className="button is-primary is-small" onClick={dispatchLogout}>Log Out</button>
      </div>
    </div>
  );
}
