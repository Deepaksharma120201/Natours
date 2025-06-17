import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authServices";
import { useSearch } from "../context/SearchContext";
import logoWhite from "/img/logo-white.png";
import icons from "/img/icons.svg";
import toast from "react-hot-toast";

function Header() {
  const { user, setUser } = useAuth();
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
      setUser(null);
      toast.success("Logged out successfully!");
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
        <form className="nav__search" onSubmit={(e) => e.preventDefault()}>
          <button className="nav__search-btn">
            <svg>
              <use xlinkHref={`${icons}#icon-search`} />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours"
            className="nav__search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            <Link to="/me" className="nav__el">
              <img
                src={`/img/users/${user.photo}`}
                alt="User photo"
                className="nav__user-img"
              />
              <span>{user.name.split(" ")[0]}</span>
            </Link>
          </>
        ) : (
          <>
            <Link className="nav__el" to="/login">
              Log in
            </Link>
            <Link className="nav__el nav__el--cta" to="/signup">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
