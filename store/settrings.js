import { createEvent, createStore } from 'effector';
const onToggleShow = createEvent();
const onToggleSubtitleState = createEvent();
const isShow = createStore(false)
    .on(onToggleShow, isShow => !isShow);
var SubtitleState;
(function (SubtitleState) {
    SubtitleState["Never"] = "Never";
    SubtitleState["Pause"] = "Pause";
    SubtitleState["Always"] = "Always";
})(SubtitleState || (SubtitleState = {}));
const getNextSubtitleState = (current) => {
    let values = Object.values(SubtitleState);
    const nextIndex = values.indexOf(current);
    if (nextIndex > )
        return;
};
const settings = createStore({
    foreign: SubtitleState.Pause,
    native: SubtitleState.Pause,
})
    .on(onToggleSubtitleState, (settings, value) => ({
    ...settings,
    [value]: settings[value]
}));
export const $settings = {
    store: {
        isShow,
        settings,
    },
    action: {
        onToggleShow,
        onToggleSubtitleState,
    },
};
//# sourceMappingURL=settrings.js.map