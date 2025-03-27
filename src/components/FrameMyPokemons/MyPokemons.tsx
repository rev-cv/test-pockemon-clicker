import './style.scss';
import { useState, useEffect } from "react";
import PokemonsCard from "./PokemonCard";
import { usePokemons } from '@utils/redux.hook.pokemons'

const MyPokemons = () => {

    const [isExpanded, setStateExpanded] = useState(false);
    const {pokemons, tickMakingMoney} = usePokemons();

    useEffect(() => {
        const intervalId = setInterval(tickMakingMoney, 1000); 
        return () => { clearInterval(intervalId) };
    }, []);

    return <div className={`mypoke${isExpanded ? " expanded": ""}` }>
        <div className="mypoke__title">My Pokemons</div>
        <div className="mypoke__arrow">
            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.00004 0.0254974L0.762207 8.26216L3.23787 10.7378L9.00004 4.9745L14.7622 10.7378L17.2379 8.26216L9.00004 0.0254974Z" fill="#365FAC"/>
            </svg>
        </div>
        <div className="mypoke__wrapper">
            <div className="mypoke__content">
                {
                    pokemons.map((elem, index) => <PokemonsCard {...elem} key={`pokemons-card-${index}-id-${elem.id}`} />)
                }
            </div>
        </div>
        <div className="mypoke__switch" onClick={() => setStateExpanded(!isExpanded)}></div>
    </div>
}

export default MyPokemons;