import { useDispatch, useSelector } from "react-redux";
import styles from "./RequestsList.module.css";
import PropTypes from "prop-types";
import ProjectCard from "../projects/ProjectCard";
import { useEffect, useState } from "react";
import { getRequests } from "../../services/requestsAPI";
import { setRequests } from "./requestsSlice";
import RequestCard from "./RequestCard";

function RequestsList() {
  const { requests } = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      getRequests().then((data) => {
        console.log(data);
        if (data) dispatch(setRequests(data));
      });
    },
    [dispatch]
  );

  return (
    <div
      className={styles.projectContainer}
      // style={menuOpen ? { overflow: "hidden" } : {}}
    >
      {requests
        ? requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onToggleMenu={() => {}}
            />
          ))
        : null}
    </div>
  );
}

// RequestsList.propTypes = {
//   requests: PropTypes.object.isRequired,
// };

export default RequestsList;
