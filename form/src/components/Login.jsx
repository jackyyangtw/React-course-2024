import { useRef, useState } from "react";
export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(`Email: ${email}, Password: ${password}`);
        const emailIsInvalid = !email.includes("@");
        // emailRef.current.value = "";
        // passwordRef.current.value = "";
        if (emailIsInvalid) {
            setEmailIsInvalid(true);
            return;
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        ref={emailRef}
                    />
                    {emailIsInvalid && (
                        <p className="form-error">
                            Please enter a valid email.
                        </p>
                    )}
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        ref={passwordRef}
                    />
                </div>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
