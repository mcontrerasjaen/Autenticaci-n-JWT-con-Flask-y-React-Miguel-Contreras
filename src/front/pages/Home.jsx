import React, { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL;
			if (!backendUrl) return;
			const response = await fetch(backendUrl + "/api/hello");
			const data = await response.json();
			if (response.ok) dispatch({ type: "set_hello", payload: data.message });
		} catch (error) {
			console.error("Error fetching message");
		}
	};

	useEffect(() => {
		loadMessage();
	}, []);

	return (
		<div className="auth-container"> {/* Reutilizamos el fondo azul */}
			<div className="container text-center text-white">
				<div className="row justify-content-center">
					<div className="col-md-8">
						{/* Imagen de Rigo con estilo Pro */}
						 <div className="mb-5 animate__animated animate__zoomIn">
                            <img 
                                src={rigoImageUrl} 
                                className="img-fluid rounded-circle shadow-lg border border-5 border-white" 
                                style={{ 
                                    width: "280px",  /* Tamaño aumentado */
                                    height: "280px", 
                                    objectFit: "cover",
                                    transition: "transform 0.3s ease" 
                                }} 
                                alt="Rigo Baby" 
                                onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                                onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                            />
                        </div>
						
						<h1 className="display-3 fw-bold mb-3">Bienvenido a RigoAuth</h1>
						<p className="lead mb-5 opacity-75">
							La solución definitiva para gestionar tu autenticación segura con JWT y Python.
						</p>

						{/* Botones de acción principales */}
						<div className="d-flex justify-content-center gap-3 mb-5">
							<Link to="/login" className="btn btn-success btn-lg px-5 fw-bold shadow-lg py-3 rounded-pill border-0 text-uppercase tracking-wider">
								Iniciar Sesión 🔐
							</Link>
							<Link to="/signup" className="btn btn-outline-light btn-lg px-4 fw-bold py-3 rounded-pill">
								Crear Cuenta
							</Link>
						</div>

						{/* Mensaje del Backend con diseño integrado */}
						<div className="mt-5 p-3 rounded-4 mx-auto" style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(8px)", maxWidth: "500px" }}>
							{store.message ? (
								<div className="text-white small fw-bold">
									<i className="fas fa-signal me-2 text-success"></i>Servidor conectado: {store.message}
								</div>
							) : (
								<div className="text-white small opacity-75">
									<div className="spinner-border spinner-border-sm me-2 text-info" role="status"></div>
									Esperando respuesta del Backend...
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
