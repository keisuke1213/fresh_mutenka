"use client"
import styles from './sidenav.module.css';
import useSWR from 'swr'


const fetcher = url => fetch(url).then(r => r.json())

type SidenavProps = {
    goalId: string
}

export default function Sidenav(props:SidenavProps) {
    
    const goalId = props.goalId

    const { data, error } = useSWR(`/api/sub_goal/getByGoal/${goalId}`, fetcher)
    if (!data) {
        return <div>loading</div>
    }
    console.log(data)

    return(
        <div className={styles.sidenav}>
            <div className={styles.menuItem}>最終目標</div>
            <div className={`${styles.menuItem} ${styles.currentGoal}`}>今の目標</div>
            <div className={styles.menuItem}>前の目標</div>
            
        </div>
    );
};
