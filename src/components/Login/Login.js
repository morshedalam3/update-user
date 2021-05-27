import React,{ useContext} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config"
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

    
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    const { email, displayName } = user;
        const signedInUser = { name: displayName, email }
        setLoggedInUser(signedInUser);
        history.replace(from);
  }).catch((error) => {

    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage, email, credential)

  });

    }

    return (
        <div className="text-center">
             <h1>Login Here..!!</h1>
            <button className="btn btn-success" onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};
export default Login;