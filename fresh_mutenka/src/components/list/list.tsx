'use client'

import styles from "./list.module.css"
import useSWR from 'swr';

const lists = [
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
        text: "",
    },
]

export default function List() {
    const fetcher = (url: string | URL | Request) => fetch(url).then(r => r.json())
    const useUser = () => {
        const { data, isLoading, error } = useSWR(`/api/user`, fetcher)

        return {
            user: data,
            isLoading,
            isError: error
        }
    }

    const MessageData = () => {
        const { user, isLoading, isError } = useUser()

        if (isLoading) return <div>error</div>
        if (isError) return <div>loading...</div>
        return (
            <div>a{user.message}</div>
        )
    }

    let messageData=MessageData()

    const NumberData =()=>{
        const { user, isLoading, isError } = useUser()

        if (isLoading) return <div>error</div>
        if (isError) return <div>loading...</div>
        return (
            user.number
        )
    }

    let numberData=NumberData()
    console.log(numberData)

    return (
        <div>
            <div>
                <MessageData />
            </div>
            <div className="component-list">
                <table className={styles.list}>
                    <tbody>
                        {lists.map((list) => {
                            return (
                                <tr className={list.number === numberData ? styles.nowlist : ""} key={list.number}>
                                    <td>{list.number}</td>
                                    <td >{list.text}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}