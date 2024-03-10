"use client"
import { useEffect, useState } from 'react';
import styles from './sidenav.module.css';
import useSWR from 'swr'


const fetcher = (url: string) => fetch(url).then(r => r.json())

type SidenavProps = {
    goalId: string
}

export default function Sidenav(props: SidenavProps) {

    const goalId = props.goalId

    const useUser = (goal_id: string) => {
        const { data, isLoading, error, mutate } = useSWR(`/api/goal/getById/${goal_id}`, fetcher)
        return {
            user: data,
            isLoading,
            isError: error,
            mutate
        }
    }

    const { user, isLoading, isError, mutate } = useUser(goalId)
    const [goals, setGoals] = useState<any>(null)


    useEffect(() => {
        if (user) {

            const updatedLists = user;

            setGoals(updatedLists.goals);
        }
    }, [user]);


    console.log(user)
    // console.log("goals", goals.map(goal => goal.content))
    if (goals === null) {
        return <div>Loading...</div>;
    }
    console.log("goals", goals)

    const filteredGoals = goals.filter((goal) => {
        return goal.is_final || goal.is_now || goal.is_pre
    })

    const sortedGoals = filteredGoals.sort((a, b) => {
        if (a.is_final && !b.is_final) return -1;
        if (!a.is_final && b.is_final) return 1;
        if (a.is_now && !b.is_now) return -1;
        if (!a.is_now && b.is_now) return 1;
        return 0;
    });




    return (
        <div className={styles.sidenav}>
            {sortedGoals.map((goal: any) => {
                const finalGoal = goal.is_final === true ? goal.content : null;
                const nowGoal = goal.is_now === true ? goal.content : null;
                const nowGoalId = goal.is_now === true ? goal.id : null;
                const nowLevel = goal.is_now === true ? goal.level : null;
                const preGoal = goal.is_pre === true ? goal.content : null;

                console.log("final", { finalGoal })
                console.log("final", { nowGoal })
                console.log("final", { preGoal })

                return (
                    <>
                        <div className={styles.menuContainer}>
                            {finalGoal && <div className={`${styles.menuItem} ${styles.finalGoal}`}><span className={styles.flag}>🚩</span>{finalGoal}</div>}
                            <div className={styles.menuBorder} />
                            {nowGoal && <div className={`${styles.menuItem} ${styles.currentGoal}`}>
                                <p className={styles.level}>Lv.{nowLevel}</p>
                                {nowGoal}
                                <button className={styles.btn} onClick={() => {
                                    fetcher(`/api/sub_goal/update/achievementSubGoal/${nowGoalId}`)
                                    .then(data => {
                                      console.log(data); // レスポンスデータを処理
                                    })
                                    .catch(error => {
                                      console.error(error); // エラーを処理
                                    });
                                    mutate(null, true);
                                    console.log("再取得しました。");
                                }}>CLEAR</button>
                            </div>}
                            <div className={styles.menuBorder} />
                            {preGoal && <div className={`${styles.menuItem} ${styles.preGoal}`}>{preGoal}</div>}
                        </div>
                    </>
                )
            })}
        </div>
    );
};