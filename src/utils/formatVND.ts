export interface Amount {
  amount: string | number;
  discount: number;
}

function formatVND(
  amount: Amount["amount"],
  discount: Amount["discount"]
): string {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "symbol",
  });

  return isNaN(numericAmount)
    ? ""
    : formatter.format(numericAmount - numericAmount * (discount / 100));
}

export default formatVND;
