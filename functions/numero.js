function numero(number) {
  const suffixes = ["", "K", "M", "B", "T"];

  let suffixIndex = 0;
  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    number /= 1000;
    suffixIndex++;
  }

  const roundedNumber = Math.round(number * 100) / 100;

  const formattedNumber = roundedNumber + suffixes[suffixIndex];
  return formattedNumber;
}

export { numero };