import './style.scss';
import Header from '@comps/FrameHeader/Header';
import Inventory from '@comps/FrameInventory/Inventory';
import MyPokemons from '@comps/FrameMyPokemons/MyPokemons';
import MyGarden from '@comps/FrameGarden/Garden';
import MyHunt from '@comps/FrameHunt/Hunt';

const AppPage = () => {
    return <div className="frame-app">
        
        <div className="frame-app__header"><Header /></div>
        <div className="frame-app__left"><Inventory /></div>
        <div className="frame-app__center">
            <MyPokemons />
            <MyGarden />
            <MyHunt />
        </div>
        <div className="frame-app__right">right</div>
    </div>
}

export default AppPage;