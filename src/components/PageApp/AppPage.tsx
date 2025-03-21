import './style.scss';
import Header from '@comps/FrameHeader/Header';
import Inventory from '@comps/FrameInventory/Inventory';


const AppPage = () => {
    return <div className="frame-app">
        
        <div className="frame-app__header"><Header /></div>
        <div className="frame-app__left"><Inventory /></div>
        <div className="frame-app__center">
            <div className="frame-app__center-elem">elem 1</div>
            <div className="frame-app__center-elem">elem 2</div>
            <div className="frame-app__center-elem">elem 3</div>
        </div>
        <div className="frame-app__right">right</div>
    </div>
}

export default AppPage;