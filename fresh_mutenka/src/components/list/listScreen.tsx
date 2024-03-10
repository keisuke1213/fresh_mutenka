import Header from "../common/Header/header";
import List from "./list/list_fetchUserId";
import Sidenav from "../common/sidenav/sidenav_fetchUserId";
import style from './listScreen.module.css'

export default function Home() {

    return (
        <div className={style.container} >
            <div className={style.header} >
                <Header />
            </div>
            <div className={style.main}>
                <div className={style.sidenav}>
                    <Sidenav />
                </div>
                <div className={style.listContainer}>
                    <div className={style.list}>
                        <List />
                    </div>
                </div>
                {/* <List />  */}
            </div>
        </div>
    )
}