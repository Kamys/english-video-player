import React from 'react';
import { Container } from 'react-bootstrap';
import { PageSelectVideo } from '../pages/PageSelectVideo';
import { Routes, Route } from 'react-router-dom';
import { PageVideo } from '../pages/PageVideo';
import { ROUTS } from '../utils';
export const Application = () => {
    return (React.createElement(Container, { className: 'pt-3' },
        React.createElement(Routes, null,
            React.createElement(Route, { path: ROUTS.SELECT_VIDEO, element: React.createElement(PageSelectVideo, null) }),
            React.createElement(Route, { path: ROUTS.VIDEO, element: React.createElement(PageVideo, null) }),
            React.createElement(Route, { path: '/other', element: React.createElement("div", null, "Other") }))));
};
//# sourceMappingURL=Application.js.map