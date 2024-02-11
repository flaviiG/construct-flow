import styles from "./Instructions.module.css";

function Instructions() {
  return (
    <div className={styles.instructions}>
      <div className={styles.instruction}>
        <p>Click on a project or request card to see details</p>
      </div>
    </div>
  );
}

export default Instructions;
