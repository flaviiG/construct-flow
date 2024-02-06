import HomepageHeader from "../ui/HomepageHeader";
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <>
      <HomepageHeader />
      <div className={styles.homepageContainer}>
        <div className={styles.description}>
          <p>
            Construct Flow is a leading construction management company,
            delivering innovative software solutions to streamline project
            workflows and enhance collaboration in the construction industry.
          </p>
        </div>
        <p className={styles.morebtn}>Find More</p>
      </div>
    </>
  );
}

export default Homepage;
