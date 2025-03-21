import './style.scss';
import CurrentMoney from "@comps/WMoney/CurrentMoney"

const AppHeader = () => {
    return <div className="app-header">
        <picture className='app-header__title-p1' >
            <img src="/title-part1.png" alt="title" />
        </picture>
        <picture className='app-header__title-p2' >
            <img src="/title-part2.png" alt="title" />
        </picture>
        <div className="app-header__money-in-account">
            <CurrentMoney />
        </div>
    </div>
}

export default AppHeader;