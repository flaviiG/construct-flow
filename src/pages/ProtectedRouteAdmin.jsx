import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAuthAdmin, getUser } from "../services/authAPI";
import PropTypes from "prop-types";
import supabase from "../services/supabase";
import { getUserDetails } from "../services/userAPI";
import Spinner from "../ui/Spinner";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(
    function () {
      checkAuthAdmin().then((is_admin) =>
        !is_admin ? navigate("/") : setIsLoading(false)
      );
    },
    [navigate]
  );

  if (!isLoading) return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
