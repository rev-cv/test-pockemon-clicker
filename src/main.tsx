import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { store } from '@utils/redux.store';
import { Provider } from 'react-redux';

import AppPage from './components/PageApp/AppPage';
import FormLogin from '@comps/WFormLogin/WFormLogin';

import './reset.css';
import './color.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<AppPage />} />
                    <Route path="/login" element={<FormLogin />} />
                    <Route path="/register" element={<FormLogin />} />
                </Routes>
            </Router>
        </Provider>
    </StrictMode>,
)
