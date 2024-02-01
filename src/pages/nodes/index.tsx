import {memo, useState} from "react";

const SecondFloorNodeOne = () => {
    return <div className="border">1</div>
}
const SecondFloorNodeTwo = memo(({ counter }: { counter: number }) => {
    return <div className="border">(2) Count is: {counter}</div>
})
const SecondFloorNodeThree = () => {
    return <div className="border">3</div>
}

const FirstFloorNodeOne = () => {
    const [counter, setCounter] = useState(0)
    return (
        <div className="text-center">
            <div className="space-y-3">
                <h2 className="text-center border">First floor first node</h2>
                <div className="grid grid-cols-3 gap-6">
                    <SecondFloorNodeOne/>
                    <SecondFloorNodeTwo counter={counter}/>
                    <SecondFloorNodeThree/>
                </div>
            </div>
            <button className='bg-blue-600 p-4 mx-auto' onClick={() => setCounter(count => count + 1)}>Increase counter</button>
        </div>
    )
}

const DummyNode = () => {
    return <div className="border border-amber-50">Some dummy node</div>
}

const FirstFloorNodeTwo = () => {
    return (
        <div className="space-y-3">
            <h2 className="text-center border">First floor node two</h2>
            <DummyNode/>
        </div>
    )
}

const Nodes = () => {
    return (
        <div className="space-y-3">
            <h2 className="text-center border">Root</h2>
            <div className="grid grid-cols-2 gap-20">
                <FirstFloorNodeOne/>
                <FirstFloorNodeTwo/>
            </div>
        </div>
    )
}

export default Nodes
