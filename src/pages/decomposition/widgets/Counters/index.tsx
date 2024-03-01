import {shorthandNumber} from "../../utils";
import {ArrowDownRightIcon, ArrowUpRightIcon} from "@heroicons/react/24/solid";
import {COUNTERS} from "../../../../api/mocks";
import {getCounters} from "../../../../api";
import {useFetch} from "../../hooks/useFetch.ts";
import Counter from "./components/Counter.tsx";

const Counters = () => {
    const {isLoading: isCountersLoading, response: counter} = useFetch<typeof COUNTERS>(getCounters)

    return (
        <div className="grid grid-cols-4 bg-zinc-800 p-8 divide-x mb-10">
            <div className="px-4">
                <p className="font-medium text-lg mb-4">Total revenue</p>
                {isCountersLoading ? <span className="loading loading-spinner loading-sm"></span> : (
                    <Counter counter={`$ ${shorthandNumber(counter?.revenue.count ?? 0)}`} trend={counter?.revenue.trend} />
                )}
            </div>
            <div className="px-4">
                <p className="font-medium text-lg mb-4">Invoices</p>
                {isCountersLoading ? <span className="loading loading-spinner loading-sm"></span> : (
                    <Counter counter={new Intl.NumberFormat('en-US').format(counter?.invoices.count ?? 0)} trend={counter?.invoices.trend} />
                )}
            </div>
            <div className="px-4">
                <p className="font-medium text-lg mb-4">Clients</p>
                {isCountersLoading ? <span className="loading loading-spinner loading-sm"></span> : (
                    <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold">{new Intl.NumberFormat('en-US').format(counter?.clients.count ?? 0)}</p>
                        {counter?.clients.trend ?? 0 > 0 ? <div
                            className="flex items-center bg-green-200 font-medium rounded text-xs p-1 text-green-800 gap-1">{counter?.clients.trend}
                            <ArrowUpRightIcon className="w-3 h-3"/></div> : <div
                            className="flex items-center bg-red-200 font-medium rounded text-xs p-1 text-red-800 gap-1">{counter?.clients.trend}
                            <ArrowDownRightIcon className="w-3 h-3"/></div>}
                    </div>
                )}
            </div>
            <div className="px-4">
                <p className="font-medium text-lg mb-4">Loyalty</p>
                {isCountersLoading ? <span className="loading loading-spinner loading-sm"></span> : (
                    <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold">{new Intl.NumberFormat('en-US').format(counter?.loyalty.count ?? 0)}%</p>
                        {counter?.loyalty.trend !== undefined && counter.loyalty.trend > 0 ? <div
                            className="flex items-center bg-green-200 font-medium rounded text-xs p-1 text-green-800 gap-1">{counter?.loyalty.trend}
                            <ArrowUpRightIcon className="w-3 h-3"/></div> : <div
                            className="flex items-center bg-red-200 font-medium rounded text-xs p-1 text-red-800 gap-1">{Math.abs(counter?.loyalty.trend ?? 0)}
                            <ArrowDownRightIcon className="w-3 h-3"/></div>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Counters
