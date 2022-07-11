import { describe, expect, it } from "vitest";
import { TicTacToe } from "../src/class/TicTacToe";
import { SquareValue } from "../src/enum/SquareValue";

describe("creating game", () => {
  it("should instantiate a game", () => {
    const game = new TicTacToe("foo", "bar");

    expect(game).toBeInstanceOf(TicTacToe);
  });

  it("should init with players", () => {
    const game = new TicTacToe("foo", "bar");

    expect(game.p1).toBe("foo");
    expect(game.p2).toBe("bar");
  });

  it("should init grid area", () => {
    const game = new TicTacToe("foo", "bar");

    expect(game.getValue(0, 0)).toBe(SquareValue.EMPTY);
    expect(game.getValue(0, 1)).toBe(SquareValue.EMPTY);
    expect(game.getValue(0, 2)).toBe(SquareValue.EMPTY);

    expect(game.getValue(1, 0)).toBe(SquareValue.EMPTY);
    expect(game.getValue(1, 1)).toBe(SquareValue.EMPTY);
    expect(game.getValue(1, 2)).toBe(SquareValue.EMPTY);

    expect(game.getValue(2, 0)).toBe(SquareValue.EMPTY);
    expect(game.getValue(2, 1)).toBe(SquareValue.EMPTY);
    expect(game.getValue(2, 2)).toBe(SquareValue.EMPTY);
  });

  it("should play", () => {
    const game = new TicTacToe("foo", "bar");

    expect(game.playerTurn).toBe(1);

    game.play(0, 0);
    expect(game.playerTurn).toBe(2);
    expect(game.getValue(0, 0)).toBe(SquareValue.X);

    expect(() => game.play(0, 0)).toThrowError("Square already taken");
    expect(game.playerTurn).toBe(2);

    game.play(0, 1);
    expect(game.playerTurn).toBe(1);
    expect(game.getValue(0, 1)).toBe(SquareValue.O);
  });

  it("should win horizontally", () => {
    const game = new TicTacToe("foo", "bar");

    game.play(0, 0); // P1
    game.play(1, 0); // P2
    game.play(0, 1); // P1
    game.play(1, 1); // P2
    game.play(0, 2); // P1

    expect(game.winner).toBe("foo"); // P1 win
  });

  it("should win vertically", () => {
    const game = new TicTacToe("foo", "bar");

    game.play(0, 0); // P1
    game.play(1, 1); // P2
    game.play(1, 0); // P1
    game.play(2, 1); // P2
    game.play(2, 0); // P1

    expect(game.winner).toBe("foo"); // P1 win
  });

  it("should win diagonally", () => {
    const game = new TicTacToe("foo", "bar");

    game.play(0, 0); // P1
    game.play(1, 0); // P2
    game.play(1, 1); // P1
    game.play(1, 2); // P2
    game.play(2, 2); // P1

    expect(game.winner).toBe("foo"); // P1 win
  });

  it("should draw", () => {
    const game = new TicTacToe("foo", "bar");

    game.play(0, 0); // P1
    game.play(0, 1); // P2
    game.play(0, 2); // P1
    game.play(1, 0); // P2
    game.play(1, 2); // P1
    game.play(1, 1); // P2
    game.play(2, 0); // P1
    game.play(2, 2); // P2
    game.play(2, 1); // P1

    expect(game.winner).toBeUndefined(); // Draw
    expect(game.isDraw()).toBe(true);
  });
});
