import { SquareValue } from "../enum/SquareValue";

export class TicTacToe {
  public playerTurn: 1 | 2 = 1;
  private grid: SquareValue[][] = [];

  constructor(public p1: string, public p2: string) {
    this.grid = [
      new Array(3).fill(SquareValue.EMPTY),
      new Array(3).fill(SquareValue.EMPTY),
      new Array(3).fill(SquareValue.EMPTY),
    ];
  }

  public getValue(x: number, y: number): SquareValue {
    const value = this.grid[x][y];

    if (value) {
      return value;
    }

    throw new Error(`No value at ${x} ${y} position`);
  }

  public play(x: number, y: number): void {
    if (this.getValue(x, y) !== SquareValue.EMPTY) {
      throw new Error("Square already taken");
    }

    if (this.playerTurn === 1) {
      this.grid[x][y] = SquareValue.X;
      this.playerTurn = 2;
    } else {
      this.grid[x][y] = SquareValue.O;
      this.playerTurn = 1;
    }
  }
}
