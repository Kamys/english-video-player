import React, { useState } from 'react';
export const Word = ({ onClick, word, needBacklight }) => {
    const [isActive, setActive] = useState(false);
    return (React.createElement(React.Fragment, null,
        React.createElement("span", { className: needBacklight && isActive ? 'active' : '', onMouseEnter: () => setActive(true), onMouseOut: () => setActive(false), onClick: onClick }, word),
        ' '));
};
//# sourceMappingURL=Word.js.map