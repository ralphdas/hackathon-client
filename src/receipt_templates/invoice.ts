export const generateInvoiceReceipt = (encodedBase64Image: string) => {
  return `
        {image: ${encodedBase64Image}}
    `;
};
