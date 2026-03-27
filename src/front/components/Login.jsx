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
    } 
    
    else if (response.status === 401) {
        alert("No encontramos tu cuenta o la contraseña es incorrecta. ¿Ya te registraste?");
    } 
    else {
        alert("Hubo un error en el servidor, por favor intenta más tarde.");
    }
};
    return (
        <form onSubmit={handleLogin}>
            <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Entrar</button>
        </form>
    );
};