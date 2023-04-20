import React, { useState } from "react";
import CustomInput from "../components/inputs/custom_input";
import CustomButton from "../components/buttons/custom_button";
import { Navigate } from "react-router-dom";
import { fire_auth } from "../firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

function signIn(email, password, setLogin) {
    signInWithEmailAndPassword(fire_auth, email, password)
        .then((userCredential) => {
            console.log(fire_auth.currentUser.email);
            setLogin(true);
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}

function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [isLoggedIn, setLogin] = useState(
        fire_auth.currentUser == null ? false : true
    );

    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: "15vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <CustomInput
                    placeHolder="Enter Email"
                    type="text"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <CustomInput
                    placeHolder="Enter Password"
                    type="password"
                    onChange={(e) => {
                        setpassword(e.target.value);
                    }}
                />
                <CustomButton
                    text="Login"
                    onClick={() => {
                        signIn(email, password, setLogin);
                    }}
                />
                <label>
                    Don't have an account{" "}
                    <a href="/register">Create Account?</a>
                </label>
            </div>
        </div>
    );
}

export default LoginPage;
