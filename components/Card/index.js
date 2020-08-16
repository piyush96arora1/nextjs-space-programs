import styles from "./card.module.css";
const ProgramCard = ({
  image = "",
  title = "",
  flightNo,
  launchYear,
  missionId = [],
  launchSuccess,
  landSuccess,
}) => {
  const ids = missionId && missionId.length ? missionId : [];
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt="" />
      </div>
      <span className={styles.title}>
        {title} #{flightNo}
      </span>
      <div>
        <span className={styles.left}>Mission Ids:</span>
        <span className={styles.right}>
          {ids.length > 0 ? ids.map((item) => <span>{item} </span>) : "[ ]"}
        </span>
      </div>
      <div>
        <span className={styles.left}>Launch Year:</span>
        <span className={styles.right}>{launchYear}</span>
      </div>
      <div>
        <span className={styles.left}>Successful launch:</span>
        <span className={styles.right}>{launchSuccess ? "True" : "False"}</span>
      </div>
      <div>
        <span className={styles.left}>Successful landing:</span>
        <span className={styles.right}>{landSuccess ? "True" : "False"}</span>
      </div>
    </div>
  );
};

export default ProgramCard;
