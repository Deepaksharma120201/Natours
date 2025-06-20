import SidebarNav from "../ui/SidebarNav";
import AccountSettingsForm from "../ui/AccountSettingsForm";
import PasswordChangeForm from "../ui/PasswordChangeForm";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function UserAccount() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      document.title = `Wildway | ${user.name}`;
    }
  }, [user]);

  if (!user) {
    return (
      <Navigate
        to="/not-found"
        state={{
          message: "You are not logged in! Please log in to your account.",
        }}
        replace
      />
    );
  }

  return (
    <main className="main">
      <div className="user-view">
        <SidebarNav user={user} />
        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">
              Your account settings
            </h2>
            <AccountSettingsForm user={user} />
          </div>
          <div className="line">&nbsp;</div>
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>
            <PasswordChangeForm />
          </div>
        </div>
      </div>
    </main>
  );
}

export default UserAccount;
