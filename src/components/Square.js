
import React from 'react';

function Square({ value, onSquareClick, isWinner, lastMove }) {
    const className = `square ${value ? value.toLowerCase() : ''} ${isWinner ? 'winner' : ''} ${lastMove ? 'last-move' : ''}`;
    
    return (
        <button className={className} onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default Square;