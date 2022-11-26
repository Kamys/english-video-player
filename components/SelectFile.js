import React, { useCallback } from 'react';
import { Form } from 'react-bootstrap';
export const SelectFile = ({ label, accept, onSelect }) => {
    const handleChange = useCallback((e) => {
        onSelect(URL.createObjectURL(e.currentTarget.files[0]));
    }, []);
    return (React.createElement(Form.Group, { controlId: "formFile", className: "mb-3" },
        React.createElement(Form.Label, null, label),
        React.createElement(Form.Control, { accept: accept, onChange: handleChange, type: "file" })));
};
//# sourceMappingURL=SelectFile.js.map