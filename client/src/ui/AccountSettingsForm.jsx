import { useState } from "react";
import { updateUserData } from "../services/updateData";
import toast from "react-hot-toast";

function AccountSettingsForm({ user }) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (photo) formData.append("photo", photo);

      await updateUserData(formData);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.message.split(":")[2] || "Failed to update profile.");
    }
  };

  return (
    <form className="form form-user-data" onSubmit={handleSubmit}>
      <div className="form__group">
        <label className="form__label" htmlFor="name">
          Name
        </label>
        <input
          className="form__input"
          id="name"
          type="text"
          defaultValue={user.name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form__group ma-bt-md">
        <label className="form__label" htmlFor="email">
          Email address
        </label>
        <input
          className="form__input"
          id="email"
          type="email"
          defaultValue={user.email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form__group form__photo-upload">
        <img
          className="form__user-photo"
          src={`/img/users/${user.photo}`}
          alt="User photo"
        />
        <input
          className="form__upload"
          type="file"
          accept="image/*"
          id="photo"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <label className="form__label" htmlFor="photo">
          Choose new photo
        </label>
      </div>
      <div className="form__group right">
        <button className="btn btn--small btn--green">Save settings</button>
      </div>
    </form>
  );
}

export default AccountSettingsForm;
