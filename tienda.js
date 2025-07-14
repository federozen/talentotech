document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-productos");

  productos.forEach(producto => {
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
