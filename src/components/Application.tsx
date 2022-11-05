import React from 'react'
import { Container } from 'react-bootstrap'
import { PageSelectVideo } from '../pages/PageSelectVideo'
import { Routes, Route } from 'react-router-dom'
import { PageVideo } from '../pages/PageVideo'
import { ROUTS } from '../utils'

export const Application = () => {
    return (
        <Container className='pt-3'>
            <Routes>
                <Route path={ROUTS.SELECT_VIDEO} element={<PageSelectVideo />} />
                <Route path={ROUTS.VIDEO} element={<PageVideo />} />
                <Route path='/other' element={<div>Other</div>} />
            </Routes>
        </Container>
    )
}