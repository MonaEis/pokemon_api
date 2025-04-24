import { Link, useLocation } from 'react-router-dom';
import Logimg from '../assets/img/logo.png';
import HamburgerMenu from '../assets/img/hamburger.svg';
import HamburgerMenuBack from '../assets/img/back.svg';
import SwitchMode from '../assets/img/switch-mode.svg';

import '../components/Header.css';

type HeaderProps = {
  input: string;
  setInput: (input: string) => void;
};

export default function Header({ input, setInput }: HeaderProps) {
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isDetailPage = location.pathname.startsWith('/pokemon');

  return (
    <header>
      <Link to="/">
        <div className="logo">
          <img src={Logimg} alt="Logo" />
        </div>
      </Link>

      <div className="search-bar">
        {isHomePage && (
          <Link to="/menu">
            <div className="hamburger">
              <img src={HamburgerMenu} alt="Hamburger Menu" />
            </div>
          </Link>
        )}

        {isDetailPage && (
          <Link to="/">
            <div className="hamburger-close">
              <img src={HamburgerMenuBack} alt="Hamburger Close" />
            </div>
          </Link>
        )}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        />
        <div>
          <img src={SwitchMode} alt="Switch Mode" />
        </div>
      </div>
    </header>
  );
}
