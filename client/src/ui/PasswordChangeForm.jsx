import { useState } from "react";
import { updatePassword } from "../services/updateData";
import toast from "react-hot-toast";

function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      await updatePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.message || "Failed to update password.");
    }
  };

  return (
    <form className="form form-user-settings" onSubmit={handlePasswordChange}>
      <div className="form__group">
        <label className="form__label" htmlFor="password-current">
          Current password
        </label>
        <input
          className="form__input"
          id="password-current"
          type="password"
          placeholder="••••••••"
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="password">
          New password
        </label>
        <input
          className="form__input"
          id="password"
          type="password"
          placeholder="••••••••"
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>
      <div className="form__group ma-bt-lg">
        <label className="form__label" htmlFor="password-confirm">
          Confirm password
        </label>
        <input
          className="form__input"
          id="password-confirm"
          type="password"
          placeholder="••••••••"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>
      <div className="form__group right">
        <button className="btn btn--small btn--green">Save password</button>
      </div>
    </form>
  );
}

export default PasswordChangeForm;
