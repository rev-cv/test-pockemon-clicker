import './style.scss';
import { useState, useRef } from "react";
import svgClose from '@asset/close.svg?raw';

const SearchPanel = () => {

    const [pieces, updatePieces] = useState([
        {text: "Ягоды"},
        {text: "Покеболлы"},
    ])
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            updatePieces([...pieces, { text: inputValue.trim() }]);
            setInputValue('');
        }
    };

    return <div className="search-panel" onClick={() => inputRef.current ? inputRef.current.focus() : undefined }>
        {
            pieces.map((elem, index) => (
                <div className="search-panel__piece" key={`search-panel-tag-${index}`} title={elem.text}>
                    <span>{elem.text}</span>
                    <button
                        dangerouslySetInnerHTML={{ __html: svgClose }} 
                        onClick={() => updatePieces([...pieces.filter((_, i) => i != index)])}
                        >
                    </button>
                </div>
            ))
        }

        <input 
            className='search-panel__newpiece' 
            ref={inputRef}
            type="text" 
            value={inputValue} 
            onChange={event => setInputValue(event.target.value)} 
            onKeyDown={handleKeyDown}
            style={{ width: `calc(${inputValue.length}ch + 1em)` }}
        />
    </div>
}

export default SearchPanel;