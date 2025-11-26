import React from 'react';
import Square from './Square';
import { calculateWinner } from '../utils/gameLogic';

function Board({ xIsNext, squares, onPlay, lastMoveIndex }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        onPlay(nextSquares, i);
    }

    const winnerInfo = calculateWinner(squares);
    const winner = winnerInfo ? winnerInfo.winner : null;
    const isDraw = !winner && squares.every(square => square !== null);
    
    let status;
    let statusClass = "status";
    
    if (winner) {
        status = "Vencedor: " + winner;
        statusClass += " winner";
    } else if (isDraw) {
        status = "Empate!";
        statusClass += " draw";
    } else {
        status = "Próximo jogador: " + (xIsNext ? "X" : "O");
    }

    const renderSquare = (i) => {
        const isWinnerSquare = winnerInfo && winnerInfo.line.includes(i);
        const isLastMove = lastMoveIndex === i;
        
        return (
            <Square 
                key={i}
                value={squares[i]} 
                onSquareClick={() => handleClick(i)}
                isWinner={isWinnerSquare}
                lastMove={isLastMove}
            />
        );
    };

    return (
        <div className="board">
            <div className={statusClass}>{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

export default Board;