import styles from './tile.module.css'

const GreenTile =({name,selected,type,onFilterSelect,value})=>{
    const onCLickHandler = ()=>{
        onFilterSelect({type,name,value})
    }
    return<div onClick={onCLickHandler} className={selected?`${styles.tile} ${styles.selected}`:`${styles.tile}`}>
        {name}
    </div>
}
export default GreenTile;