import './style.scss';
import { useState, useEffect } from "react";
import svgClose from '@asset/close.svg?raw';
import {TypePokemon} from '@comps/FrameMyPokemons/type.pokemon';
import {roundFormatNumber, formatNumber} from '@utils/formatNumber';

type TypeCloseModal = {
    closeModal: () => void
}

const ModalPokemon = ({id, name, species, weight, totalEarned, moneySec, age, avatar, closeModal}:TypePokemon & TypeCloseModal) => {

    const [fruits, updateFruits] = useState([
        {title: "Ягода 1 уровня", descr: "Накорми ей покемона для увеличения веса на 0.1 кг", img: "/fruit1.png"},
        {title: "Ягода 1 уровня", descr: "Накорми ей покемона для увеличения веса на 0.1 кг", img: "/fruit1.png"},
        {title: "Ягода 1 уровня", descr: "Накорми ей покемона для увеличения веса на 0.1 кг", img: "/fruit1.png"},
        {title: "Ягода 1 уровня", descr: "Накорми ей покемона для увеличения веса на 0.1 кг", img: "/fruit1.png"},
        {title: "Ягода 1 уровня", descr: "Накорми ей покемона для увеличения веса на 0.1 кг", img: "/fruit1.png"},
        {title: "Ягода 1 уровня", descr: "Накорми ей покемона для увеличения веса на 0.1 кг", img: "/fruit1.png"},
        {title: "Ягода 1 уровня", descr: "Накорми ей покемона для увеличения веса на 0.1 кг", img: "/fruit1.png"},
    ]);
    const [openTab, setOpenTab] = useState<1|2>(1);
    const [isNotView, setStatusView] = useState(true);

    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        setInputValue(name);
      }, [name]);

    useEffect(() => {
		// блокировка прокрутки основного экрана
        const cwa = document.body.clientWidth;
        document.body.style.overflow = "hidden";
        const cwl = document.body.clientWidth;
        if ( cwa < cwl ) {
            document.body.style.paddingRight = cwl - cwa + "px";
        };

        setTimeout(() => setStatusView(false), 50)

        return () => {
            // разблокировка 
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }
	}, []);

    const closeThisModal = () => {
        setStatusView(true);
        setTimeout(() => closeModal(), 300)
    }

    return <div className={`modal-poke${isNotView ? " hide" : ""}`} onClick={closeThisModal}>
        <div className="modal-poke__window" onClick={e => e.stopPropagation()}>
            <div className="modal-poke__title">Управление покемоном {name.length === 0 ? species : `"${name}" (${species})`}</div>

            <button className="modal-poke__close-1" dangerouslySetInnerHTML={{ __html: svgClose }} onClick={closeThisModal}></button>
            <button className="modal-poke__close-2" onClick={closeThisModal}>Закрыть</button>

            <button className={`modal-poke__tab-1${ openTab === 1 ? " active" : ""}`} onClick={() => setOpenTab(1)}>Накормить</button>
            <button className={`modal-poke__tab-2${ openTab === 2 ? " active" : ""}`} onClick={() => setOpenTab(2)}>Статистика</button>

            <div className="modal-poke__content">

                {
                    openTab === 1 && fruits.map( (elem, index) => (
                        <div className="modal-poke__card" key={`modal-poke-card-fruit-${index}`}>
                            <div className="modal-poke__card-title">{elem.title}</div>
                            <div className="modal-poke__card-descr">{elem.descr}</div>
                            <picture className="modal-poke__card-img" title={elem.title}>
                                <img src={elem.img} alt={elem.title} />
                            </picture>
                            <button className="modal-poke__card-btn">Накормить</button>
                        </div>
                    ))
                }

                {
                    openTab === 2 && <div className='modal-poke__about'>
                        <picture className='modal-poke__about-avatar'><img src={avatar} alt="" /></picture>
                        <div className="modal-poke__about-species"><span>{species}</span></div>
                        <div className="modal-poke__about-weight"><span>{roundFormatNumber(weight)} кг</span></div>
                        <div className="modal-poke__about-summoney"><span>{formatNumber(totalEarned)}</span></div>
                        <div className="modal-poke__about-moneysec"><span>{moneySec}</span></div>
                        <div className="modal-poke__about-age"><span>{age}</span></div>
                        <button className='modal-poke__about-delete'>Удалить покемона</button>
                        <button className='modal-poke__about-newname'>Сохранить</button>
                        <input 
                            type="text" 
                            className='modal-poke__about-newname-text' 
                            placeholder='Псевдоним покемона'
                            value={inputValue}
                            onChange={event => setInputValue(event.target.value)}
                        />
                    </div>
                }

            </div>
        </div>
    </div>
}

export default ModalPokemon;

