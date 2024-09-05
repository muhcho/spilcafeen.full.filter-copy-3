import { NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <NavLink to="/">All Games</NavLink>
            <NavLink to="/create">Create a Game</NavLink>
        </nav>
    );
}
