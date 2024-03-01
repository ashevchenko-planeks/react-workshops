import {CORPORATIONS} from "../../../api/mocks";

export const getActivityText = (type: string, actionId: string, actor?: typeof CORPORATIONS[0]) => {
    if (type === 'created') {
        return <span>created invoice <b>{actionId}</b></span>
    }

    if (type === 'reminder sent') {
        return <span><b>Remainder</b> was sent to <b>{actor?.name}</b></span>
    }

    if (type === 'payment received') {
        return <span><b>{actionId}</b> payment received from <b>{actor?.name}</b></span>
    }

    if (type === 'closed') {
        return <span><b>{actor?.name}</b> closed invoice <b>{actionId}</b></span>
    }

    if (type === 'overdue') {
        return <span><b>{actor?.name}</b> overdue invoice <b>{actionId}</b></span>
    }
}
