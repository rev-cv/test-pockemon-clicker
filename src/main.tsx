import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { store } from '@utils/redux.store';
import { Provider, useDispatch } from 'react-redux';

import AppPage from './components/PageApp/AppPage';
import FormLogin from '@comps/WFormLogin/WFormLogin';
import AuthChecker from '@comps/AuthChecker/AuthChecker';

import './reset.css';
import './color.scss';

import { loadFromIndexedDB } from '@utils/redux.middleware.indexed';

const DataLoader = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        loadFromIndexedDB(dispatch);
    }, [dispatch]);

    return <></>;
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <DataLoader />
            <Router>
                <AuthChecker>
                    <Routes>
                        <Route path="/" element={<AppPage />} />
                        <Route path="/login" element={<FormLogin />} />
                        <Route path="/register" element={<FormLogin />} />
                    </Routes>
                </AuthChecker>
            </Router>
        </Provider>
    </StrictMode>,
)
