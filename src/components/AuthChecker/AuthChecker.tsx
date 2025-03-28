// src/components/AuthChecker.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRefreshTokenMutation } from '@utils/redux.api';

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [refreshToken] = useRefreshTokenMutation();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const authToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('auth_token='))
            ?.split('=')[1];
        const refreshTokenCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('refresh_token='))
            ?.split('=')[1];

        if (!authToken) {
            navigate('/register');
            setTimeout(()=>{setIsChecking(false)}, 1000);
        } else {
            const authTokenExpiry = localStorage.getItem('auth_token_expiry');
            if (authTokenExpiry && new Date() > new Date(authTokenExpiry)) {
                if (refreshTokenCookie) {
                    refreshToken(0)
                        .unwrap()
                        .then((data) => {
                            document.cookie = `auth_token=${data.auth_token}; max-age=3600`;
                            document.cookie = `refresh_token=${data.refresh_token}; max-age=72000`;
                            localStorage.setItem(
                                'auth_token_expiry',
                                new Date(Date.now() + 3600 * 1000).toISOString()
                            );
                        })
                        .catch(() => {
                            navigate('/login');
                        })
                        .finally(() => {
                            setTimeout(()=>{setIsChecking(false)}, 1000);
                        });
                } else {
                    navigate('/login');
                    setTimeout(()=>{setIsChecking(false)}, 1000);
                }
            } else {
                setTimeout(()=>{setIsChecking(false)}, 1000);
            }
        }
    }, [navigate, refreshToken]);

    if (isChecking) {
        return null;
    }

    return <>{children}</>;
};

export default AuthChecker;