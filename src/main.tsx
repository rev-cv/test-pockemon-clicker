import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppPage from './components/PageApp/AppPage';
// import LoginPage from './components/PageLogin/LoginPage';
// import RegisterPage from './components/PageRegister/RegisterPage';
import FormLogin from '@comps/WFormLogin/WFormLogin';

import './reset.css';
import './color.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<AppPage />} />
                <Route path="/login" element={<FormLogin />} />
                <Route path="/register" element={<FormLogin />} />
            </Routes>
        </Router>
    </StrictMode>,
)
