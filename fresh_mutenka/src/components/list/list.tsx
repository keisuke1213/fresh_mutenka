import styles from "./list.module.css"
export default function List() {

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
            text: "b",
            completed:false
        },
    ]

    // const nowList = (number) => {
    //     let nowlist;
    //     nowlist = lists.find((list) => list.number === number);
    // }

    return (
        <div className="component-list">
            <table className={styles.list}>
                {lists.map((list) => {
                    return (
                        <tr style={list.number === 10 ? { background: "#ffe4e1" } : {}}>
                            <td>{list.number}</td>
                            <td>{list.text}</td>
                        </tr>
                    )
                })}
            </table>
        </div>

    )
}