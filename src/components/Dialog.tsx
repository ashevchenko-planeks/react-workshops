import {FC, PropsWithChildren} from "react";

const Dialog: FC<PropsWithChildren & { isOpen: boolean; onClose: () => void }> = ({ isOpen, children, onClose }) => {
    if(!isOpen) {
        return null
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 flex items-center justify-center backdrop-blur">
            <div className="pt-4 pb-8 px-10 bg-[#1d232a] flex flex-col rounded-xl">
                <div className="ml-auto">
                    <button className="btn btn-square btn-sm" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Dialog
