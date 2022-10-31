import React, { useCallback, useState } from 'react'
import { Form } from 'react-bootstrap'
import { VideoContainer } from './VideoContainer'

interface Props {
    label: string
    onSelect: (fileSrc: string) => void
}

export const SelectFile: React.FC<Props> = ({ label, onSelect }) => {
    const handleChange = useCallback((e) => {
        onSelect(URL.createObjectURL(e.currentTarget.files[0]))
    }, [])

    return (
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control onChange={handleChange} type="file" />
        </Form.Group>
    )
}