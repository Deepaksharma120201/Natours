import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authServices";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleForgetPasswored(e) {
    e.preventDefault();

    try {
      await forgotPassword({ email });
      toast.success("Forgot Password working : ");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Forgot Your Password?</h2>
          <form className="form" onSubmit={handleForgetPasswored}>
            <div className="form__group">
              <label className="form__label" htmlFor="email">
                Enter Email address
              </label>
              <input
                className="form__input"
                id="email"
                type="email"
                placeholder="you@example.com"
                required="required"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form__actions">
              <button className="btn btn--green" type="submit">
                Continue
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default ForgotPassword;
