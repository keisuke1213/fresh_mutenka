'use client'

import List from "@/components/list/list";

import { useState, useEffect } from 'react';
import useSWR from 'swr';

const initialLists = [
    {
        number: 100,
        text: "a"
    }, {
        number: 90,
        text: "b"
    }, {
        number: 80,
        text: "a"
    }, {
        number: 70,
        text: "b"
    }, {
        number: 60,
        text: "a"
    }, {
        number: 50,
        text: "b"
    }, {
        number: 40,
        text: "b"
    }, {
        number: 30,
        text: "a"
    }, {
        number: 20,
        text: "b"
    }, {
        number: 10,
        text: "a",
    },
]

export default function Page() {

    const fetcher = (url: string | URL | Request) => fetch(url).then(r => r.json())
    const useUser = (level:string) => {
        const { data, isLoading, error } = useSWR(`/api/goal/getById/${level}`, fetcher)

        return {
            user: data,
            isLoading,
            isError: error
        }
    }

    // const MessageData = () => {
    //     const { user, isLoading, isError } = useUser()

    //     if (isLoading) return <div>error</div>
    //     if (isError) return <div>loading...</div>
    //     return (
    //         <div>a{user.message}</div>
    //     )
    // }

    // let messageData=MessageData()

    // const NumberData = () => {
    //     const { user, isLoading, isError } = useUser()

    //     if (isLoading) return <div>error</div>
    //     if (isError) return <div>loading...</div>
    //     return (
    //         user.number
    //     )
    // }
    // let numberData = NumberData()
    // console.log(numberData)

    const { user, isLoading, isError } = useUser("3d0a590b-07f6-4dc5-86f0-ba6433024cbe")
    let numberData = user ? user.number : null;
    const [goals, setGoals] = useState(initialLists)

    useEffect(() => {
        // if (user) {
        const updatedLists = goals.map(goal =>
            goal.number === numberData ? { ...goal, text: user.message } : goal
        );
        setGoals(updatedLists);
        // }
    }, [user]);

    return <List goals={goals} numberData={numberData}/>
}