import './style.scss';
import { useState } from "react";

const MyHunt = () => {

    const [isExpanded, setStateExpanded] = useState(false);

    return <div className={`myhunt${isExpanded ? " expanded": ""}` }>
        <div className="myhunt__title">Hunt</div>
        <div className="myhunt__arrow">
            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.00004 0.0254974L0.762207 8.26216L3.23787 10.7378L9.00004 4.9745L14.7622 10.7378L17.2379 8.26216L9.00004 0.0254974Z" fill="#365FAC"/>
            </svg>
        </div>
        <div className="myhunt__wrapper">
			<div className="myhunt__content">
                <div className="elem" style={{
                    height: 'calc(725px - 62px)'
                }}></div>
            </div>
        </div>
        <div className="myhunt__switch" onClick={() => setStateExpanded(!isExpanded)}></div>
    </div>
}

export default MyHunt;