import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import classes from "./MainHeader.module.css";
import MainHeaderBackground from "./MainHeaderBackground";
import NavLink from "./NavLink";
export default function MainHeader() {
    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                    <Image src={logoImg} alt="" priority />
                    NextLevel Food
                </Link>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href="/meals">Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href="/community">Community</NavLink>
                        </li>
                        <li>
                            <NavLink href="/meals/share">Share</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
