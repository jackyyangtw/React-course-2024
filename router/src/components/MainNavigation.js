import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
const navs = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Products",
        path: "/products",
    },
];

export default function MainNavigation() {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    {navs.map((nav, index) => (
                        <li key={index}>
                            <NavLink
                                to={nav.path}
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                }
                            >
                                {nav.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
