import {Dispatch, FC, useEffect, useState} from "react";
import {ADMIN_ROUTES, BASE_ROUTES} from "../constants/menu.ts";
import {User} from "../interfaces/user.ts";
import {admin, viewer} from "../dummy/user.ts";
import {NavLink} from "react-router-dom";

const Sidebar: FC<{ user: User; setUser: Dispatch<User> }> = ({ user, setUser }) => {
    const [routes, setRoutes] = useState(BASE_ROUTES)

    const users = [admin, viewer]

    useEffect(() => {
        if(user.role === 'admin') {
            setRoutes(ADMIN_ROUTES)
        } else {
            setRoutes(BASE_ROUTES)
        }
    }, [user]);

    const onChangeAccount = (user: User) => {
        setUser(user)
    }

    return (
        <div className="px-2 border-r h-full">
            <div className="dropdown w-full py-2">
                <div tabIndex={0} role="button" className="btn flex flex-col w-full">
                    <img src={user.avatar} alt="" className="w-8 h-8 rounded-full"/>
                    <div>
                        <p>{user.name}</p>
                        <p className="text-xs font-normal">{user.email})</p>
                        <p className="text-xs font-normal">{user.role}</p>
                    </div>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 space-y-3">
                    {users.map((user) => (<li className="flex flex-row flex-nowrap" onClick={() => onChangeAccount(user)} key={user.email}>
                        <a className="w-full">
                            <div className="w-8 h-8 p-0">
                                <img src={user.avatar} alt="" className="w-full h-full rounded-full"/>
                            </div>
                            <div>
                                <p>{user.name}</p>
                                <p className="text-xs font-normal">{user.role}</p>
                            </div>
                        </a>
                    </li>))}
                </ul>
            </div>

            <div className="flex flex-col gap-2">
                {Object.values(routes).map(({ route, title}) => (
                    <NavLink to={route} className="btn btn-neutral w-full btn-sm" key={route}>{title}</NavLink>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
