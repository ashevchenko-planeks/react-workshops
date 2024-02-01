import {faker} from "@faker-js/faker";
import {ChangeEvent, useEffect, useState} from "react";
import {User} from "../../interfaces/user.ts";
import {admin} from "../../dummy/user.ts";
import Sidebar from "../../components/Sidebar.tsx";
import VideosList from "./components/VideosList.tsx";

export interface Video {
    id: string
    title: string;
    preview: string;
    views: number;
    uploaded: Date;
    quality: 'high' | 'medium' | 'low';
    chanel: {
        name: string;
        avatar: string;
    }
}

const createVideos = (): Video[] => new Array(100).fill(null).map(() => ({
    id: faker.string.uuid(),
    title: faker.music.songName(),
    preview: faker.image.urlPicsumPhotos(),
    views: faker.number.int({min: 100, max: 10000000}), // memo for convert
    uploaded: faker.date.recent(),
    quality: faker.helpers.arrayElement(['high', 'medium', 'low']),
    chanel: {
        name: faker.company.name(),
        avatar: faker.image.avatar()
    }
}))

const Videos = () => {
    const [videos, setVideos] = useState<Video[]>([])
    const [searchCriteria, setSearchCriteria] = useState('')
    const [sortCriteria, setSortCriteria] = useState<'date' | 'popular'>("date")
    const [mood, setMood] = useState('Joyful')

    const [user, setUser] = useState<User>()

    useEffect(() => {
        setUser(admin)
    }, []);

    useEffect(() => {
        setVideos(createVideos())
    }, []);

    const list = videos.filter(({title}) => title.toLowerCase().includes(searchCriteria.toLowerCase())).sort((a, b) => {
        if (sortCriteria === 'popular') {
            return Number(b.views) - Number(a.views)
        }

        return b.uploaded.valueOf() - a.uploaded.valueOf()
    })

    const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchCriteria(event.target.value)
    }

    const onSort = (criteria: 'date' | 'popular') => {
        setSortCriteria(criteria)
    }

    return (
        <div className="grid grid-cols-12 min-h-screen">
            <div className="col-span-2">
                {user && <Sidebar user={user} setUser={setUser}/>}
            </div>
            <div className="col-span-10">
                <div className="p-10">
                    <div className="flex items-center gap-2 mb-10">
                        <input type="text" placeholder="Type here to search..." onChange={onSearch}
                               className="input input-bordered w-full"/>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1">Sort</div>
                            <ul tabIndex={0}
                                className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li onClick={() => onSort('date')}>Date</li>
                                <li onClick={() => onSort('popular')}>Popular</li>
                            </ul>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1">{mood}</div>
                            <ul tabIndex={0}
                                className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li onClick={() => setMood('Joyful')}>Joyful</li>
                                <li onClick={() => setMood('Melancholic')}>Melancholic</li>
                                <li onClick={() => setMood('Energetic')}>Energetic</li>
                                <li onClick={() => setMood('Anxious')}>Anxious</li>
                                <li onClick={() => setMood('Serene')}>Serene</li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <VideosList list={list}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Videos
