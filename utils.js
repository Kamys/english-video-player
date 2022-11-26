import dayjs from 'dayjs';
import { $sources } from './store/sources';
import { useStore } from 'effector-react';
import { $subtitle } from './store/subtitle';
import { $video } from './store/video';
import { useMemo } from 'react';
export const toggleFullScreenForElement = (element) => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        return;
    }
    // @ts-ignore
    if (document.webkitFullscreenElement) {
        // @ts-ignore
        document.webkitExitFullscreen();
        return;
    }
    // @ts-ignore
    if (element.webkitRequestFullscreen) {
        // @ts-ignore
        element.webkitRequestFullscreen();
    }
    else {
        // @ts-ignore
        element.requestFullscreen();
    }
};
export const getSubtitle = (subtitles, currentMillisecond, diff) => {
    return subtitles.find(subtitle => {
        if (!subtitle) {
            return false;
        }
        let currentMillisecondWithDuff = currentMillisecond + diff;
        return subtitle.from <= currentMillisecondWithDuff && subtitle.to >= currentMillisecondWithDuff;
    });
};
export const toTime = (millisecond) => {
    return dayjs().startOf('day').add(millisecond, 'milliseconds').format('mm:ss');
};
export const toMinute = (millisecond) => {
    return toSecond(millisecond) / 60;
};
export const toSecond = (millisecond) => {
    return millisecond / 1000;
};
export const getNextSub = (currentTimeMilliseconds) => {
    const subtitle = $sources.store.getState().subtitle.en;
    const timeCods = subtitle.map(item => item.from);
    const sort = timeCods.filter(timeCod => timeCod > currentTimeMilliseconds).sort((a, b) => a - b);
    return sort[0];
};
export const getLastSub = (currentTimeMilliseconds) => {
    const subtitle = $sources.store.getState().subtitle.en;
    const currentSubtitle = getSubtitle(subtitle, currentTimeMilliseconds, 0);
    let currentTime = currentTimeMilliseconds;
    if (currentSubtitle != null) {
        currentTime = currentSubtitle.from - 1;
    }
    const timeCods = subtitle.map(item => item.from);
    const sort = timeCods.filter(timeCod => timeCod < currentTime).sort((a, b) => a - b).reverse();
    return sort[0];
};
export const useCurrentSubtitle = (langKey) => {
    const { subtitleDiff, subtitleIdDiff } = useStore($subtitle.store);
    const { currentMillisecond } = useStore($video.store);
    const subtitle = useStore($sources.store).subtitle[langKey];
    return useMemo(() => {
        return getSubtitle(subtitle, currentMillisecond, subtitleDiff);
    }, [currentMillisecond, subtitle, subtitleDiff, subtitleIdDiff]);
};
export const ROUTS = {
    SELECT_VIDEO: '/',
    VIDEO: '/video',
};
//# sourceMappingURL=utils.js.map