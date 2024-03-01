import {
    ACTIVITIES,
    CORPORATIONS,
    COUNTERS,
    INVOICES,
    MONTHLY_REVENUE,
    ORDERS,
    STATUSES,
    USER_DEVICES,
    USERS
} from "./mocks";

const delay = () => new Promise((resolve) => setTimeout(() => {
    resolve(true)
}, 1000))

export const getCounters = async () => {
    await delay()

    return COUNTERS
}

export const getMonthlyRevenue = async () => {
    await delay()

    return MONTHLY_REVENUE
}

export const getActivities = async () => {
    await delay()

    return ACTIVITIES
}

export const getInvoices = async () => {
    await delay()

    return INVOICES
}

export const getStatuses = async () => {
    await delay()

    return STATUSES
}

export const getCorporations = async () => {
    await delay()

    return CORPORATIONS
}

export const getUsers = async () => {
    await delay()

    return USERS
}

export const getOrders = async () => {
    await delay()

    return ORDERS
}

export const getUserDevices = async () => {
    await delay()

    return USER_DEVICES
}
