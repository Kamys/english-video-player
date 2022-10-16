import React, {FC, MouseEventHandler, useState} from "react";

interface Props {
    word: string
    onClick: MouseEventHandler
    needBacklight: boolean

}

export const Word: FC<Props> = ({ onClick, word, needBacklight }) => {
    const [isActive, setActive] = useState(false)
    return (
        <>
                <span
                    className={needBacklight && isActive ? "active" : ""}
                    onMouseEnter={() => setActive(true)}
                    onMouseOut={() => setActive(false)}
                    onClick={onClick}
                >
                {word}
                </span>
            {" "}
        </>
    )
}