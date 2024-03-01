import {
    ACTIVITIES,
    CORPORATIONS,
    devices,
    INVOICES,
    USER_DEVICES,
    USERS
} from "../../../../api/mocks";
import Counters from "../Counters";
import Orders from "../Orders";
import {Pie} from "react-chartjs-2";
import {ChartDataset} from "chart.js";
import Bell from "../../icons/Bell.tsx";
import {useFetch} from "../../hooks/useFetch.ts";
import {
    getActivities,
    getCorporations,
    getInvoices,
    getUserDevices,
    getUsers
} from "../../../../api";
import {useDeferredValue, useState} from "react";
import {getActivityText} from "../../utils/getAtivityText.tsx";
import {timeAgo} from "../../index.tsx";

const DesktopPresentation = () => {
    const [searchValue, setSearchValue] = useState("")
    const {isLoading: isInvoicesLoading, response: invoices} = useFetch(getInvoices)
    const {isLoading: isActivitiesLoading, response: activities} = useFetch<typeof ACTIVITIES>(getActivities)
    const {isLoading: isUsersLoading, response: users} = useFetch<typeof USERS>(getUsers)
    const {isLoading: isCorporationsLoading, response: corporations} = useFetch<typeof CORPORATIONS>(getCorporations)
    const {isLoading: isUserDevicesLoading, response: userDevices} = useFetch<typeof USER_DEVICES>(getUserDevices)
    const deferredSearchValue = useDeferredValue(searchValue)

    return (
        <div className="p-10">
            <div className="relative">
                <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)}
                       type="text"
                       placeholder="Find invoice by client name"
                       className="input input-bordered w-full mb-10"/>
                {Boolean(deferredSearchValue.length) && (
                    <div className="absolute w-full top-14 left-0 bg-zinc-600 rounded p-4">
                        <ul className="divide-y-2">
                            {INVOICES.filter(({client}) => client.name.includes(deferredSearchValue)).map(({
                                                                                                               id,
                                                                                                               status,
                                                                                                               client,
                                                                                                               amount,
                                                                                                               createdAt
                                                                                                           }) => (
                                <li className="py-2" key={id}>
                                    <div>Status: {status.type}</div>
                                    <div>Client: {client.name}</div>
                                    <div>Amount: {amount}</div>
                                    <div>Created: {createdAt.toLocaleString()}</div>
                                </li>))}
                        </ul>
                    </div>
                )}
            </div>
            <Counters/>
            <div className="grid grid-cols-8 gap-6 mb-10">
                <div className="col-span-5 bg-zinc-800 min-h-96 p-6 pb-10">
                    <Orders/>
                </div>
                <div className="col-span-3 bg-zinc-800 p-6">
                    <p className="font-medium text-xl mb-4">User devices</p>
                    {isUserDevicesLoading && <span className="loading loading-spinner loading-sm"></span>}
                    {!isUserDevicesLoading && (
                        <Pie data={{
                            labels: devices,
                            datasets: [userDevices] as unknown as ChartDataset<"pie", number[]>[]
                        }}/>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
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
                                            <div className="w-8 h-8 bg-yellow-600 rounded-full p-2"><Bell
                                                className="size-full fill-white"/></div>}</div>
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
                <div className="col-span-3 bg-zinc-800 p-6">
                    <p className="font-medium text-xl mb-4">Recent Invoices</p>
                    {isInvoicesLoading ? <span className="loading loading-spinner loading-sm"></span> : (
                        <table className="table-fixed w-full border">
                            <thead>
                            <tr>
                                <th className="text-left border bg-zinc-600 p-2">Invoice Number</th>
                                <th className="text-left border bg-zinc-600 p-2">Date Created</th>
                                <th className="text-left border bg-zinc-600 p-2">Client</th>
                                <th className="text-left border bg-zinc-600 p-2">Amount</th>
                                <th className="text-left border bg-zinc-600 p-2">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {invoices?.map(({id, invoiceId, createdAt, client, amount, status}) => (
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
            </div>
        </div>
    )
}

export default DesktopPresentation
