import { useParams } from "react-router-dom";
import styles from "./RequestDetails.module.css";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import UserDetails from "./UserDetails";

function RequestDetails() {
  const { id } = useParams();
  const projectId = Number(id);
  const { isLoading, requests } = useSelector((state) => state.requests);
  const request = requests.filter((req) => req.id === projectId)[0];

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.projectDetails}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <p className={styles.title}>{request.name}</p>
            <img src={request.image} alt=""></img>
            <p className={styles.description}>
              Description: <br></br> {request.description}
            </p>
            <br></br>
            <p className={styles.description}>Budget: {request.budget}$</p>
          </>
        )}
      </div>
      <UserDetails isProject={false} />
    </div>
  );
}

export default RequestDetails;
