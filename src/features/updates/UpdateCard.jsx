import { Slide } from "react-slideshow-image";
import styles from "./UpdateCard.module.css";

function UpdateCard({ update }) {
  const { title, description, images, created_at } = update;

  const [datePart, timePart] = created_at.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [timeWithOffset, timezoneOffset] = timePart.split(/[.+-]/);
  const [hour, minute, second] = timeWithOffset.split(":").map(Number);

  // Create a Date object
  const parsedDate = new Date(
    Date.UTC(year, month - 1, day, hour, minute, second)
  );

  const formattedDateString = parsedDate.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className={styles.updateContainer}>
      <h1>{title}</h1>
      <span>{formattedDateString}</span>
      <div className={styles.slideContainer}>
        {images && (
          <Slide>
            {images !== null
              ? images.map((image, index) => (
                  <div key={index}>
                    <div
                      className={styles.slide}
                      style={{
                        backgroundImage: `url(${image})`,
                      }}
                    ></div>
                  </div>
                ))
              : null}
          </Slide>
        )}
      </div>
      <p>{description}</p>
    </div>
  );
}

export default UpdateCard;
