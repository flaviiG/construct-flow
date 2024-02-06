import styles from "./Login.module.css";
import HomepageHeader from "../ui/HomepageHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "../features/user/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { id, firstName, lastName, is_admin, error } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function handleSubmit(e, email, password) {
    e.preventDefault();
    setEmail("");
    setPassword("");
    dispatch(logInUser(email, password));
  }

  useEffect(
    function () {
      if (id !== "") {
        if (is_admin) navigate("/admin");
        else navigate(`/customer/${id}/${firstName}/${lastName}`);
      }
    },
    [id, is_admin, navigate, firstName, lastName]
  );

  return (
    <>
      <HomepageHeader />
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <h2>Login</h2>
          <form onSubmit={(e) => handleSubmit(e, email, password)}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            ></input>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            ></input>
            <input type="submit"></input>
          </form>
          <p>{error}</p>
          <button onClick={(e) => handleSubmit(e, email, password)}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
