import {Fragment, useState} from "react";
import {shorthandNumber} from "../../utils";
import {ArrowDownRightIcon, ArrowUpRightIcon} from "@heroicons/react/24/solid";
import {Bar, Pie} from "react-chartjs-2";
import {labels, WIDGETS} from "../../constants.ts";
import {ChartDataset} from "chart.js";
import {ACTIVITIES, CORPORATIONS, COUNTERS, devices, ORDERS, USER_DEVICES, USERS} from "../../../../api/mocks";
import Bell from "../../icons/Bell.tsx";
import {options, timeAgo} from "../../index.tsx";
import {useFetch} from "../../hooks/useFetch.ts";
import {
    getActivities,
    getCorporations,
    getCounters,
    getInvoices,
    getOrders,
    getUserDevices,
    getUsers
} from "../../../../api";
import {getActivityText} from "../../utils/getAtivityText.tsx";

const MobilePresentation = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [orderFilter, setOrderFilter] = useState('')
    const {isLoading: isCountersLoading, response: counter} = useFetch<typeof COUNTERS>(getCounters)
    const {isLoading: isInvoicesLoading, response: invoices} = useFetch(getInvoices)
    const {isLoading: isActivitiesLoading, response: activities} = useFetch<typeof ACTIVITIES>(getActivities)
    const {isLoading: isUsersLoading, response: users} = useFetch<typeof USERS>(getUsers)
    const {isLoading: isCorporationsLoading, response: corporations} = useFetch<typeof CORPORATIONS>(getCorporations)
    const {isLoading: isOrdersLoading, response: orders} = useFetch<typeof ORDERS>(getOrders)
    const {isLoading: isUserDevicesLoading, response: userDevices} = useFetch<typeof USER_DEVICES>(getUserDevices)

    return (
        <div role="tablist" className={`tabs tabs-bordered grid-cols-[repeat(${WIDGETS.length},_1fr)]`}>
            {WIDGETS.map((widget, index) => (
                <Fragment key={widget}>
                    <input onChange={() => setActiveTabIndex(index)} type="radio" name={widget} role="tab"
                           className={`tab flex-auto ${activeTabIndex === index ? 'tab-active' : ''}`}
                           checked={activeTabIndex === index} aria-label={widget}/>
                    <div role="tabpanel" className="tab-content p-10">
                        {activeTabIndex === 0 && (
                            <div className="grid bg-zinc-800 p-8 divide-y space-y-8 mb-10">
                                <div className="px-4">
                                    <p className="font-medium text-lg mb-4">Total revenue</p>
                                    {isCountersLoading ?
                                        <span className="loading loading-spinner loading-sm"></span> : (
                                            <div className="flex items-center gap-2">
                                                <p className="text-2xl font-bold">$ {shorthandNumber(counter?.revenue.count ?? 0)}</p>
                                                {counter?.revenue.trend ?? 0 > 0 ? <div
                                                    className="flex items-center bg-green-200 font-medium rounded text-xs p-1 text-green-800 gap-1">{counter?.revenue.trend}
                                                    <ArrowUpRightIcon className="w-3 h-3"/></div> : <div
                                                    className="flex items-center bg-red-200 font-medium rounded text-xs p-1 text-red-800 gap-1">{counter?.revenue.trend}
                                                    <ArrowDownRightIcon className="w-3 h-3"/></div>}
                                            </div>
                                        )}
                                </div>
                                <div className="px-4">
                                    <p className="font-medium text-lg mb-4">Invoices</p>
                                    {isCountersLoading ?
                                        <span className="loading loading-spinner loading-sm"></span> : (
                                            <div className="flex items-center gap-2">
                                                <p className="text-2xl font-bold">{new Intl.NumberFormat('en-US').format(counter?.invoices.count ?? 0)}</p>
                                                {counter?.invoices.trend ?? 0 > 0 ? <div
                                                    className="flex items-center bg-green-200 font-medium rounded text-xs p-1 text-green-800 gap-1">{counter?.invoices.trend}
                                                    <ArrowUpRightIcon className="w-3 h-3"/></div> : <div
                                                    className="flex items-center bg-red-200 font-medium rounded text-xs p-1 text-red-800 gap-1">{counter?.invoices.trend}
                                                    <ArrowDownRightIcon className="w-3 h-3"/></div>}
                                            </div>
                                        )}
                                </div>
                                <div className="px-4">
                                    <p className="font-medium text-lg mb-4">Clients</p>
                                    {isCountersLoading ?
                                        <span className="loading loading-spinner loading-sm"></span> : (
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
                                    {isCountersLoading ?
                                        <span className="loading loading-spinner loading-sm"></span> : (
                                            <div className="flex items-center gap-2">
                                                <p className="text-2xl font-bold">{new Intl.NumberFormat('en-US').format(counter?.loyalty.count ?? 0)}%</p>
                                                {counter?.loyalty.trend !== undefined && counter.loyalty.trend > 0 ?
                                                    <div
                                                        className="flex items-center bg-green-200 font-medium rounded text-xs p-1 text-green-800 gap-1">{counter?.loyalty.trend}
                                                        <ArrowUpRightIcon className="w-3 h-3"/></div> : <div
                                                        className="flex items-center bg-red-200 font-medium rounded text-xs p-1 text-red-800 gap-1">{Math.abs(counter?.loyalty.trend ?? 0)}
                                                        <ArrowDownRightIcon className="w-3 h-3"/></div>}
                                            </div>
                                        )}
                                </div>
                            </div>
                        )}
                        {activeTabIndex === 1 && (
                            <div className="col-span-5 bg-zinc-800 min-h-96 p-6 pb-10">
                                <div className="flex w-full items-center justify-between mb-4">
                                    <p className="font-medium text-xl">Orders</p>
                                    <div className="flex items-center">
                                        {orderFilter ?
                                            <p className="text-xs">Filter data by {orderFilter}</p> : null}
                                        <details className="dropdown">
                                            <summary className="m-1 btn">Filters</summary>
                                            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                                <li onClick={() => setOrderFilter("date")}><a>By date</a>
                                                </li>
                                                <li onClick={() => setOrderFilter("count")}><a>By count</a>
                                                </li>
                                            </ul>
                                        </details>
                                    </div>
                                </div>
                                <div className="w-full h-full">
                                    {isOrdersLoading &&
                                        <span className="loading loading-spinner loading-sm"></span>}
                                    {!isOrdersLoading && (
                                        <Bar options={options}
                                             data={{
                                                 labels,
                                                 datasets: orders as ChartDataset<"bar", number[]>[]
                                             }}/>
                                    )}
                                </div>
                            </div>
                        )}
                        {activeTabIndex === 2 && (
                            <div className="col-span-3 bg-zinc-800 p-6">
                                <p className="font-medium text-xl mb-4">User devices</p>
                                {isUserDevicesLoading &&
                                    <span className="loading loading-spinner loading-sm"></span>}
                                {!isUserDevicesLoading && (
                                    <Pie data={{
                                        labels: devices,
                                        datasets: [userDevices] as unknown as ChartDataset<"pie", number[]>[]
                                    }}/>
                                )}
                            </div>
                        )}
                        {activeTabIndex === 3 && (
                            <div className="bg-zinc-800 p-6">
                                <p className="font-medium text-xl mb-4">Activities</p>
                                <div className="flex flex-col divide-y">
                                    {isActivitiesLoading || isCorporationsLoading || isUsersLoading ?
                                        <span
                                            className="loading loading-spinner loading-sm"></span> : activities?.map(({
                                                                                                                          id,
                                                                                                                          type,
                                                                                                                          actionId,
                                                                                                                          actor,
                                                                                                                          date
                                                                                                                      }) => {
                                            const user = users?.find(({id}) => id === actor)
                                            const corporation = corporations?.find(({id}) => id === actor)
                                            return (
                                                <div className="flex items-start gap-4 py-2" key={id}>
                                                    <div className="shrink-0">{user?.avatar ?
                                                        <img src={user.avatar} alt=""
                                                             className="w-8 h-8 rounded-full"/> :
                                                        <div
                                                            className="w-8 h-8 bg-yellow-600 rounded-full p-2">
                                                            <Bell
                                                                className="size-full fill-white"/>
                                                        </div>}</div>
                                                    <div>
                                                        {user && <b>{user.firstName} {user.lastName} </b>}
                                                        <span>{getActivityText(type, actionId, corporation)}</span>
                                                        <p className="text-sm">{timeAgo.format(date)}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        )}
                        {activeTabIndex === 4 && (
                            <div className="col-span-3 bg-zinc-800 p-6">
                                <p className="font-medium text-xl mb-4">Recent Invoices</p>
                                {isInvoicesLoading ?
                                    <span className="loading loading-spinner loading-sm"></span> : (
                                        <table className="table-fixed w-full border">
                                            <thead>
                                            <tr>
                                                <th className="text-left border bg-zinc-600 p-2">Invoice
                                                    Number
                                                </th>
                                                <th className="text-left border bg-zinc-600 p-2">Date
                                                    Created
                                                </th>
                                                <th className="text-left border bg-zinc-600 p-2">Client</th>
                                                <th className="text-left border bg-zinc-600 p-2">Amount</th>
                                                <th className="text-left border bg-zinc-600 p-2">Status</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {invoices?.map(({
                                                                id,
                                                                invoiceId,
                                                                createdAt,
                                                                client,
                                                                amount,
                                                                status
                                                            }) => (
                                                <tr key={id}>
                                                    <td className="py-2 border p-2">{invoiceId}</td>
                                                    <td className="py-2 border p-2">{createdAt.toLocaleString()}</td>
                                                    <td className="py-2 border p-2">{client.name}</td>
                                                    <td className="py-2 border p-2">{amount}</td>
                                                    <td className="py-2 border p-2">{status.type}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    )}
                            </div>
                        )}
                    </div>
                </Fragment>))}
        </div>
    )
}

export default MobilePresentation
