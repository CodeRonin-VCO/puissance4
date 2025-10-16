import { useState } from "react";
import styles from "./main.module.css";

export default function MainHomePage() {
    // Création de la grille 2D
    const [cells, setCells] = useState(() => {
        let puissanceGrid = [];
        for (let i = 0; i < 6; i++) {
            puissanceGrid.push(new Array(7).fill(null));
        };

        return puissanceGrid;
    });

    // Alterner les joueurs
    const [currentPlayer, setCurrentPlayer] = useState("red");
    const [winner, setWinner] = useState(null);

    function handleClick(colIndex) {
        if (winner) return;

        const newCells = JSON.parse(JSON.stringify(cells))

        for (let row = 5; row >= 0; row--) {

            if (newCells[row][colIndex] === null) {
                newCells[row][colIndex] = currentPlayer;
                setCells(newCells);

                if (checkWin(newCells, row, colIndex, currentPlayer)) {
                    setWinner(currentPlayer);

                } else {
                    setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red")
                };

                break;
            }
        }
    };

    function checkWin(cells, row, col, player) {
        const directions = [
            { dx: 0, dy: 1 },   // Horizontale (gauche-droite)
            { dx: 1, dy: 0 },   // Verticale (bas-haut)
            { dx: 1, dy: 1 },   // Diagonale descendante
            { dx: 1, dy: -1 },  // Diagonale ascendante
        ];

        for (const { dx, dy } of directions) {
            let count = 1; // On compte déjà le jeton placé

            // Vérifie dans la direction positive
            for (let i = 1; i < 4; i++) {
                const newRow = row + i * dx;
                const newCol = col + i * dy;
                if (
                    newRow >= 0 &&
                    newRow < 6 &&
                    newCol >= 0 &&
                    newCol < 7 &&
                    cells[newRow][newCol] === player
                ) {
                    count++;
                } else {
                    break;
                }
            }

            // Vérifie dans la direction négative
            for (let i = 1; i < 4; i++) {
                const newRow = row - i * dx;
                const newCol = col - i * dy;
                if (
                    newRow >= 0 &&
                    newRow < 6 &&
                    newCol >= 0 &&
                    newCol < 7 &&
                    cells[newRow][newCol] === player
                ) {
                    count++;
                } else {
                    break;
                }
            }

            // Si on a 4 jetons alignés, victoire !
            if (count >= 4) {
                return true;
            }
        }

        return false;
    }

    function resetGrid() {
        setCells(() => {
            let puissanceGrid = [];
            for (let i = 0; i < 6; i++) {
                puissanceGrid.push(new Array(7).fill(null));
            };

            return puissanceGrid;
        })
        setCurrentPlayer("red");
        setWinner(null);
    }


    return (
        <main className={styles.main}>
            <div className={styles.wrapper}>
                {winner && 
                    <h5 className={styles.title}>{`Le joueur ${currentPlayer === "red" ? "rouge" : "jaune"} a gagné ! 🎉`}</h5>
                }
                <div className={styles.grid}>
                    {
                        cells.map((columns, i) => (
                            columns.map((cell, index) => (
                                <div key={`${i}-${index}`} className={styles.cell} onClick={() => handleClick(index)}>
                                    {!cell && <div className={`${styles.jeton}`}></div>}
                                    {cell && <div className={`${styles.jeton} ${cell === "red" ? styles.red : styles.yellow}`}></div>}
                                </div>
                            ))
                        ))
                    }
                </div>
                <button type="button" onClick={resetGrid} className={styles.reset_btn}>Reset</button>
            </div>
        </main>
    )
}