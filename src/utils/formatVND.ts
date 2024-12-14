export type Amount = {
  amount: string | number;
  discount?: number;
};

function formatVND(amount: string | number, discount: number = 0): string {
  const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "symbol",
  });

  return isNaN(numericAmount) ? "" : formatter.format(numericAmount - numericAmount * (discount / 100));
}

export default formatVND;
