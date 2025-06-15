import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoWhite from "/img/logo-white.png";
import icons from "/img/icons.svg";
import { logoutUser } from "../services/authServices";
import toast from "react-hot-toast";

function Header() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = await logoutUser();
      setUser(null);
      console.log(data);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <a href="/" className="nav__el">
          All tours
        </a>
        <form className="nav__search">
          <button className="nav__search-btn">
            <svg>
              <use xlinkHref={`${icons}#icon-search`} />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours"
            className="nav__search-input"
          />
        </form>
      </nav>
      <div className="header__logo">
        <img src={logoWhite} alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {user ? (
          <>
            <button className="nav__el nav__el--logout" onClick={handleLogout}>
              Log out
            </button>
            <a href="#" className="nav__el">
              <img
                src={`/img/users/${user.photo}`}
                alt="User photo"
                className="nav__user-img"
              />
              <span>{user.name.split(" ")[0]}</span>
            </a>
          </>
        ) : (
          <>
            <Link className="nav__el" to="/login">
              Log in
            </Link>
            <Link className="nav__el nav__el--cta" to="/">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
