import Header from "../common/Header/header";
import FetchUserId from "../common/sidenav/sidenav_fetchUserId";
import Chat from "./chat/chat";

export default function Home() {

    return (
        <div>
            <Header />
            {/* <FetchUserId /> */}
            <Chat />
        </div>
    )
}