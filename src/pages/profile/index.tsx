import Sidebar from "@/components/Sidebar.tsx";
import {useContext,  useState} from "react";
import { CurrentUserContext } from "@/context/CurrentUserContext";

const Profile = () => {
    const {user} = useContext(CurrentUserContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('viewer')


    return (
        <div className="grid grid-cols-12 min-h-screen">
            <div className="col-span-2">
                {user && <Sidebar />}
            </div>
            <div className="col-span-10">
                <div className="p-20">
                    <h1 className="text-lg text-center mb-8">Profile</h1>
                    <div className="max-w-3xl mx-auto space-y-3">
                        <div className="flex flex-col">
                            <label htmlFor="name">Name</label>
                            <input value={name} onChange={(event) => setName(event.target.value)} name="name" type="text" placeholder="Name" className="input input-bordered w-full"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input value={email} onChange={(event) => setEmail(event.target.value)} name="email" type="email" placeholder="Email" className="input input-bordered w-full"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="role">Role</label>
                            <select value={role} onChange={(event) => setRole(event.target.value)} name="role" className="select select-bordered w-full">
                                <option>admin</option>
                                <option>viewer</option>
                            </select>
                        </div>
                        <div className="flex justify-between">
                            <button className="btn btn-outline">Cancel</button>
                            <button className="btn btn-outline btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile
