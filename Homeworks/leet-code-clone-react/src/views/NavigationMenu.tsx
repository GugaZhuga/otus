import { NavLink } from "react-router-dom";

export default function NavigationMenu(){
    return <nav>
        <table>
            <tbody>
                <tr>
                    <td>
                        <NavLink to={"/"}>Задачи</NavLink>
                    </td>
                    <td>
                        <NavLink to={"/users"}>Пользователи</NavLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </nav>;
}