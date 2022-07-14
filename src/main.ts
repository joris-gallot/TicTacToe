import { TicTacToe } from "./class/TicTacToe";
import { SquareValue } from "./enum/SquareValue";
import "./style.scss";

const app = document.querySelector(".app")!;
const squares = Array.from(app.children);
const game = new TicTacToe("foo", "bar");

squares.forEach((square, index) => {
  square.addEventListener("click", () => {
    const { row, column } = indexToCoordinates(index);

    try {
      const squareValue = game.play(row, column);

      if (game.winner) {
        const p = document.createElement("p");
        p.innerText =
          squareValue === SquareValue.X ? "Player 1 wins!" : "Player 2 wins!";
        p.id = "winner";

        app.appendChild(p);
      }

      const letter = squareValue === SquareValue.X ? "X" : "O";
      square.setAttribute("data-value", letter);
    } catch (error) {
      console.error(error);
    }
  });
});

const indexToCoordinates = (index: number) => {
  const row = Math.floor(index / 3);
  const column = index % 3;
  return { row, column };
};
