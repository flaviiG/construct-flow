import { useDispatch, useSelector } from "react-redux";
import styles from "./RequestsList.module.css";
import { useEffect, useState } from "react";
import { getRequests } from "../../services/requestsAPI";
import {
  acceptRequest,
  deleteRequest,
  requestsLoaded,
  requestsLoading,
  setRequests,
} from "./requestsSlice";
import RequestCard from "./RequestCard";
import OptionMenu from "../../ui/OptionMenu";
import Spinner from "../../ui/Spinner";
import { addProject } from "../projects/projectsSlice";
import { useLocation, useNavigate } from "react-router-dom";

function RequestsList() {
  const { requests } = useSelector((state) => state.requests);
  const { id, is_admin } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const filtered_requests = [...requests].filter(
    (request) =>
      (is_admin && !request.accepted) ||
      (request.user_id === id && !request.accepted)
  );

  console.log(filtered_requests);

  const navigate = useNavigate();

  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [selectedProject, setSelectedProject] = useState(null);

  function toggleMenu(e, id) {
    const clickX = e.clientX;
    const clickY = e.clientY;
    // Check if there is enough space on the right, otherwise open on the left
    const x = window.innerWidth - clickX > 200 ? clickX : clickX - 200;

    // Check if there is enough space below, otherwise open above
    const y = window.innerHeight - clickY > 150 ? clickY : clickY - 150;
    setMenuOpen(!menuOpen);
    setSelectedProject(id);
    setPosition({ x, y });
  }

  function handleDelete() {
    dispatch(deleteRequest(selectedProject));
    if (is_admin) {
      if (location !== "/admin/requests") navigate("/admin/requests");
    } else {
      if (location !== "/customer/requests") navigate("/customer/requests");
    }
  }

  function handleCloseMenu() {
    setMenuOpen(false);
  }

  function handleAcceptRequest() {
    try {
      setIsLoading(true);
      let request = requests.filter((req) => req.id === selectedProject)[0];
      request = { ...request, accepted: true };
      console.log(request);
      dispatch(acceptRequest(request, true));
      const newProject = {
        name: request.name,
        description: request.description,
        status: "Accepted",
        user_id: request.userId,
        image: request.image,
      };
      dispatch(addProject(newProject, false));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelectCard(id) {
    navigate(`${id}`);
  }

  useEffect(
    function () {
      dispatch(requestsLoading());
      getRequests().then((data) => {
        if (data) {
          dispatch(setRequests(data));
          dispatch(requestsLoaded());
        }
      });
    },
    [dispatch]
  );

  if (isLoading) return <Spinner />;

  return (
    <>
      {menuOpen && (
        <OptionMenu
          position={position}
          handleDelete={handleDelete}
          handleCloseMenu={handleCloseMenu}
          option1={is_admin ? "Accept" : undefined}
          handleOption1={is_admin ? handleAcceptRequest : undefined}
        />
      )}
      <div className={styles.listContainer}>
        {filtered_requests.length === 0 && <p>No requests</p>}

        <div
          className={styles.projectContainer}
          // style={menuOpen ? { overflow: "hidden" } : {}}
        >
          {requests
            ? filtered_requests.map((request) => (
                <RequestCard
                  key={request.id}
                  onSelect={handleSelectCard}
                  request={request}
                  onToggleMenu={toggleMenu}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
}

// RequestsList.propTypes = {
//   admin: PropTypes.bool,
// };

export default RequestsList;
