import {useCallback, useState} from "react";
import moment from "moment";

export const toggleFullScreenForElement = (element: HTMLElement) => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        return
    }

    // @ts-ignore
    if (document.webkitFullscreenElement) {
        // @ts-ignore
        document.webkitExitFullscreen();
        return
    }

    // @ts-ignore
    if (element.webkitRequestFullscreen) {
        // @ts-ignore
        element.webkitRequestFullscreen();
    } else {
        // @ts-ignore
        element.requestFullscreen();
    }
}

const parseTime = (time: string): number => {
    return moment.duration(time).valueOf() as number
}

export const parseVtt = (text: string): any => {
    const blocks =  text.split("\n\n")
    return blocks.map(block => {
        const items = block.split("\n")
        if (items.length <= 2) {
            console.error("Failed pars:", items)
            return null
        }
        const number = items[0]
        const periodText = items[1].split(" --> ")
        const period = { start: parseTime(periodText[0]), end: parseTime(periodText[1]) }
        const text = items.slice(2).join("\n")

        return {number, period, text}
    })
}