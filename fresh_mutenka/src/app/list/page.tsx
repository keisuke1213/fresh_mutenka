// 'use client'

// import List from "@/components/list/list";

// import { useState, useEffect } from 'react';
// import useSWR from 'swr';

// const initialLists = [
//     {
//         contnet: "a",
//         created_at: "",
//         goal_id: "",
//         id: "",
//         is_achivement: false,
//         is_final: false,
//         is_now: false,
//         is_pre: false,
//         level: 100,
//     }, {
//         contnet: "a",
//         created_at: "",
//         goal_id: "",
//         id: "",
//         is_achivement: false,
//         is_final: false,
//         is_now: false,
//         is_pre: false,
//         level: 90,
//     }, {
//         contnet: "a",
//         created_at: "",
//         goal_id: "",
//         id: "",
//         is_achivement: false,
//         is_final: false,
//         is_now: false,
//         is_pre: false,
//         level: 80,
//     }, {
//         contnet: "a",
//         created_at: "",
//         goal_id: "",
//         id: "",
//         is_achivement: false,
//         is_final: false,
//         is_now: false,
//         is_pre: false,
//         level: 70,
//     }, {
//         contnet: "a",
//         created_at: "",
//         goal_id: "",
//         id: "",
//         is_achivement: false,
//         is_final: false,
//         is_now: false,
//         is_pre: false,
//         level: 60,
//     }, {
//         contnet: "a",
//         created_at: "",
//         goal_id: "",
//         id: "",
//         is_achivement: false,
//         is_final: false,
//         is_now: false,
//         is_pre: false,
//         level: 50,
//     }, {
//         contnet: "a",
//         created_at: "",
//         goal_id: "",
//         id: "",
//         is_achivement: false,
//         is_final: false,
//         is_now: false,
//         is_pre: false,
//         level: 40,
//     }, {
//         contnet: "a",
//         created_at: "",
//         goal_id: "",
//         id: "",
//         is_achivement: false,
//         is_final: false,
//         is_now: false,
//         is_pre: false,
//         level: 30,
//     }, {
//         contnet: "a",
//         created_at: "",
//         goal_id: "",
//         id: "",
//         is_achivement: false,
//         is_final: false,
//         is_now: false,
//         is_pre: false,
//         level: 20,
//     }, {
//         contnet: "a",
//         created_at: "",
//         goal_id: "",
//         id: "",
//         is_achivement: false,
//         is_final: false,
//         is_now: false,
//         is_pre: false,
//         level: 10,
//     },
// ]

// export default function Page() {

//     const fetcher = (url: string | URL | Request) => fetch(url).then(r => r.json())
//     const useUser = (goal_id: string) => {
//         const { data, isLoading, error } = useSWR(`/api/goal/getById/${goal_id}`, fetcher)

//         return {
//             user: data,
//             isLoading,
//             isError: error
//         }
//     }

//     const { user, isLoading, isError } = useUser("3d0a590b-07f6-4dc5-86f0-ba6433024cbe")
//     const [goals, setGoals] = useState(initialLists)



//     useEffect(() => {
//         if (user) {

//             const updatedLists = user;

//             setGoals(updatedLists);
//             console.log(user)
//             console.log(goals.length)
//         }
//     }, [user]);


//     return <List goals={goals} />
// }

