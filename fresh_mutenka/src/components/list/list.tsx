'use client'

import styles from "./list.module.css"

type ListProps = {
    goals:any
    numberData:number
}
export default function List(props:ListProps) {
    const {goals, numberData} = props

    return (
        <div>
            <div>
                {/* {user.number} */}
            </div>
            <div className="component-list">
                <table className={styles.list}>
                    <tbody>
                        {goals.map((goal:any) => {
                            return (
                                <tr className={goal.number === numberData ? styles.nowlist : ""} key={goal.number}>
                                    <td>{goal.number}</td>
                                    <td >{goal.text}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}