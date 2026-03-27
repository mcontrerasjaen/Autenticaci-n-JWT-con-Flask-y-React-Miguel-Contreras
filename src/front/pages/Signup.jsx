import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. VALIDACIONES DE SEGURIDAD
        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        if (!email.includes("@") || email.length < 5) {
            alert("Por favor, introduce un correo electrónico válido");
            return;
        }

        // 2. PETICIÓN AL BACKEND
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
                navigate("/login");
            } else {
                alert("Error al crear el usuario. Revisa si el email ya existe.");
            }
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    }; // <--- AQUÍ CERRAMOS LA FUNCIÓN CORRECTAMENTE

    return (
        <div className="auth-container">
            <div className="card auth-card p-5 shadow" style={{ width: "100%", maxWidth: "420px" }}>
                <div className="text-center mb-4">
                    <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
                        <span style={{ fontSize: "1.5rem" }}>📝</span>
                    </div>
                    <h2 className="fw-bold text-dark">Crea tu cuenta</h2>
                    <p className="text-muted">Regístrate para acceder al área privada</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input 
                            type="email" 
                            className="form-control border-0 bg-light" 
                            placeholder="nombre@ejemplo.com"
                            onChange={e => setEmail(e.target.value)} 
                            required
                        />
                        <label>Correo electrónico</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input 
                            type="password" 
                            className="form-control border-0 bg-light" 
                            placeholder="Contraseña"
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <label>Contraseña</label>
                    </div>
                    <button className="btn btn-success btn-lg w-100 fw-bold shadow-sm py-3" type="submit">
                        Registrarme ahora
                    </button>
                </form>

                <p className="text-center mt-4 mb-0 text-muted small">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-success fw-bold text-decoration-none">Inicia sesión aquí</Link>
                </p>
            </div>
        </div>
    );
};