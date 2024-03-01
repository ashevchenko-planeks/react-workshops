import {FC, PropsWithChildren, useState} from "react";
import clsx from "clsx";

const PersonalDetails = ({ onSubmit, settings }) => null
const JobPosition = ({ onSubmit }) => null

interface AddressSearchProps {
    onSubmit: (address: unknown) => void
}

const AddressSearch: FC<AddressSearchProps> = ({ onSubmit }) => {
    const [value, setValue] = useState('')

    return (
        <div>
            {/* SearchInput with clear, debounce, loading logic */}
            {/* So here we can have more props, like: onClear */}
            <input value={value} placeholder="Location" type="text" onChange={(event) => setValue(event.target.value)}/>
            <div>
                <p>Suggestions</p>
                <ul>
                    <li onClick={onSubmit}>Address 1</li>
                    <li onClick={onSubmit}>Address 2</li>
                    <li onClick={onSubmit}>Address 3</li>
                </ul>
            </div>
        </div>
    )
}

interface StepperProps extends PropsWithChildren {
    step: number
    steps: { title: string; }[]
}

const Stepper: FC<StepperProps> = ({step, steps}) => {
    return steps.map(({title}, index) => {
        return <div>
            <h1 className={clsx({
                active: index === step,
                completed: index > step,
                uncompleted: index < step
            })}>{title}</h1>
        </div>
    })
}

const STEPS: { title: string; }[] = [
    {
        title: 'Job location'
    },
    {
        title: 'Job position'
    },
    {
        title: 'Personal details'
    }
]

enum Steps {
    JobLocation,
    JobPosition,
    PersonalDetails
}

const ApplyJobFormContainer = () => {
    // Can be useReducer with actions
    const [applyFormSettings, setApplyFormSettings] = useState({
        address: {
            street: '',
            city: ''
        },
        roles: []
    })
    const [activeStep, setActiveStep] = useState<Steps>(Steps.JobLocation)

    const onStepSubmit = (value) => {
        switch (activeStep) {
            case Steps.JobLocation:
                setApplyFormSettings((prevState) => ({
                    ...prevState,
                    ...{},
                }))
                break;
            case Steps.JobPosition:
                setApplyFormSettings((prevState) => ({
                    ...prevState,
                    ...{},
                }))
                break;
            case Steps.PersonalDetails:
                setApplyFormSettings((prevState) => ({
                    ...prevState,
                    ...{},
                }))
                break;
            default:
                throw new Error('Unsupported step')
        }

        setActiveStep(prevState => prevState + 1)
    }


    return (
        <div>
            <Stepper step={activeStep} steps={STEPS}/>
            {activeStep === Steps.JobLocation && <AddressSearch onSubmit={onStepSubmit} />}
            {activeStep === Steps.JobPosition && <JobPosition onSubmit={onStepSubmit} />}
            {activeStep === Steps.PersonalDetails && <PersonalDetails settings={applyFormSettings} onSubmit={onStepSubmit} />}
        </div>
    )
}

export default ApplyJobFormContainer
