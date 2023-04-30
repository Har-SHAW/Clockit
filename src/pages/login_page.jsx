import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addUser } from "../operations/user_operations";
import { Navigate } from "react-router-dom";
import { fire_auth } from "../firebase";
import './login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert, Snackbar } from "@mui/material";

function signIn(login, setLogin, setErrLogin, setSuccess) {
    signInWithEmailAndPassword(fire_auth, login.email, login.password)
        .then((userCredential) => {
            setSuccess("Login Successful!");
            setLogin(true);
        })
        .catch((error) => {
            const errorMessage = error.message;
            setErrLogin(errorMessage);
            console.log(errorMessage);
        });
}

function createAccount(signup, setErrSignup, setSuccess) {
    if(signup.password !== signup.confirm){
        setErrSignup("Password did not match");
        return;
    }
    createUserWithEmailAndPassword(fire_auth, signup.email, signup.password)
        .then(async (userCredential) => {
            await addUser(signup.email);
            setSuccess("Registration Success, Please Login!");
            document.getElementById("chk").checked = true;
        })
        .catch((error) => {
            const errorMessage = error.message;
            setErrSignup(errorMessage);
            console.log(errorMessage);
        });
}

function LoginPage(props) {
    const [isLoggedIn, setLogin] = useState(
        fire_auth.currentUser == null ? false : true
    );
    const [signupError, setErrSignup] = useState("");
    const [loginError, setErrLogin] = useState("");
    const [login, setLoginCreds] = useState({
        email: "", password: ""
    });
    const [signup, setSignupCreds] = useState({
        email: "", password: "", confirm: ""
    });
    const [success, setSuccess] = useState("");

    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="root">
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true"></input>
                <div className="signup">
                    <form>
                        <label className="label" htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input
                            className="input"
                            placeholder="Enter Email"
                            type="text"
                            required=""
                            onChange={(e) => {
                                setSignupCreds((state) => ({
                                    ...state,
                                    email: e.target.value
                                }));
                            }}
                        />
                        <input
                            className="input"
                            placeholder="Enter Password"
                            type="password"
                            required=""
                            onChange={(e) => {
                                setSignupCreds((state) => ({
                                    ...state,
                                    password: e.target.value
                                }));
                            }}
                        />
                        <input className="input" placeholder="Confirm Password" type="password" onChange={(e) => {
                            setSignupCreds((state) => ({
                                ...state,
                                confirm: e.target.value
                            }));
                        }} />

                        <button
                            className="button"
                            onClick={(event) => {
                                event.preventDefault();
                                createAccount(signup, setErrSignup, setSuccess);
                            }}
                        >Register</button>
                        <Snackbar open={signupError} autoHideDuration={6000} onClose={() => { setErrSignup(""); }}
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                            <Alert variant="filled" onClose={() => { setErrSignup(""); }} severity="error" sx={{ width: '100%' }}>
                                {signupError}
                            </Alert>
                        </Snackbar>
                        <Snackbar open={loginError} autoHideDuration={6000} onClose={() => { setErrLogin(""); }}
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                            <Alert variant="filled" onClose={() => { setErrLogin(""); }} severity="error" sx={{ width: '100%' }}>
                                {loginError}
                            </Alert>
                        </Snackbar>
                        <Snackbar open={success} autoHideDuration={6000} onClose={() => { setSuccess(""); }}
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                            <Alert variant="filled" onClose={() => { setSuccess(""); }} severity="success" sx={{ width: '100%' }}>
                                {success}
                            </Alert>
                        </Snackbar>
                    </form>
                </div>
                <div className="login">
                    <form>
                        <label className="label" htmlFor="chk" aria-hidden="true">Login</label>
                        <input
                            className="input"
                            placeholder="Enter Email"
                            type="text"
                            onChange={(e) => {
                                setLoginCreds((state) => ({
                                    ...state,
                                    email: e.target.value
                                }));
                            }}
                        />
                        <input
                            className="input"
                            placeholder="Enter Password"
                            type="password"
                            onChange={(e) => {
                                setLoginCreds((state) => ({
                                    ...state,
                                    password: e.target.value
                                }));
                            }}
                        />
                        <button
                            className="button"
                            onClick={(event) => {
                                event.preventDefault();
                                signIn(login, setLogin, setErrLogin, setSuccess);
                            }}
                        >Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;