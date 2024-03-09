import styles from './sidenav.module.css';

export default function Sidenav() {
    return(
        <div className={styles.sidenav}>
            <div className={styles.menuItem}>最終目標</div>
            <div className={`${styles.menuItem} ${styles.currentGoal}`}>今の目標</div>
            <div className={styles.menuItem}>前の目標</div>
        </div>
    );
};
