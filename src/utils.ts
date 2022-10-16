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