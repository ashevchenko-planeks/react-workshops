import { useCallback, useState, createContext, FC, PropsWithChildren, useMemo, useContext } from 'react'
import {useDisclosure} from "../hooks/useDisclosure.ts";
import Dialog from "../components/Dialog.tsx";
import clsx from "clsx";

export interface ConfirmationDialogContentSettings {
    title?: string
    type?: 'success' | 'warning' | 'error';
    submitText?: string
    cancelText?: string
    onSubmit: () => void
    onCancel?: () => void
}

interface ConfirmationDialogContextType {
    ask: (settings: ConfirmationDialogContentSettings) => void
}

export const ConfirmationDialogContext = createContext({} as ConfirmationDialogContextType)

const typeClassMap = {
    'success': 'btn-success',
    'warning': 'btn-warning',
    'error': 'btn-error',
}

export const ConfirmationDialogProvider: FC<PropsWithChildren> = ({ children }) => {
    const [dialogSettings, setDialogSettings] = useState<Omit<ConfirmationDialogContentSettings, 'type'> & { type: 'error' | 'warning' | 'success' }>({
        onSubmit: () => {},
        type: 'error'
    })
    const { isOpen, onOpen, onClose } = useDisclosure()

    const ask = useCallback(
        ({ cancelText, submitText, type, ...rest }: ConfirmationDialogContentSettings) => {
            setDialogSettings({
                cancelText,
                submitText,
                type: type ?? 'error',
                ...rest
            })
            onOpen()
        },
        [onOpen]
    )

    const disagree = useCallback(() => {
        dialogSettings.onCancel?.()
        onClose()
    }, [dialogSettings, onClose])

    const agree = useCallback(() => {
        dialogSettings.onSubmit()
        onClose()
    }, [dialogSettings, onClose])

    const providerValue = useMemo(() => ({ ask }), [ask])

    return (
        <ConfirmationDialogContext.Provider value={providerValue}>
            {children}
            <Dialog isOpen={isOpen} onClose={disagree}>
                <div>
                    {dialogSettings.title}
                </div>
                <div>
                    <button className="btn btn-outline btn-md" onClick={disagree}>{dialogSettings.cancelText}</button>
                    <button className={clsx("btn btn-outline btn-md", typeClassMap[dialogSettings.type])} onClick={agree}>{dialogSettings.submitText}</button>
                </div>
            </Dialog>
        </ConfirmationDialogContext.Provider>
    )
}

export const useConfirmationDialog = () => {
    return useContext(ConfirmationDialogContext)
}
