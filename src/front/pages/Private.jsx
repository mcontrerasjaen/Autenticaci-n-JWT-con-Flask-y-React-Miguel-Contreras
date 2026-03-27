import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) { navigate("/login"); return; }

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setAuthorized(true);
                    setUserEmail(data.user.email);
                } else {
                    navigate("/login");
                }
            })
            .catch(() => navigate("/login"));
    }, [navigate]);

    if (!authorized) return <div className="auth-container">Cargando panel seguro...</div>;

    return (
        <div className="auth-container p-4">
            <div className="container bg-white rounded-4 shadow-lg p-5 text-dark" style={{ maxWidth: "1000px", minHeight: "70vh" }}>

                {/* Cabecera del Panel */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 border-bottom pb-4 text-center text-md-start">
    <div>
        <h2 className="fw-bold mb-1">Panel de Control</h2>
        <p className="text-muted mb-3 mb-md-0">Bienvenido, <span className="text-primary fw-bold">{userEmail}</span></p>
    </div>
    <span className="badge bg-success p-2 px-4 rounded-pill shadow-sm">
        <i className="fa-solid fa-circle-check me-2"></i>Sesión Activa
    </span>
</div>

                {/* Grid de Widgets / Estadísticas Rápidas */}
                <div className="row g-4 mb-5">
                    <div className="col-md-4">
                        <div className="p-4 border-0 rounded-4 bg-light shadow-sm hover-shadow transition">
                            <i className="fa-solid fa-envelope-open-text text-primary fs-3 mb-3"></i>
                            <h6 className="text-muted small text-uppercase">Email Verificado</h6>
                            <p className="fw-bold mb-0 text-truncate">{userEmail}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 border-0 rounded-4 bg-light shadow-sm">
                            <i className="fa-solid fa-key text-warning fs-3 mb-3"></i>
                            <h6 className="text-muted small text-uppercase">Seguridad JWT</h6>
                            <p className="fw-bold mb-0">Token 256-bit SSL</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 border-0 rounded-4 bg-light shadow-sm">
                            <i className="fa-solid fa-clock text-info fs-3 mb-3"></i>
                            <h6 className="text-muted small text-uppercase">Última Actividad</h6>
                            <p className="fw-bold mb-0">Hace un momento</p>
                        </div>
                    </div>
                </div>
                <div className="mb-5 p-4 rounded-4 shadow-sm" style={{ background: "rgba(0,0,0,0.02)" }}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="text-muted small text-uppercase fw-bold mb-0">Nivel de Seguridad de la Cuenta</h6>
                        <span className="badge bg-primary rounded-pill">100% Protegido</span>
                    </div>
                    <div className="progress" style={{ height: "10px", borderRadius: "10px" }}>
                        <div
                            className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            style={{ width: "100%" }}
                        ></div>
                    </div>
                    <p className="small text-muted mt-2 mb-0">
                        <i className="fa-solid fa-shield-check text-success me-1"></i>
                        Tu conexión está cifrada con JWT y validada por el servidor de Miguel Contreras.
                    </p>
                </div>

                {/* Sección de Contenido "Solo para Usuarios" */}
                <div className="mt-4 p-5 border border-2 border-dashed rounded-4 text-center bg-light">
                    <div className="mb-4">
                        <i className="fa-solid fa-vault fa-4x text-muted opacity-25"></i>
                    </div>
                    <h3 className="fw-bold">Tus datos están protegidos</h3>
                    <p className="text-muted mx-auto" style={{ maxWidth: "500px" }}>
                        Esta sección solo es accesible mediante un token válido emitido por nuestro servidor Flask. Aquí podrías ver tus documentos privados, facturas o configuraciones personales.
                    </p>
                    <button className="btn btn-primary mt-3 px-4 rounded-pill shadow-sm">
                        Explorar Documentación
                    </button>
                </div>
            </div>
        </div>
    );
};