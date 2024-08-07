export interface Amount {
  amount: string | number;
}

function formatVND(amount: Amount["amount"]): string {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "symbol",
  });

  return isNaN(numericAmount) ? "" : formatter.format(numericAmount);
}

export default formatVND;
