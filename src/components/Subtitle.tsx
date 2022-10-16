import React, {FC, MouseEvent, useCallback, useState} from "react";

interface Props {
    text: string
    onTranslate(word: string)
}

export const Subtitle: FC<Props> = ({text, onTranslate}) => {
    const [activeWord, setActiveWord] = useState<string>()
    const [isActiveAll, setActiveAll] = useState(false)

    const handleClick = useCallback((data) => (e) => {
        console.log("You click on: ", data)
        e.stopPropagation()
        e.preventDefault()
        onTranslate(data)
    }, [])

    const handleTranslateAll = useCallback((event: MouseEvent<HTMLDivElement>) => {
        onTranslate(text)
    }, [text])

    const words = text.split(" ").map((word, index) => {
        const key = word + index;
        return (
            <>
                <span
                    className={key == activeWord ? "active" : ""}
                    onMouseEnter={(e) => {
                        setActiveWord(key)
                        setActiveAll(false)
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                    onMouseMove={(e) => e.stopPropagation()}
                    onMouseOut={() => setActiveWord("")}
                    onClick={handleClick(word)} key={key}
                >
                {word}
                </span>
                {" "}
            </>
        )
    })
    return (
        <div
            onClick={handleTranslateAll}
            className={"subtitle " + (isActiveAll ? "active" : "")}
            onMouseMove={() => setActiveAll(true)}
            onMouseOut={() => setActiveAll(false)}
            key={text}
        >
            {words}
        </div>
    )
}