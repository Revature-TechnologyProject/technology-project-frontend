import { NavLink as Link } from "react-router-dom";

import "./NavLink.css";

interface props {
    to: string,
    children: any
}

function NavLink({to, children}: props) {
    return (
        <>
            <Link to={to} className={"link"}>{children}</Link>
        </>
    )
}

export default NavLink;