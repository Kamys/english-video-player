import React from 'react'
import { Container } from 'react-bootstrap'
import { PageSelectVideo } from '../pages/PageSelectVideo'
import { Routes, Route } from 'react-router-dom'
import { PageVideo } from '../pages/PageVideo'

export const Application = () => {
    return (
        <Container className='pt-3'>
            <Routes>
                <Route path='/home' element={<PageSelectVideo />} />
                <Route path='/video' element={<PageVideo />} />
                <Route path='/other' element={<div>Other</div>} />
            </Routes>
        </Container>
    )
}