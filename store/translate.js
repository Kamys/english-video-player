import { combine, createEffect, createStore } from 'effector';
import translate from 'translate';
const onTranslate = createEffect(async (text) => {
    if (!text)
        return null;
    return await translate(text, 'ru');
});
const textForTranslate = createStore(null)
    .on(onTranslate, (_, value) => value);
const translateResult = createStore(null)
    .on(onTranslate.done, (_, params) => params.result);
const store = combine({ textForTranslate, translateResult });
export const $translate = {
    action: {
        onTranslate,
    },
    store,
};
//# sourceMappingURL=translate.js.map