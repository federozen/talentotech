document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector(".productos");

  // Tomamos solo los primeros 4 productos
  const destacados = productos.slice(0, 4);

  destacados.forEach(producto => {
    const card = document.createElement("article");
    card.classList.add("producto");

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h4>${producto.nombre}</h4>
      <p>$${producto.precio.toLocaleString()}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;

    contenedor.appendChild(card);
  });
});