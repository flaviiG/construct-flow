import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../services/authAPI";

function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(
    function () {
      checkAuth().then((data) =>
        data === null ? navigate("/", { replace: true }) : setIsLoading(false)
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
