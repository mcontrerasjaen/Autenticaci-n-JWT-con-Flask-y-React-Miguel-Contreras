import React from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-4 text-center border-top border-secondary" style={{ backgroundColor: "#1a1a1a", color: "#888" }}>
		<div className="container">
			<p className="mb-1 fs-5">
				Sistema de autenticación seguro.
				Realizado con <i className="fa fa-heart text-danger animate__animated animate__heartBeat animate__infinite mx-1" />
				por <span className="text-success fw-bold text-uppercase">Miguel Contreras</span>
			</p>
			<p className="small opacity-50 mb-0">
				© {new Date().getFullYear()} — Full Stack Developer — JWT Auth Project
			</p>
		</div>
	</footer>
);