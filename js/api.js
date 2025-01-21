// API para interactuar con el servidor falso (JSON Server)

const apiUrl = "http://localhost:3000/products";

export async function fetchProducts() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

export async function addProduct(product) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
}

export async function deleteProduct(id) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
  return response.ok;
}
