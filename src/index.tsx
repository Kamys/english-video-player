import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Application } from './components/Application'

const root = document.getElementById('root')

createRoot(root).render(
    <BrowserRouter>
        <Application />
    </BrowserRouter>,
)
