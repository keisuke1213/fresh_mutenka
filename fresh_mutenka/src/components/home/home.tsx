import Header from "../common/Header/header";
import Sidenav from "../common/sidenav/sidenav";
import List from "../list/list";
import Chat from "./chat/chat";

export default function Home() {
    return(
        <div>
            <Header />
            <Sidenav />
            <List />
            <Chat />
        </div>
    ) 
}