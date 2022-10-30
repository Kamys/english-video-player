import React, {FC, useState} from "react";
import {CloseButton, ToggleButton} from "react-bootstrap";
import {useStore} from "effector-react";
import {$settings} from "../store/settrings";

interface Props {
}

const CheckBox = ({ onChange, title }) => {
    const [checked, setChecked] = useState(false)

    return (
        <ToggleButton
            id={title}
            className="mb-2"
            type="checkbox"
            variant="outline-primary"
            checked={checked}
            value="1"
            onChange={(e) => {
                setChecked(e.currentTarget.checked)
                onChange(e.currentTarget.checked)
            }}
        >
            {title}: {checked ? "on" : "off"}
        </ToggleButton>
    )
}

export const Settings: FC<Props> = ({}) => {
    const isShow = useStore($settings.store.isShow)

    if (!isShow) {
        return null
    }

    return (
        <div className="settings">
            <CloseButton className="button-close" onClick={() => $settings.action.onToggleShow()} />
            <h1 className='mb-3 text-center'>Настройки</h1>
            <div className="d-flex flex-column w-50">
                <CheckBox
                    title="Subtitles"
                    onChange={() => {}}
                />
                <CheckBox
                    title="Subtitles only when the video is paused"
                    onChange={() => {}}
                />
            </div>
        </div>
    )
}