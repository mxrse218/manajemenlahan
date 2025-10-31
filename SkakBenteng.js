const board = [
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', 'R', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', 'K', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.']
];

//mencari posisi raja dan benteng
let king = null;
let rook = null;

for (let i = 0; i < board.length; i++) {
  for (let j = 0; j < board[i].length; j++) {
    if (board[i][j] === 'K') king = [i, j];
    if (board[i][j] === 'R') rook = [i, j];
  }
}

//cek arah (horizontal dan vertikal)
function isCheck(king, rook, board) {
  const [kx, ky] = king;
  const [rx, ry] = rook;

  //jika satu baris
  if (kx === rx) {
    const minY = Math.min(ky, ry);
    const maxY = Math.max(ky, ry);
    for (let y = minY + 1; y < maxY; y++) {
      if (board[kx][y] !== '.') return false;
    }
    return true;
  }

  //jika satu kolom
  if (ky === ry) {
    const minX = Math.min(kx, rx);
    const maxX = Math.max(kx, rx);
    for (let x = minX + 1; x < maxX; x++) {
      if (board[x][ky] !== '.') return false;
    }
    return true;
  }

  //jika beda baris dan kolom = aman
  return false;
}

if (isCheck(king, rook, board)) {
  console.log('SKAK!');
} else {
  console.log('Aman');
}