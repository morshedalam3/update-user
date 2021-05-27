import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";


const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  
  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3002/user");
    setUser(result.data.reverse());
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3002/user/${id}`);
    loadUsers();
  };
  
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div className="container justify-content-center">
      <div className="py-4">
        <h1 text="secondary">Dashboard</h1>
        <table class="table table-dark table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Site Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.website}</td>
                <td>{user.username}</td>
                <td> <input style={{border:"none"}} type={passwordShown ? "text" : "password"} value={user.password}>
                  </input> < FontAwesomeIcon onClick={togglePasswordVisiblity} icon={faEye} />{" "}</td>
                <td>
                  <Link class="btn btn-light mr-2" to={`/users/${user.id}`}>
                    profile
                  </Link>
                  <Link
                    class="btn btn-outline-light mr-2"
                    to={`/users/edit/${user.id}`}
                  >
                     < FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                   < FontAwesomeIcon icon={faTrashAlt} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;