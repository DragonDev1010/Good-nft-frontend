import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return(
        <div>
            <ul>
                <li>
                    <Link to="/holder">holder</Link>
                </li>
                <li>
                    <Link to="/admin">admin</Link>
                </li>
                <li>
                    <Link to="/influencer">influencer</Link>
                </li>
                <li>
                    <Link to="/whitelist">whitelist</Link>
                </li>
                
            </ul>
        </div>
    )
}

export default NavBar