import { createEvent, createStore, forward } from 'effector';
export const createSimpleStore = (defaultValue) => {
    const event = createEvent();
    const store = createStore(defaultValue);
    forward({ from: event, to: store });
    return [event, store];
};
//# sourceMappingURL=utils.js.map