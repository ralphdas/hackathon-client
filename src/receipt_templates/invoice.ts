import * as sharp from 'sharp';

export const generatePayPerFace = async (
  encodedBase64Image: any,
  amount: number = 50,
) => {
  // Convert base64 to Buffer
  const imageBuffer = Buffer.from(encodedBase64Image, 'base64');

  // Resize the image
  const resizedImageBuffer = await sharp(imageBuffer)
    .resize(200, 200)
    .png()
    .toBuffer();

  // Convert back to base64
  const resizedBase64Image = resizedImageBuffer.toString('base64');

  return `
      {border: line}
      --------------------------------------
      "^^${amount} EUR                                   "^^
      ^^^ EUR              ^^^
      {image: ${resizedBase64Image}}
      "^^                                   ${amount} EUR"^^
    `;
};
