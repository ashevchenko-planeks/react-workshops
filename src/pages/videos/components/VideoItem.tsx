import {FC, useContext, useState} from "react";
import {Video} from "../index.tsx";
import {momentAgo} from "@/utils/moment-ago.ts";
import {shorthandNumber} from "@/utils/shorthand-number.ts";
import { CurrentUserContext } from "@/context/CurrentUserContext.tsx";

const VideoItem: FC<Video> = ({title, preview, views, uploaded, chanel, quality}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const {user} = useContext(CurrentUserContext)
    return (
        <div className="relative">
            <img className="rounded-2xl" src={preview} alt={`${title} preview`}/>
            <div className="absolute top-4 right-4 z-[1] bg-black/60 rounded-xl px-2">
                {quality === 'high' && '1080'}
                {quality === 'medium' && '480'}
                {quality === 'low' && '120'}
            </div>
            <div className="flex justify-between mt-4">
                <div>
                    <div className="flex items-start gap-2">
                        <img className="w-8 h-8 rounded-full shrink-0" src={chanel.avatar} alt=""/>
                        <div>
                            <div className="">
                                <p className="font-semibold">{title}</p>
                                <p className="text-xs">{chanel.name}</p>
                                <p className="text-sm">{shorthandNumber(views)} переглядів
                                    • {momentAgo(uploaded)} назад</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-circle btn-sm text-white" onClick={() => setIsDropdownOpen((prev) => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24"
                         viewBox="0 0 24 24" width="24" focusable="false">
                        <path fill="currentColor"
                            d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                    </svg>
                </button>
                {isDropdownOpen && (
                    <ul className="flex gap-2 flex-col absolute right-0 z-[2] -bottom-12 bg-[#1d232a] px-4 py-2 rounded w-32">
                        <li className="cursor-pointer">Save</li>
                        {user.role === 'admin' && <li className="text-red-400 cursor-pointer">Delete</li>}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default VideoItem
