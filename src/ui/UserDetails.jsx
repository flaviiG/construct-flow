import { useParams } from "react-router-dom";
import styles from "./UserDetails.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserDetails } from "../services/userAPI";

function UserDetails({ isProject = true }) {
  const { id } = useParams();
  const projectId = Number(id);
  const { projects } = useSelector((state) => state.projects);
  const { requests } = useSelector((state) => state.requests);
  const project = isProject
    ? projects.filter((req) => req.id === projectId)[0]
    : requests.filter((req) => req.id === projectId)[0];
  const userId = project.user_id;
  console.log(userId);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(
    function () {
      getUserDetails(userId).then((data) => {
        console.log(data);
        setUser(data);
        setIsLoading(false);
      });
    },
    [userId]
  );
  if (!isLoading)
    return (
      <div className={styles.userContainer}>
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>Id: {user.id}</p>
      </div>
    );
}

export default UserDetails;
