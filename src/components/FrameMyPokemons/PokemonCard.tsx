import './style.scss';

export type TypePokemon = {
    id: number;
    name: string;
    species: string;
    weight: number; // грамм
    totalEarned: number;  // условные единицы
    moneySec: number; // условные единицы в секунду
    age: number; // дни
    avatar: string;
}

import svgSetting from '@asset/setting.svg?raw';
import {roundFormatNumber} from '@utils/formatNumber';

const PokemonsCard = ({id, name, species, weight, totalEarned, moneySec, age, avatar}:TypePokemon) => {

    return <div className="pokemon-card">
        <div className="pokemon-card__name">{name.length === 0 ? species : name}</div>

        <button className="pokemon-card__setting" dangerouslySetInnerHTML={{ __html: svgSetting }} />

        <picture className="pokemon-card__avatar">
            <img src={avatar} alt="" />
        </picture>

        <div className="pokemon-card__weight">{roundFormatNumber(weight)} кг</div>

        <div className="pokemon-card__moneysec">{moneySec}</div>
        
    </div>
}

export default PokemonsCard;