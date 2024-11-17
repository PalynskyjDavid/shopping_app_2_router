import { useContext } from "react";
import { UserContext } from "../Provider_and_context/UserProvider.tsx";
import '../../Styles/Header.css';
import UserDropDown from "../Other/UserDropDown.js";
import { Outlet } from "react-router-dom";


export default function Header() {
    const { loggedInUser, userList } = useContext(UserContext);
    return (
        <>
        <header className="header">
            <div className="header-title">Shopping app</div>
            <div>
            <div className="header-user">Hello {userList[loggedInUser].name}</div>
            <UserDropDown />
            </div>
        </header>
        <Outlet />
        </>
    )
}

//https://refine.dev/blog/how-react-fragments-is-works/#what-is-react-fragment