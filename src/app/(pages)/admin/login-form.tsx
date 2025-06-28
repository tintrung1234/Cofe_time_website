"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from 'crypto-js';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const secretKey: string = process.env.SECRET_KEY || '5abd7212eb1a31914078162393963b67d7c30e2cc23e903d90b708e3b269b366e1d1e79fb0146d805970455bc29cc048';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error messagesername: string = CryptoJS.AES.encrypt(username, secretKey).toString();

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, password: password }), // Send the hashed password
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Invalid credentials");
            }

            // Redirect to a secure page
            router.push("/admin/dashboard");
        } catch (error: any) {
            setErrorMessage(error.message || "An error occurred. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <section className="gradient-custom">
                <div className="container py-5">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                                <div className="card-body p-5 text-center">
                                    <h2 className="fw-bold mb-2 text-uppercase">Admin Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your username and password!</p>

                                    <div className="form-outline form-white mb-4">
                                        <input
                                            type="text"
                                            name="username"
                                            id="typeEmailX"
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            className="form-control form-control-lg"
                                        />
                                        <label className="form-label" htmlFor="typeEmailX">Username</label>
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            id="typePasswordX"
                                            className="form-control form-control-lg"
                                        />
                                        <label className="form-label" htmlFor="typePasswordX">Password</label>
                                    </div>

                                    {errorMessage && <p className="text-danger">{errorMessage}</p>}

                                    <button type="submit" className="btn btn-outline-light btn-lg px-5">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    );
}