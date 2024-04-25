export const generatePayPerFace = (
  encodedBase64Image: any,
  amount: number = 50,
) => {
  return `
      {border: line}
      --------------------------------------
      "^^${amount} EUR                                   "^^
      ^^^ EUR              ^^^
      {image: ${encodedBase64Image}}
      "^^                                   ${amount} EUR"^^
    `;
};
