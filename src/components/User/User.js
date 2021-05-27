import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const User = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    webiste: ""
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3002/user/${id}`);
    setUser(res.data);
  };
  return (
    <div className="container py-4">
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">website: {user.website}</li>
        <li className="list-group-item">user name: {user.username}</li>
        <li className="list-group-item">password: {user.password}</li>
      </ul> <br/>
      <Link  className="btn btn-primary " to="/home">
         Home < FontAwesomeIcon icon={faArrowLeft} />
      </Link>
    </div>
  );
};

export default User;