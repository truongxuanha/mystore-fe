export async function getInFoProduct(slug: string) {
  try {
    const res = await fetch(
      `https://mystore-api-v1.onrender.com/v1/product/${slug}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
