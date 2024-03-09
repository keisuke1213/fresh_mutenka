import Header from "../common/Header/header";
import List from "../list/list";
import Chat from "./chat/chat";

export default function Home() {
    return(
        <div>
            <Header />
            <List />
            <Chat />
        </div>
    ) 
}