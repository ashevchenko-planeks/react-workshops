import {Bar} from "react-chartjs-2";
import {ChartDataset} from "chart.js";
import {ORDERS} from "../../../../api/mocks";
import {options} from "../../index.tsx";
import {useFetch} from "../../hooks/useFetch.ts";
import {getOrders} from "../../../../api";
import {useMemo, useRef, useState} from "react";
import {labels} from "../../constants.ts";
import {useResizeObserver} from "usehooks-ts";
import { debounce } from "lodash";


const Orders = () => {
    const {isLoading: isOrdersLoading, response: orders} = useFetch<typeof ORDERS>(getOrders)
    const [orderFilter, setOrderFilter] = useState('')
    const ref = useRef(null);

    useResizeObserver({
        ref,
        box: 'border-box'
    })


    return (
        <div className="col-span-5 bg-zinc-800 min-h-96 p-6 pb-10 overflow-auto resize" ref={ref}>
            <div className="absolute z-30 bg-black">Loading...</div>
            <div className="flex w-full items-center justify-between mb-4">
                <p className="font-medium text-xl">Orders</p>
                <div className="flex items-center">
                    {orderFilter ? <p className="text-xs">Filter data by {orderFilter}</p> : null}
                    <details className="dropdown">
                        <summary className="m-1 btn">Filters</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li onClick={() => setOrderFilter("date")}><a>By date</a></li>
                            <li onClick={() => setOrderFilter("count")}><a>By count</a></li>
                        </ul>
                    </details>
                </div>
            </div>
            <div className="w-full h-full">
                {isOrdersLoading && <span className="loading loading-spinner loading-sm"></span>}
                {!isOrdersLoading && (
                    <Bar options={options}
                         data={{labels, datasets: orders as ChartDataset<"bar", number[]>[]}}/>
                )}
            </div>
        </div>
    )
}

export default Orders
