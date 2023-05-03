import React, { useContext } from 'react'
import ImgProfile from '../assets/image/blank-profile.png'

import { UserContext } from '../context/userContext';
import { API } from '../config/api';
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";

function Profile(props) {
    let navigate = useNavigate();
    const [state] = useContext(UserContext);

    let { data: profile } = useQuery('profileCache', async () => {
        const response = await API.get("/users");
        return response.data.data;
      });
      console.log(profile)

  return (
    <div>
        <h3 className="mt-5 fw-bold" style={{color: "#613D2B", marginBottom: 26, marginLeft: "600px"}}>My Profile</h3>
        <div className="d-flex" style={{marginLeft: "500px"}} >
            <div className="img-wrapper"  style={{width: 180, height: 221}}>
                <img src={profile?.photo ? profile.photo : ImgProfile} style={{width: "100%"}} alt="profile" />
                <button onClick={() => navigate("/update-profile")} className="mt-3 text-white rounded-3 fw-bold border-0 py-2 w-100" style={{ backgroundColor: "#613D2B" }} > Edit Profile </button>
            </div>
            <div style={{marginLeft: 28}}>
                <div className="name">
                    <p className="fs-4 m-0 fw-bolder" style={{color: "#613D2B"}}>Full Name</p>
                    <p className="fs-5 m-0" >{state.user.username}</p>
                </div>
                
                <div className="email mt-3">
                    <p className="fs-4 m-0 fw-bolder" style={{color: "#613D2B"}}>Email</p>
                    <p className="fs-5 m-0" >{state.user.email}</p>
                </div>

                <div className="email mt-3">
                    <p className="fs-4 m-0 fw-bolder" style={{color: "#613D2B"}}>Phone</p>
                    <p className="fs-5 m-0" >{profile?.phone}</p>
                </div>

                <div className="email mt-3">
                    <p className="fs-4 m-0 fw-bolder" style={{color: "#613D2B"}}>Address</p>
                    <p className="fs-5 m-0" >{profile?.address}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
