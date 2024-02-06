import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import supabase from "../services/supabase";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(
    function () {
      async function checkUser() {
        setIsLoading(true);
        const res = await supabase.auth.getSession();
        console.log("getSession:", res.data.session);
        const auth = res.data.session === null ? false : true;
        console.log(auth);
        if (!auth) navigate("/");
        setIsAuthenticated(auth);
        setIsLoading(false);
      }
      checkUser();
    },
    [isAuthenticated, navigate]
  );

  if (isLoading === true) return <div>wait</div>;
  if (!isAuthenticated) return null;

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
