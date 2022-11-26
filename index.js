import React from 'react';
import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Application } from './components/Application';
const root = document.getElementById('root');
createRoot(root).render(React.createElement(HashRouter, null,
    React.createElement(Application, null)));
//# sourceMappingURL=index.js.map