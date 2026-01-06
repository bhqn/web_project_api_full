import logo from '../../images/logo.png';

function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="logo around" />
    </header>
  );
}

export default Header;