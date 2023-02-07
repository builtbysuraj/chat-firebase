import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat Firebase</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          {err && (
            <span
              style={{ color: "red", fontSize: "13px", textAlign: "center" }}
            >
              Something went wrong
            </span>
          )}
          <button>Sign in</button>
        </form>
        <p>
          dont have an account?
          <strong>
            <Link style={{ textDecoration: "none" }} to={"/register"}>
              {" "}
              Sign up{" "}
            </Link>
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Login;
