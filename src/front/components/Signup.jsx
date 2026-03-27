import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch("TU_URL_API/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            alert("¡Usuario creado!");
            navigate("/login");
        } else {
            alert("Error al registrar usuario");
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Registrarse</button>
        </form>
    );
};