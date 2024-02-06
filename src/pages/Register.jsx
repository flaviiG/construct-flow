import { useState } from "react";
import HomepageHeader from "../ui/HomepageHeader";
import styles from "./Register.module.css";
import { signUp } from "../services/authAPI";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e, firstName, lastName, email, password) {
    e.preventDefault();
    signUp(firstName, lastName, email, password);
    navigate("/login");
  }

  return (
    <>
      <HomepageHeader />
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <h2>Register</h2>
          <form
            onSubmit={(e) =>
              handleSubmit(e, firstName, lastName, email, password)
            }
          >
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            ></input>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            ></input>
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
          <button
            onClick={(e) =>
              handleSubmit(e, firstName, lastName, email, password)
            }
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
