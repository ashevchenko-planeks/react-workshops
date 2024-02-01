import {useEffect, useState} from "react";
import {faker} from "@faker-js/faker";
import Dialog from "../../components/Dialog.tsx";

interface ListItem {
    id: string
    name: string
    occupation: string
    age: number
    company: string
}

interface ListItemProps extends ListItem {
    onDelete: (id: string) => void
}

const createList = () => new Array(20).fill(null).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    occupation: faker.person.jobTitle(),
    age: faker.number.int({min: 16, max: 40}),
    company: faker.company.name()
}))

const ListItem = ({id, name, occupation, company, age, onDelete}: ListItemProps) => {
    return <li className="grid grid-cols-5 border-b dark:bg-gray-800 dark:border-gray-700 px-6 py-3">
        <div>Name: {name}</div>
        <div>Occupation: {occupation}</div>
        <div>Company: {company}</div>
        <div>Age: {age}</div>
        <div>
            <button className="btn btn-primary" onClick={() => onDelete(id)}>Delete</button>
        </div>
    </li>
}

const Page = () => {
    const [list, setList] = useState<ListItem[]>([])
    const [idToRemove, setIdToRemove] = useState<string | null>(null)

    useEffect(() => {
        setList(createList())
    }, []);

    const onDelete = (id: string) => {
        setIdToRemove(id)
    }
    const onClose = () => {
        setIdToRemove(null)
    }

    const confirmDelete = () => {
        setList((list) => list.filter(({ id }) => id !== idToRemove))
        setIdToRemove(null)
    }

    return (
        <>
            <Dialog isOpen={Boolean(idToRemove)} onClose={onClose}>
                <div>
                    Are you sure you wanna delete this item?
                </div>
                <div className="mt-4 flex gap-2 justify-between">
                    <button className="btn btn-outline btn-md" onClick={onClose}>Cancel</button>
                    <button className="btn btn-outline btn-error btn-md" onClick={confirmDelete}>Delete</button>
                </div>
            </Dialog>
            <ul>
                {list.map((item) => (<ListItem key={item.id} onDelete={onDelete} {...item} />))}
            </ul>
        </>
    )
}

export default Page
