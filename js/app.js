import { fetchProducts, addProduct, deleteProduct } from './api.js';

// Función para renderizar productos en el DOM
function renderProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  if (products.length === 0) {
    productList.innerHTML = '<p>No se han agregado productos.</p>';
  } else {
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('card');
      productCard.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}">
        <p>Precio: $${product.price}</p>
        <button class="delete" data-id="${product.id}">Eliminar</button>
      `;
      productList.appendChild(productCard);

      // Eliminar producto
      const deleteButton = productCard.querySelector('.delete');
      deleteButton.addEventListener('click', async () => {
        const id = deleteButton.getAttribute('data-id');
        await deleteProduct(id);
        fetchAndRenderProducts();
      });
    });
  }
}

// Función para cargar productos
async function fetchAndRenderProducts() {
  const products = await fetchProducts();
  renderProducts(products);
}

// Captura de eventos del formulario
const form = document.getElementById('product-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('product-name').value;
  const price = document.getElementById('product-price').value;
  const image = document.getElementById('product-image').value;

  const newProduct = { name, price, image };
  await addProduct(newProduct);
  fetchAndRenderProducts();
  form.reset();
});

// Cargar productos al iniciar la página
fetchAndRenderProducts();