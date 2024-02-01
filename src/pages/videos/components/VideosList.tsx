import VideoItem from "./VideoItem.tsx";
import {FC} from "react";
import {Video} from "../index.tsx";

const VideosList: FC<{ list: Video[] }> = ({ list }) => {
    return (
        list.map((video) => <VideoItem key={video.id}  {...video}/>)
    )
}

export default VideosList
