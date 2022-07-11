import { SquareValue } from "./../enum/SquareValue";

export class TicTacToe {
  public winner: string | undefined;
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

    this.winner = this.detectWinner();
  }

  private detectWinner(): string | undefined {
    const winSquareValue =
      this.detectHorizontalWin() ||
      this.detectVerticalWin() ||
      this.detectDiagonalWin();

    if (winSquareValue) {
      return winSquareValue === SquareValue.X ? this.p1 : this.p2;
    }

    return undefined;
  }

  public isDraw(): boolean {
    return this.winner === undefined && this.isFull();
  }

  private isFull(): boolean {
    return this.grid.every((row) =>
      row.every((square) => square !== SquareValue.EMPTY)
    );
  }

  private detectHorizontalWin(): SquareValue | undefined {
    for (let i = 0; i < this.grid.length; i++) {
      if (
        this.grid[i][0] === this.grid[i][1] &&
        this.grid[i][1] === this.grid[i][2]
      ) {
        return this.grid[i][0];
      }
    }

    return undefined;
  }

  private detectVerticalWin(): SquareValue | undefined {
    for (let i = 0; i < this.grid.length; i++) {
      if (
        this.grid[0][i] === this.grid[1][i] &&
        this.grid[1][i] === this.grid[2][i]
      ) {
        return this.grid[0][i];
      }
    }

    return undefined;
  }

  private detectDiagonalWin(): SquareValue | undefined {
    if (
      this.grid[0][0] === this.grid[1][1] &&
      this.grid[1][1] === this.grid[2][2]
    ) {
      return this.grid[0][0];
    }

    if (
      this.grid[0][2] === this.grid[1][1] &&
      this.grid[1][1] === this.grid[2][0]
    ) {
      return this.grid[0][2];
    }

    return undefined;
  }
}
