import logo from '../../images/logo.png';
import { Link, useLocation } from "react-router-dom";

function HeaderAuth() {
  const location = useLocation(); 

  // verifica se estamos na página de registro
  const isRegisterPage = location.pathname === '/register';

  return (
    <header className="header">
      <img className="logo" src={logo} alt="logo around" />
      
      {/* Ternário para trocar o botão */}
      <Link className="button" to={isRegisterPage ? "/login" : "/register"}>
        {isRegisterPage ? "Faça o Login" : "Entrar"}
      </Link>
    </header>
  );
}

export default HeaderAuth;