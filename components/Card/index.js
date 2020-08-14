import styles from "./card.module.css";
const ProgramCard = ({ image="", title="", flightNo,launchYear }) => {
    return <div className={styles.cardContainer}> 
        <div className={styles.imageContainer}>
            <img className={styles.image} src={image} alt="" />
        </div>
<span className={styles.title}>{title} #{flightNo}</span>
        <div>
            <span className={styles.left}>Mission Ids:</span>
            <span className={styles.right}>[1,2]</span>
        </div>
        <div>
            <span className={styles.left}>Launch Year:</span>
<span className={styles.right}>{launchYear}</span>
        </div>
        <div>
            <span className={styles.left}>Successful launch:</span>
            <span className={styles.right}>True</span>
        </div>
        <div>
            <span className={styles.left}>Successful landing:</span>
            <span className={styles.right}>False</span>
        </div>
    </div>

}

export default ProgramCard