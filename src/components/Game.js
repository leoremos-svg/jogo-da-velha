import React, { useState } from 'react';
import Board from './Board';

function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null), lastMove: null }]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove].squares;
    const lastMoveIndex = history[currentMove].lastMove;

    function handlePlay(nextSquares, moveIndex) {
        const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, lastMove: moveIndex }];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(move) {
        setCurrentMove(move);
    }

    function resetGame() {
        setHistory([{ squares: Array(9).fill(null), lastMove: null }]);
        setCurrentMove(0);
    }

    const moves = history.map((step, move) => {
        let description;
        if (move > 0) {
            const row = Math.floor(step.lastMove / 3) + 1;
            const col = (step.lastMove % 3) + 1;
            description = `Ir para jogada #${move} (${row},${col})`;
        } else {
            description = "Ir para o início do jogo";
        }
        
        const isCurrent = move === currentMove;
        
        return (
            <li key={move}>
                <button 
                    onClick={() => jumpTo(move)}
                    className={isCurrent ? 'current' : ''}
                >
                    {description} {isCurrent ? '(atual)' : ''}
                </button>
            </li>
        );
    });

    return (
        <div className="game">
            <h1 className="game-title">Jogo da Velha</h1>
            <div className="game-board">
                <Board 
                    xIsNext={xIsNext} 
                    squares={currentSquares} 
                    onPlay={handlePlay}
                    lastMoveIndex={lastMoveIndex}
                />
            </div>
            <div className="controls">
                <button onClick={resetGame}>Reiniciar Jogo</button>
            </div>
            <div className="game-info">
                <h3>Histórico de Jogadas:</h3>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Game;

