import './style.scss';
import svgStar from '@asset/star.svg?raw';

const FormLogin = () => {

    const isRegister = window.location.pathname === "/register";

    return <div className="frame-register">

        <div className="frame-register__header">
            <picture className='frame-register__header-p1' >
                <img src="/title-part1.png" alt="title" />
            </picture>
            <picture className='frame-register__header-p2' >
                <img src="/title-part2.png" alt="title" />
            </picture>
        </div>

        <div className="frame-register__window">

            <a className={`frame-register__tab-1${isRegister ? " active" : ""}`} href="/register" >Sign up</a>
            <a className={`frame-register__tab-2${!isRegister ? " active" : ""}`} href="/login">Sign in</a>

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

            {
                isRegister && <>
                    <label htmlFor="repassword">
                        <div dangerouslySetInnerHTML={{ __html: svgStar }}></div>
                        <span>Password confirmation</span>
                    </label>
                    <input type="text" id="repassword" name="repassword" placeholder="Input password again" />
                </>
            }

            <button className='frame-register__submit'>{isRegister ? "Sign in" : "Sign up"}</button>
        </div>
        
    </div>
}

export default FormLogin;