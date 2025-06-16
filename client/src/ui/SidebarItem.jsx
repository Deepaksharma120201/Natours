function SidebarItem({ href, icon, label, active = false }) {
  return (
    <li className={active ? "side-nav--active" : ""}>
      <a href={href}>
        <svg>
          <use xlinkHref={`img/icons.svg#${icon}`} />
        </svg>
        {label}
      </a>
    </li>
  );
}

export default SidebarItem;
