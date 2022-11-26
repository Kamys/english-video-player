import React, { FC } from 'react'
import { CloseButton, ToggleButton } from 'react-bootstrap'
import { useStore } from 'effector-react'
import { $settings } from '../store/settrings'

interface Props {
    title: string
    value: boolean
    onChange: (value: boolean) => void
}

export const Settings: FC = () => {
    const isShow = useStore($settings.store.isShow)
    const settings = useStore($settings.store.settings)

    if (!isShow) {
        return null
    }

    return (
        <div className='settings'>
            <CloseButton className='button-close' onClick={() => $settings.action.onToggleShow()} />
            <h1 className='mb-3 text-center'>Настройки</h1>
            <div className='d-flex flex-column w-50'>

            </div>
        </div>
    )
}