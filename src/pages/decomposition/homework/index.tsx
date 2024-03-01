import {useEffect, useRef, useState} from "react";

const DEFAULT_LIST = [
    { id: '1', text: 'Do exercises', isCompleted: false },
    { id: '2', text: 'Drink coffee', isCompleted: false },
    { id: '3', text: 'Do decomposition of components', isCompleted: false }
]

const DecompositionHomeWork = () => {
    const draft = useRef([])
    const [title, setTitle] = useState('')
    const [list, setList] = useState([])
    const [greeting, setGreeting] = useState('')
    const [mood, setMood] = useState('Energetic')

    const toggle = (taskId) => {
        const newList = list.map(({ id, text, isCompleted }) => {
            if (id === taskId) {
                return { id, text, isCompleted: !isCompleted }
            }

            return { id, text, isCompleted }
        })

        setList(newList)
    }

    const onChange = (event) => {
        setTitle(event.target.value)
    }

    const onCreate = () => {
        setList([...list, { id: (list.length + 1).toString(), text: title, isCompleted: false }])
        setTitle('')
    }

    const onFilter = (event) => {
        if (event.target.checked) {
            draft.current = list
            setList(list.filter((l) => !l.isCompleted))
        } else {
            setList(draft.current)
        }
    }

    const onGreeting = () => {
        setGreeting((Math.random() + 1).toString(36).substring(7))
    }

    const onMood = (event) => {
        setMood(event.target.value)
    }

    useEffect(() => {
        const fetchSettingForAbsolutelyAnotherModule = async () => {
            await new Promise((resolve) => {
                setTimeout(() => resolve(true), 3)
            })
        }

        fetchSettingForAbsolutelyAnotherModule().then(() => {
            setList(DEFAULT_LIST)
            setGreeting((Math.random() + 1).toString(36).substring(7))
        })
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', gap: '16px' }}>
                <div>
                    <label>Create task</label>
                    <input type="text" value={title} onChange={onChange} />
                    <button onClick={onCreate}>Create</button>
                </div>
                <div>
                    <label style={{ marginRight: '4px' }}>Show in progress tasks</label>
                    <input type="checkbox" onChange={onFilter} />
                </div>
                <div style={{ border: '1px solid', padding: '10px' }}>
                    <button onClick={onGreeting}>Change greeting word</button>
                    <p>Greeting word is: {greeting}</p>
                </div>
            </div>
            <ul>
                {list.map(({ id, text, isCompleted }) => {
                    return (
                        <li>
                            <input type="checkbox" checked={isCompleted} onChange={() => toggle(id)} />
                            {text}
                        </li>
                    )
                })}
            </ul>
            <hr style={{ margin: '10px 0' }}/>
            <div>
                <label>My mood today is: {mood}</label>
                <ul>
                    <li>
                        <input type="radio" checked={mood === 'Joyful'} name="mood" value="Joyful" onChange={onMood} />
                        Joyful
                    </li>
                    <li>
                        <input type="radio" checked={mood === 'Melancholic'} name="mood" value="Melancholic" onChange={onMood} />
                        Melancholic
                    </li>
                    <li>
                        <input type="radio" checked={mood === 'Energetic'} name="mood" value="Energetic" onChange={onMood} />
                        Energetic
                    </li>
                    <li>
                        <input type="radio" checked={mood === 'Anxious'} name="mood" value="Anxious" onChange={onMood} />
                        Anxious
                    </li>
                    <li>
                        <input type="radio" checked={mood === 'Serene'} name="mood" value="Serene" onChange={onMood} />
                        Serene
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DecompositionHomeWork
