import logoGreen from "/img/logo-green-small.png";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img src={logoGreen} alt="Wildway logo" />
        <span
          style={{
            color: "#28b487",
            fontSize: "3rem",
            marginLeft: "0.5rem",
          }}
        >
          WildWay
        </span>
      </div>
      <ul className="footer__nav">
        <li>
          <a href="#">About us</a>
        </li>
        <li>
          <a href="#">Download apps</a>
        </li>
        <li>
          <a href="#">Become a guide</a>
        </li>
        <li>
          <a href="#">Careers</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
      <p className="footer__copyright">
        &copy; by The Boogyman. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
