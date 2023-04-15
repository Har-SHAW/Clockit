import React, { useState } from "react";
import CustomInput from "../components/inputs/custom_input";
import CustomButton from "../components/buttons/custom_button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fire_auth } from "../firebase";

function createAccount(email, password) {
    createUserWithEmailAndPassword(fire_auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}

function RegisterPage(props) {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

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
                <CustomInput placeHolder="Confirm Password" type="password" />

                <CustomButton
                    text="Register"
                    onClick={() => {
                        createAccount(email, password);
                    }}
                />

                <label>
                    Already have an account <a href="/login">Login?</a>
                </label>
            </div>
        </div>
    );
}

export default RegisterPage;
