// import { useState } from "react";
import Input from "./Input";
import { useInput } from "../hooks/useInput";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";
export default function Login() {
    const {
        enteredVal: emailVal,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: emailHasError,
    } = useInput("", (val) => isEmail(val) && isNotEmpty(val));

    const {
        enteredVal: passwordVal,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: passwordHasError,
    } = useInput("", (val) => hasMinLength(val, 6) && isNotEmpty(val));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (emailHasError || passwordHasError) {
            return;
        }
        console.log(emailVal, passwordVal);
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    onBlur={handleEmailBlur}
                    onChange={handleEmailChange}
                    value={emailVal}
                    error={emailHasError && "Email must contain @"}
                ></Input>

                <Input
                    id="password"
                    label="Password"
                    type="password"
                    onBlur={handlePasswordBlur}
                    onChange={handlePasswordChange}
                    value={passwordVal}
                    error={
                        passwordHasError &&
                        "Password must be at least 6 characters"
                    }
                ></Input>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
