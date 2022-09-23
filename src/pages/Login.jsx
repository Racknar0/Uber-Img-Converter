import { useState } from 'react';
import './Login.css';
import { useContext } from 'react';
import {AuthContext} from '../context/authContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login();

        navigate('/dashboard');
    }  

    return (
        <div className="login_container d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="title_login text-black fs-1 text-center">
                Uber image Converter Login
            </h1>

            {/* formulario login */}
            <div className="mt-3 form_container">
                <form className="form-login">
                    <div className="form-group mb-3">
                        <label htmlFor="email">Usuario</label>
                        <input
                            autoComplete="off"
                            type="email"
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Ingrea tu usuario"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Ingresa tu Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark mt-3" onClick={handleSubmit}>
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
