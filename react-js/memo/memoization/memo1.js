const square = (n) => {
  let result = 0;

  // Slow function
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      result += 1;
    }
  }
  return result;
}

console.time('square 1');
console.log(square(100006));
console.log(square(40));
console.log(square(5));
console.timeEnd('square 1');

console.time('square 2');
console.log(square(100006));
console.log(square(40));
console.log(square(5));
console.timeEnd('square 2');
