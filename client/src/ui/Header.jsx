import logoWhite from "../assets/img/logo-white.png";
import userImg from "../assets/img/users/user-1.jpg";
import icons from "../assets/img/icons.svg";

function Header() {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <a href="#" className="nav__el">
          All tours
        </a>
        <form className="nav__search">
          <button className="nav__search-btn">
            <svg>
              <use xlinkHref={`${icons}#icon-search`} />
            </svg>
          </button>
          <input type="text" placeholder="Search tours" className="nav__search-input" />
        </form>
      </nav>
      <div className="header__logo">
        <img src={logoWhite} alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        <a href="#" className="nav__el">
          My bookings
        </a>
        <a href="#" className="nav__el">
          <img src={userImg} alt="User photo" className="nav__user-img" />
          <span>Jonas</span>
        </a>
      </nav>
    </header>
  );
}

export default Header;