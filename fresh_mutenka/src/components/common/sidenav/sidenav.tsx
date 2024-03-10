"use client"
import styles from './sidenav.module.css';
import useSWR from 'swr'


const fetcher = (url: string) => fetch(url).then(r => r.json())

type SidenavProps = {
    goalId: string
}

export default function Sidenav(props: SidenavProps) {

    const goalId = props.goalId

    const { data, error } = useSWR(`/api/sub_goal/getByGoal/${goalId}`, fetcher)
    if (!data) {
        return <div>loading</div>
    }

    console.log("sub_goals-data", { data })

    const filteredGoals = data.goals.filter((goal) => {
        return goal.is_final || goal.is_now || goal.is_pre
    })

    console.log("filter", { filteredGoals })

    const sortedGoals = filteredGoals.sort((a, b) => {
        // is_finalがtrueのものを最優先で並べる
        if (a.is_final && !b.is_final) return -1;
        if (!a.is_final && b.is_final) return 1;

        // 次にis_currentがtrueのものを優先
        if (a.is_now && !b.is_now) return -1;
        if (!a.is_now && b.is_now) return 1;

        // 最後にis_preがtrueのものを並べる（上記の条件で既にソートされているため、実際にはここはあまり影響しない）
        return 0;
    })


    return (
        <div className={styles.sidenav}>
            {sortedGoals.map((goal: any) => {
                const finalGoal = goal.is_final === true ? goal.content : null;
                const nowGoal = goal.is_now === true ? goal.content : null;
                const preGoal = goal.is_pre === true ? goal.content : null;

                console.log("final", { finalGoal })
                console.log("final", { nowGoal })
                console.log("final", { preGoal })

                if (finalGoal) return <div className={styles.menuItem}>{finalGoal}</div>
                if (nowGoal) return <div className={styles.menuItem}>{nowGoal}</div>
                if (preGoal) return <div className={styles.menuItem}>{preGoal}</div>

                return null
            })}
            {/* <div className={`${styles.menuItem} ${styles.currentGoal}`}>今の目標</div>
            <div className={styles.menuItem}>前の目標</div> */}
        </div>
    );
};
