import React, { FC, useState } from 'react'
import { CloseButton, ToggleButton } from 'react-bootstrap'
import { useStore } from 'effector-react'
import { $settings } from '../store/settrings'

interface Props {
    title: string
    value: boolean
    onChange: (value: boolean) => void
}

const CheckBox = ({ onChange, title, value }) => {
    return (
        <ToggleButton
            id={title}
            className='mb-2'
            type='checkbox'
            variant='outline-primary'
            checked={value}
            value='1'
            onChange={(e) => {
                onChange(e.currentTarget.checked)
            }}
        >
            {title}: {value ? 'on' : 'off'}
        </ToggleButton>
    )
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
                <CheckBox
                    title='Subtitles'
                    value={settings.isDisplaySubtitles}
                    onChange={() => {}}
                />
                <CheckBox
                    title='Rus subtitles only when the video is paused'
                    value={settings.isDisplayRusSubtitlesOnlyOnPause}
                    onChange={() => { }}
                />
                <CheckBox
                    title='En subtitles only when the video is paused'
                    value={settings.isDisplayEnSubtitlesOnlyOnPause}
                    onChange={() => { }}
                />
            </div>
        </div>
    )
}