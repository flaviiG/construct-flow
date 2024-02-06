import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../services/authAPI";
import PropTypes from "prop-types";
import supabase from "../services/supabase";
import { getUserDetails } from "../services/userAPI";
import Spinner from "../ui/Spinner";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(
    function () {
      async function checkUser() {
        setIsLoading(true);

        //Check if there is an user logged in
        const res = await supabase.auth.getSession();
        console.log("getSession:", res.data.session);
        const auth = res.data.session === null ? false : true;
        console.log(auth);

        //No user logged in -> navigate to main page
        if (!auth) {
          setIsLoading(false);
          navigate("/");
        } else {
          //There is an user -> check if it is admin
          const id = res.data.session.user.id;
          console.log("Checking admin...");
          const user = await getUserDetails(id);
          const admin = user.is_admin;
          if (!admin) navigate("/");
          setIsAuthenticated(auth);
          setIsLoading(false);
        }
      }
      checkUser();
    },
    [isAuthenticated, navigate]
  );

  if (isLoading === true) return <Spinner />;
  if (!isAuthenticated) return null;

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
