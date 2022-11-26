import React from 'react';
import { CloseButton } from 'react-bootstrap';
import { useStore } from 'effector-react';
import { $settings } from '../store/settrings';
export const Settings = () => {
    const isShow = useStore($settings.store.isShow);
    const settings = useStore($settings.store.settings);
    if (!isShow) {
        return null;
    }
    return (React.createElement("div", { className: 'settings' },
        React.createElement(CloseButton, { className: 'button-close', onClick: () => $settings.action.onToggleShow() }),
        React.createElement("h1", { className: 'mb-3 text-center' }, "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438"),
        React.createElement("div", { className: 'd-flex flex-column w-50' })));
};
//# sourceMappingURL=Settings.js.map