import SidebarItem from "./SidebarItem";

function SidebarNav({ user }) {
  return (
    <nav className="user-view__menu">
      <ul className="side-nav">
        <SidebarItem href="#" icon="icon-settings" label="Settings" active />
        <SidebarItem
          href="/my-bookings"
          icon="icon-briefcase"
          label="My bookings"
        />
        <SidebarItem href="#" icon="icon-star" label="My reviews" />
        <SidebarItem href="#" icon="icon-credit-card" label="Billing" />
      </ul>

      {user?.role === "admin" && (
        <div className="admin-nav">
          <h5 className="admin-nav__heading">Admin</h5>
          <ul className="side-nav">
            <SidebarItem href="#" icon="icon-map" label="Manage tours" />
            <SidebarItem href="#" icon="icon-users" label="Manage users" />
            <SidebarItem href="#" icon="icon-star" label="Manage reviews" />
            <SidebarItem
              href="#"
              icon="icon-briefcase"
              label="Manage bookings"
            />
          </ul>
        </div>
      )}
    </nav>
  );
}

export default SidebarNav;
