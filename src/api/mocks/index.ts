import {faker} from "@faker-js/faker";

export const COUNTERS = {
    revenue: {
        count: 216_000,
        format: 'currency',
        trend: 341
    },
    invoices: {
        count: 2_221,
        format: 'number',
        trend: 121
    },
    clients: {
        count: 1_423,
        format: 'number',
        trend: 91
    },
    loyalty: {
        count: 78,
        format: 'percent',
        trend: -1
    }
}

export const MONTHLY_REVENUE = [{
    total: 15_000,
    details: [{
        timestamp: 1709251200,
        value: 13_000
    }, {
        timestamp: 1711929600,
        value: 9_000
    }, {
        timestamp: 1714521600,
        value: 2_000
    }, {
        timestamp: 1717200000,
        value: 15_000
    }, {
        timestamp: 1719792000,
        value: 10_000
    }, {
        timestamp: 1722470400,
        value: 12_000
    }, {
        timestamp: 1725148800,
        value: 8_000
    }, {
        timestamp: 1727740800,
        value: 7_000
    }, {
        timestamp: 1730419200,
        value: 10_000
    }]
}]

export const USERS = [
    {
        id: 1,
        firstName: 'Francisco',
        lastName: 'Gibbs',
        isReminder: false,
        avatar: faker.image.avatar()
    },
    {
        id: 2,
        firstName: 'Reminder',
        lastName: 'Reminder',
        isReminder: true,
        avatar: faker.image.avatar()
    }
]

export const CORPORATIONS = [
    {
        id: 40,
        name: 'Chester Corp'
    },
    {
        id: 52,
        name: 'Bayview LLC'
    },
    {
        id: 99,
        name: 'Clearpoint Corp'
    },
    {
        id: 102,
        name: 'Sunset Inc'
    }
]

export const ACTIVITIES = [
    {
        id: 1,
        "type": "created",
        "subject": "Invoice",
        "actionId": "PQ-4896LP",
        "actor": USERS[0].id,
        date: faker.date.recent()
    },
    {
        id: 2,
        "type": "reminder sent",
        "subject": "Invoice",
        "actionId": "JL-5849PO",
        "actor": CORPORATIONS[0].id,
        date: faker.date.recent()
    },
    {
        id: 3,
        "type": "payment received",
        "subject": "Invoice",
        "actionId": "CT-3058ER",
        "actor": CORPORATIONS[1].id,
        date: faker.date.recent()
    },
    {
        id: 4,
        "type": "closed",
        "subject": "Invoice",
        "actionId": "RT-2466TY",
        "actor": CORPORATIONS[2].id,
        date: faker.date.recent()
    },
    {
        id: 5,
        "type": "overdue",
        "subject": "Invoice",
        "actionId": "IU-3058PL",
        "actor": CORPORATIONS[3].id,
        date: faker.date.recent()
    },
    {
        id: 6,
        "type": "created",
        "subject": "Invoice",
        "actionId": "PQ-9416LP",
        "actor": USERS[1].id,
        date: faker.date.recent()
    }
]

export const STATUSES = [
    {
        id: faker.string.uuid(),
        type: 'paid'
    },
    {
        id: faker.string.uuid(),
        type: 'overdue'
    },
    {
        id: faker.string.uuid(),
        type: 'pending'
    }
]

export const INVOICES = new Array(10).fill(null).map(() => ({
    id: faker.string.uuid(),
    invoiceId: faker.airline.airplane().iataTypeCode,
    createdAt: faker.date.recent(),
    client: faker.helpers.arrayElement(CORPORATIONS),
    amount: faker.commerce.price({ min: 1000, max: 20000 }),
    status: faker.helpers.arrayElement(STATUSES)
}))


export const ORDERS = new Array(4).fill(null).map(() => ({
    label: faker.commerce.productName(),
    data: new Array(20).fill(null).map(() => faker.number.int({ min: 0, max: 1000 })),
    backgroundColor: faker.color.rgb({ includeAlpha: true }),
}))

export const devices = ['Laptop', 'Desktop', 'Mobile']

const deviceColors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
]

export const USER_DEVICES = {
    label: 'Entries',
    data: new Array(devices.length).fill(null).map(() => faker.number.int({ min: 100, max: 1000 })),
    backgroundColor: deviceColors
}

