import React, { useCallback } from 'react'
import { Form } from 'react-bootstrap'

interface Props {
    label: string
    accept: string
    onSelect: (file: File) => void
}

export const SelectFile: React.FC<Props> = ({ label, accept, onSelect }) => {
    const handleChange = useCallback((e) => {
        onSelect(e.currentTarget.files[0])
    }, [])

    return (
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control accept={accept} onChange={handleChange} type="file" />
        </Form.Group>
    )
}