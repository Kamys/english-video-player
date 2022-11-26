import { combine, createEvent, createStore, forward } from 'effector';
import { createEffect } from 'effector/effector.umd';
import axios from 'axios';
import * as subtitleParser from '@plussub/srt-vtt-parser';
const onSetVideoSrc = createEvent();
const onLoadSubtitle = createEffect(async (params) => {
    const response = await axios.get(params.link);
    const result = subtitleParser.parse(response.data);
    return result.entries;
});
const subtitle = createStore({ en: [], ru: [] })
    .on(onLoadSubtitle.done, (store, payload) => ({ ...store, [payload.params.langKey]: payload.result }));
const videoSrc = createStore(null);
forward({ from: onSetVideoSrc, to: videoSrc });
const store = combine({ subtitle, videoSrc });
export const $sources = {
    action: {
        onLoadSubtitle,
        onSetVideoSrc
    },
    store,
};
//# sourceMappingURL=sources.js.map