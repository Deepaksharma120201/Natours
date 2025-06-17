import { Link } from "react-router-dom";

function SidebarItem({ href, icon, label, active = false }) {
  return (
    <li className={active ? "side-nav--active" : ""}>
      <Link to={href}>
        <svg>
          <use xlinkHref={`img/icons.svg#${icon}`} />
        </svg>
        {label}
      </Link>
    </li>
  );
}

export default SidebarItem;
