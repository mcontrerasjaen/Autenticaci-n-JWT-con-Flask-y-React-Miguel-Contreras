import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const handleLogout = () => {
        sessionStorage.removeItem("token"); 
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light shadow-sm py-2 px-3">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo con Rigo en verde y Auth en oscuro para que se vea sobre el fondo claro */}
                <Link className="navbar-brand fw-bold text-success fs-4" to="/">
                    Rigo<span className="text-dark fw-light">Auth</span>
                </Link>

                {/* Contenedor de botones alineados */}
                <div className="d-flex gap-2">
                    {token ? (
                        <button 
                            className="btn btn-outline-danger btn-sm rounded-pill px-3 d-flex align-items-center" 
                            onClick={handleLogout}
                        >
                            <i className="fa-solid fa-power-off"></i>
                            <span className="ms-2">Salir</span>
                        </button>
                    ) : (
                        <div className="d-flex gap-2">
                            <Link to="/login" className="btn btn-success btn-sm rounded-pill px-3 fw-bold">
                                Entrar
                            </Link>
                            <Link to="/signup" className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-none d-sm-inline">
                                Registro
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};