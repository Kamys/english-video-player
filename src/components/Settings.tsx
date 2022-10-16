import React, {FC, useState} from "react";
import {CloseButton, ToggleButton} from "react-bootstrap";

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

    return (
        <div className="settings">
            <CloseButton className="button-close" />
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