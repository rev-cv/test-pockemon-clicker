import './style.scss';
import svgStar from '@asset/star.svg?raw';
import { useRegisterMutation, useLoginMutation } from '@utils/redux.api';
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {
    const isRegister = window.location.pathname === "/register";
    const [register, { isLoading: isRegisterLoading }] = useRegisterMutation(); 
    const [login, { isLoading: isLoginLoading }] = useLoginMutation(); 
    const navigate = useNavigate();

    const handleSubmit = async (credentials: { login: string; password: string }) => {
        try {
            const mutation = isRegister ? register : login;
            const data = await mutation(credentials).unwrap();
            document.cookie = `auth_token=${data.auth_token}; max-age=3600`;
            document.cookie = `refresh_token=${data.refresh_token}; max-age=72000`;
            localStorage.setItem(
                'auth_token_expiry',
                new Date(Date.now() + 3600 * 1000).toISOString()
            );
            navigate('/');
        } catch (error) {
            console.error(`${isRegister ? 'Registration' : 'Login'} failed`, error);
        }
    };

    const isSubmitting = isRegister ? isRegisterLoading : isLoginLoading;

    return (
        <div className="frame-register">
            <div className="frame-register__header">
                <picture className="frame-register__header-p1">
                    <img src="/title-part1.png" alt="title" />
                </picture>
                <picture className="frame-register__header-p2">
                    <img src="/title-part2.png" alt="title" />
                </picture>
            </div>

            <form
                className="frame-register__window"
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleSubmit({
                        login: formData.get('login') as string,
                        password: formData.get('password') as string,
                    });
                }}
            >
                <a className={`frame-register__tab-1${isRegister ? " active" : ""}`} href="/register">
                    Sign up
                </a>
                <a className={`frame-register__tab-2${!isRegister ? " active" : ""}`} href="/login">
                    Sign in
                </a>

                <label htmlFor="login">
                    <div dangerouslySetInnerHTML={{ __html: svgStar }}></div>
                    <span>Login</span>
                </label>
                <input type="text" id="login" name="login" placeholder="Input login" />

                <label htmlFor="password">
                    <div dangerouslySetInnerHTML={{ __html: svgStar }}></div>
                    <span>Password</span>
                </label>
                <input type="text" id="password" name="password" placeholder="Input password" />

                {isRegister && (
                    <>
                        <label htmlFor="repassword">
                            <div dangerouslySetInnerHTML={{ __html: svgStar }}></div>
                            <span>Password confirmation</span>
                        </label>
                        <input
                            type="text"
                            id="repassword"
                            name="repassword"
                            placeholder="Input password again"
                        />
                    </>
                )}

                <button className="frame-register__submit" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'wait...' : isRegister ? 'Register' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default FormLogin;