"use client"
import handler from '@/pages/api/goal/create';
import styles from './sidenav.module.css';
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())
const user_id = "7677e7cd-f1bc-4124-a42d-e80f5da3fedd"


export default function Sidenav() {
    const { data, error } = useSWR(`/api/goal/getById/${}`, fetcher)
    console.log(data);
    
    return(
        <div className={styles.sidenav}>
            <div className={styles.menuItem}>最終目標</div>
            <div className={`${styles.menuItem} ${styles.currentGoal}`}>今の目標</div>
            <div className={styles.menuItem}>前の目標</div>
            
        </div>
    );
};
