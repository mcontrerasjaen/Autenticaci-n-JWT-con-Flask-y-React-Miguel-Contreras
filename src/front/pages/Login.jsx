import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importamos Link

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem("token", data.access_token);
            navigate("/private");
        } else {
            alert("Usuario o contraseña incorrectos. Debe estar registrado para acceder");
        }
    };

    return (
        <div className="auth-container">
            <div className="card auth-card p-5 shadow" style={{ width: "100%", maxWidth: "420px" }}>
                <div className="text-center mb-4">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
                        {/* Si no tienes FontAwesome, puedes usar un emoji: 🔐 */}
                        <i className="fas fa-lock fa-lg"></i>
                    </div>
                    <h2 className="fw-bold text-dark">¡Hola de nuevo!</h2>
                    <p className="text-muted">Accede a tu cuenta privada</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-floating mb-3">
                        <input 
                            type="email" 
                            className="form-control border-0 bg-light" 
                            id="floatingInput" 
                            placeholder="name@example.com"
                            onChange={e => setEmail(e.target.value)} 
                            required
                        />
                        <label htmlFor="floatingInput">Correo electrónico</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input 
                            type="password" 
                            className="form-control border-0 bg-light" 
                            id="floatingPassword" 
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingPassword">Contraseña</label>
                    </div>
                    <button className="btn btn-primary btn-lg w-100 fw-bold shadow-sm py-3" type="submit">
                        Entrar ahora
                    </button>
                </form>

                <p className="text-center mt-4 mb-0 text-muted small">
                    ¿No tienes cuenta? <Link to="/signup" className="text-primary fw-bold text-decoration-none">Crea una aquí</Link>
                </p>
            </div>
        </div>
    );
};