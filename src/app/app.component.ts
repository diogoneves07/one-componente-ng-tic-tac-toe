import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tic-tac-toe';

  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  currentPlayer = 'X';

  winner: string | null = null;

  ngOnInit() {}

  makeMove(row: number, col: number) {
    if (this.board[row][col] !== '') return;

    this.board[row][col] = this.currentPlayer;

    if (this.checkWinner(row, col)) {
      this.winner = this.currentPlayer;
    }

    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  checkWinner(row: number, col: number): boolean {
    const player = this.board[row][col];

    const check = [
      this.hasRowWinner(player, row),
      this.hasColWinner(player, col),
      this.hasTopLeftToBottomRightWinner(player, row, col),
      this.hasTopRightToBottomLeftWinner(player, row, col),
    ];

    return check.find((i) => i) || false;
  }

  hasRowWinner(player: string, row: number) {
    let count = 0;

    for (let c = 0; c < 3; c++) {
      if (this.board[row][c] === player) {
        count++;
      }
    }

    return count === 3;
  }

  hasColWinner(player: string, col: number) {
    let count = 0;

    for (let r = 0; r < 3; r++) {
      if (this.board[r][col] === player) {
        count++;
      }
    }

    return count === 3;
  }

  hasTopLeftToBottomRightWinner(player: string, row: number, col: number) {
    if (row !== col) return false;

    let count = 0;

    for (let i = 0; i < 3; i++) {
      if (this.board[i][i] === player) {
        count++;
      }
    }

    return count === 3;
  }

  hasTopRightToBottomLeftWinner(player: string, row: number, col: number) {
    if (row + col !== 2) return false;

    let count = 0;

    for (let i = 0; i < 3; i++) {
      if (this.board[i][2 - i] === player) {
        count++;
      }
    }

    return count === 3;
  }

  reset() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.currentPlayer = 'X';
    this.winner = null;
  }
}
