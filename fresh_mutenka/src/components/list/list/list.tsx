'use client'

import styles from "./list.module.css"
import { useState, useEffect } from 'react';
import useSWR from 'swr';

const initialLists = [
    {
        content: "a",
        created_at: "",
        goal_id: "",
        id: "",
        is_achievement: false,
        is_final: false,
        is_now: false,
        is_pre: false,
        level: 100,
    }, {
        content: "a",
        created_at: "",
        goal_id: "",
        id: "",
        is_achievement: false,
        is_final: false,
        is_now: false,
        is_pre: false,
        level: 90,
    }, {
        content: "a",
        created_at: "",
        goal_id: "",
        id: "",
        is_achievement: false,
        is_final: false,
        is_now: false,
        is_pre: false,
        level: 80,
    }, {
        content: "a",
        created_at: "",
        goal_id: "",
        id: "",
        is_achievement: false,
        is_final: false,
        is_now: false,
        is_pre: false,
        level: 70,
    }, {
        contnen: "a",
        created_at: "",
        goal_id: "",
        id: "",
        is_achievement: false,
        is_final: false,
        is_now: false,
        is_pre: false,
        level: 60,
    }, {
        content: "a",
        created_at: "",
        goal_id: "",
        id: "",
        is_achievement: false,
        is_final: false,
        is_now: false,
        is_pre: false,
        level: 50,
    }, {
        content: "a",
        created_at: "",
        goal_id: "",
        id: "",
        is_achievement: false,
        is_final: false,
        is_now: false,
        is_pre: false,
        level: 40,
    }, {
        content: "a",
        created_at: "",
        goal_id: "",
        id: "",
        is_achievement: false,
        is_final: false,
        is_now: false,
        is_pre: false,
        level: 30,
    }, {
        content: "a",
        created_at: "",
        goal_id: "",
        id: "",
        is_achievement: false,
        is_final: false,
        is_now: false,
        is_pre: false,
        level: 20,
    }, {
        content: "a",
        created_at: "",
        goal_id: "",
        id: "",
        is_achievement: false,
        is_final: false,
        is_now: false,
        is_pre: false,
        level: 10,
    },
]

const fetcher = (url: string | URL | Request) => fetch(url).then(r => r.json())

type ListProps = {
    goalId: string
}

export default function List(props: ListProps) {

    const goalId = props.goalId

    const useUser = (goal_id: string) => {
        const { data, isLoading, error } = useSWR(`/api/goal/getById/${goal_id}`, fetcher)

        return {
            user: data,
            isLoading,
            isError: error
        }
    }

    const { user, isLoading, isError } = useUser(goalId)
    const [goals, setGoals] = useState<any>(null)


    useEffect(() => {
        console.log("user:",{user})
        if (user) {

            const updatedLists = user;

            setGoals(updatedLists.goals);

            console.log(goals?.length)
            // console.log(goals?[0].content)
            const contents = goals?.map((goal: { content: any; }) => goal.content);
            
        }
    }, [user]);


    console.log(user)
    // console.log("goals", goals.map(goal => goal.content))
    if(goals===null){
        return
    }
    console.log("goals", goals)

    //リストの並び替えはここで行う

    goals.sort((a: { level: number; }, b: { level: number; })=>{
        if (a.level < b.level) {
            return 1;
          } else {
            return -1;
          }
        })

    console.log("sort",{goals});

    return (
            <div className={styles.listWrapper}>
                <table className={styles.list}>
                    <tbody>
                        {goals.map( (goal:any) => {
                            const finalStyle=goal.is_final === true ? styles.finallist : " ";
                            const nowStyle=goal.is_now === true ? styles.nowlist : " ";
                            const achiveStyle=goal.is_achievement === true ? styles.achievelist : " ";
                            return (
                                <tr className={`${finalStyle} ${nowStyle} ${achiveStyle}`} key={goal.level}>
                                    <td className={styles.level}>{goal.level}</td>
                                    <td className={styles.content}>{goal.content}</td>
                                </tr>
                            )
                         })}
                    </tbody>
                </table>
            </div>
    )
}