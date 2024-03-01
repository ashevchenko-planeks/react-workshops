
import {ArrowDownRightIcon, ArrowUpRightIcon} from "@heroicons/react/24/solid";
import {FC} from "react";

const Counter: FC<{ counter: string; trend?: number }> = ({counter, trend}) => {
    return (
        <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">{counter}</p>
            {trend ?? 0 > 0 ? <div
                className="flex items-center bg-green-200 font-medium rounded text-xs p-1 text-green-800 gap-1">{trend}
                <ArrowUpRightIcon className="w-3 h-3"/></div> : <div
                className="flex items-center bg-red-200 font-medium rounded text-xs p-1 text-red-800 gap-1">{trend}
                <ArrowDownRightIcon className="w-3 h-3"/></div>}
        </div>
    )
}

export default Counter
