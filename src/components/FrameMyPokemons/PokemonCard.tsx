import './style.scss';
import { useState } from "react";
import ModalPokemon from '@comps/ModalPokemon/ModalPokemon';
import {TypePokemon} from '@mt/TypePokemon';

import svgSetting from '@asset/setting.svg?raw';
import {roundFormatNumber} from '@utils/formatNumber';

const PokemonsCard = ({id, name, species, weight, totalEarned, moneySec, age, avatar}:TypePokemon) => {

    const [isOpenModal, updateStateModal] = useState(false);

    return <>
        <div className="pokemon-card" onClick={() => updateStateModal(true)}>
            <div className="pokemon-card__name">{name.length === 0 ? species : name}</div>

            <button className="pokemon-card__setting" dangerouslySetInnerHTML={{ __html: svgSetting }} />

            <picture className="pokemon-card__avatar">
                <img src={avatar} alt="" />
            </picture>

            <div className="pokemon-card__weight">{roundFormatNumber(weight)} кг</div>

            <div className="pokemon-card__moneysec">{moneySec}</div>
        
        </div>

        { isOpenModal && <ModalPokemon {...{id, name, species, weight, totalEarned, moneySec, age, avatar}} closeModal={() => updateStateModal(false)} /> }
    </>
}

export default PokemonsCard;