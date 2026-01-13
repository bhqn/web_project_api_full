import logo from '../../images/logo.png';

function Header({userData, onSignOut}) {




 
  return (
    <header className="header">
      <img className="logo" src={logo} alt="logo around" />
      <div className='header__container'>
      <p className='header__email'>{userData?.email || "Não logado"}</p>
      <p className='header__sair' onClick={onSignOut}>sair</p>
      </div>
    </header>
  );
}

export default Header;