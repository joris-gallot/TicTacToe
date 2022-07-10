import { describe, expect, it } from "vitest";
import { TicTacToe } from "../class/TicTacToe";

describe("creating game", () => {
  it("should instantiace a game", () => {
    const game = new TicTacToe();

    expect(game).toBeInstanceOf(TicTacToe);
  });
});
