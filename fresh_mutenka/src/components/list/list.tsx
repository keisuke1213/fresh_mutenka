'use client'

import { Content } from "next/font/google";
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

export default function List() {

    const fetcher = (url: string | URL | Request) => fetch(url).then(r => r.json())
    const useUser = (goal_id: string) => {
        const { data, isLoading, error } = useSWR(`/api/goal/getById/${goal_id}`, fetcher)

        return {
            user: data,
            isLoading,
            isError: error
        }
    }

    const { user, isLoading, isError } = useUser("3d0a590b-07f6-4dc5-86f0-ba6433024cbe")
    const [goals, setGoals] = useState<any>(null)


    useEffect(() => {
        console.log("user:",{user})
        if (user) {

            const updatedLists = user;

            setGoals(updatedLists.goals);

            console.log(goals?.length)
            // console.log(goals?[0].content)
            const contents = goals?.map(goal => goal.content);
            
        }
    }, [user]);


    console.log(user)
    // console.log("goals", goals.map(goal => goal.content))
    if(goals===null){
        return
    }
    console.log("goals", goals)

    //リストの並び替えはここで行う

    goals.sort((a, b)=>{
        if (a.level < b.level) {
            return 1;
          } else {
            return -1;
          }
        })

    console.log("sort",{goals});

    return (
        <div>
            <div className="component-list">
                <table className={styles.list}>
                    <tbody>
                        {goals.map( (goal:any) => {
                            const finalStyle=goal.is_final === true ? styles.finallist : " ";
                            const nowStyle=goal.is_now === true ? styles.nowlist : " ";
                            const achiveStyle=goal.is_achievement === true ? styles.achievelist : " ";
                            return (
                                <tr className={`${finalStyle} ${nowStyle} ${achiveStyle}`} key={goal.level}>
                                    <td>{goal.level}</td>
                                    <td>{goal.content}</td>
                                </tr>
                            )
                         })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}