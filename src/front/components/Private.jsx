import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        // VALIDACIÓN REAL: Le preguntamos al backend si el token es válido
        fetch(`${process.env.BACKEND_URL}/api/private`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}` // Enviamos el pase VIP
            }
        })
        .then(response => {
            if (response.ok) {
                setAuthorized(true); // El token es válido, mostramos la página
            } else {
                // Si el token es falso o expiró, lo borramos y echamos al usuario
                sessionStorage.removeItem("token");
                navigate("/login");
            }
        })
        .catch(() => {
            navigate("/login");
        });
        
    }, [navigate]);

    return authorized ? (
        <div className="container mt-5 text-center">
            <h1 className="display-4">🔐 Área Privada</h1>
            <p className="lead">Solo tú puedes ver este contenido porque tu sesión es válida.</p>
            <hr />
            <button 
                className="btn btn-danger" 
                onClick={() => {
                    sessionStorage.removeItem("token");
                    navigate("/login");
                }}
            >
                Cerrar Sesión manualmente
            </button>
        </div>
    ) : (
        <div className="text-center mt-5">
            <h3>Verificando credenciales...</h3>
        </div>
    );
};