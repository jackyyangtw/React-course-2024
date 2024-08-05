import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
const links = [
    { to: "/", text: "Home" },
    { to: "/events", text: "Events" },
];
function MainNavigation() {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    {links.map(({ to, text }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                }
                            >
                                {text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
