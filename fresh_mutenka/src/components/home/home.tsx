import Header from "../common/Header/header";
import FetchUserId from "../common/sidenav/fetchUserId";
import List from "../list/list";
import Chat from "./chat/chat";
import style from './home.module.css'

export default function Home() {
  
    return(
        <div className={style.container} >
            <div className={style.header} >
                <Header />
            </div>
            <div className={style.main}>
                <div className={style.fetchUserId}>
                    <FetchUserId />
                </div>
                {/* <List />  */}
                <div className={style.chat}>
                    <Chat />
                </div>
            </div>
        </div>
    ) 
}