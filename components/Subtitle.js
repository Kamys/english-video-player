import React, { useCallback } from 'react';
import { Word } from './Word';
import { useCurrentSubtitle } from '../utils';
export const Subtitle = ({ onTranslate, isDisplay, langKey }) => {
    const currentText = useCurrentSubtitle(langKey)?.text;
    const handleClick = useCallback((data) => (e) => {
        e.stopPropagation();
        e.preventDefault();
        onTranslate(data
            .replaceAll('.', '')
            .replaceAll('?', '')
            .replaceAll('!', '')
            .replaceAll(',', ''));
    }, []);
    const handleTranslateAll = useCallback(() => {
        if (onTranslate) {
            onTranslate(currentText);
        }
    }, [currentText]);
    const wordComponents = currentText?.split(' ').map((word, index) => {
        const key = word + index.toString();
        return (React.createElement(Word, { key: key, word: word, onClick: handleClick(word), needBacklight: !!onTranslate }));
    });
    return (React.createElement("div", { style: { opacity: wordComponents && isDisplay ? 1 : 0 }, onClick: handleTranslateAll, className: 'subtitle', key: currentText }, wordComponents));
};
//# sourceMappingURL=Subtitle.js.map