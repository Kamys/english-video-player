import React, { FC } from 'react'
import { CloseButton, ToggleButton } from 'react-bootstrap'
import { useStore } from 'effector-react'
import { $settings } from '../store/settrings'

interface Props {
    title: string
    value: boolean
    onChange: (value: boolean) => void
}

const {
    onToggleDisplaySubtitles,
    onDisplayEnSubtitlesOnlyOnPause,
    onDisplayRusSubtitlesOnlyOnPause,
    onDisplayEnSubtitles,
    onDisplayRusSubtitles,
} = $settings.action

const CheckBox: React.FC<Props> = ({ onChange, title, value }) => {
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
                    title='Показывать ли субтитры'
                    value={settings.isDisplaySubtitles}
                    onChange={onToggleDisplaySubtitles}
                />
                <CheckBox
                    title='Показывать En субтитры'
                    value={settings.isDisplayEnSubtitles}
                    onChange={onDisplayEnSubtitles}
                />
                <CheckBox
                    title='Показывать Rus субтитры'
                    value={settings.isDisplayRusSubtitles}
                    onChange={onDisplayRusSubtitles}
                />
                <CheckBox
                    title='Показывать Rus субтитры только на паузе'
                    value={settings.isDisplayRusSubtitlesOnlyOnPause}
                    onChange={onDisplayRusSubtitlesOnlyOnPause}
                />
                <CheckBox
                    title='Показывать En субтитры только на паузе'
                    value={settings.isDisplayEnSubtitlesOnlyOnPause}
                    onChange={onDisplayEnSubtitlesOnlyOnPause}
                />
            </div>
        </div>
    )
}