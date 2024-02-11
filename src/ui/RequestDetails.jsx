import { useParams } from "react-router-dom";
import styles from "./RequestDetails.module.css";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import UserDetails from "./UserDetails";

function RequestDetails() {
  const { id } = useParams();
  const projectId = Number(id);
  const { isLoading, requests } = useSelector((state) => state.requests);
  const { is_admin } = useSelector((state) => state.user);
  const request = requests.filter((req) => req.id === projectId)[0];

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.projectDetails}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h1 className={styles.title}>{request.name}</h1>
            <br></br>
            <img src={request.image} alt=""></img>
            <br></br>
            <p className={styles.description}>
              Description: <br></br> {request.description}
            </p>
            <br></br>
            <p className={styles.description}>Budget: {request.budget}$</p>
          </>
        )}
      </div>
      {is_admin && <UserDetails isProject={false} />}
    </div>
  );
}

export default RequestDetails;
