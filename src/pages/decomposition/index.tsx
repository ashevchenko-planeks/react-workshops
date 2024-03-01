import Sidebar from "../../components/Sidebar.tsx";
import {useState} from "react";
import {User} from "../../interfaces/user.ts";
import {admin} from "../../dummy/user.ts";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, ArcElement,
} from 'chart.js';
import Presentation from "./widgets/Presentation";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        }
    },
};


TimeAgo.addDefaultLocale(en)

export const timeAgo = new TimeAgo('en')

const Decomposition = () => {
    const [user, setUser] = useState<User>(admin)

    return (
        <div className="grid grid-cols-12 min-h-screen">
            <div className="col-span-2">
                {user && <Sidebar user={user} setUser={setUser}/>}
            </div>
            <div className="col-span-10">
                <Presentation />
            </div>
        </div>
    )
}

export default Decomposition
