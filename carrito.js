document.addEventListener('DOMContentLoaded', () => {
  cargarProductosCarrito();
});

// Cargamos carrito + array de productos
function cargarProductosCarrito() {
  const carritoStorage = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
  const contenedor = document.querySelector('#tabla_carrito');
  contenedor.innerHTML = '';  // limpiamos

  let subtotalCalculado = 0;

  if (carritoStorage.length === 0) {
    contenedor.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;padding:20px;">
          Tu carrito está vacío. Agrega productos desde la <a href="tienda.html">tienda</a>.
        </td>
      </tr>`;
  } else {
    carritoStorage.forEach(item => {
      // Buscamos detalles en el array global 'productos'
      const prod = productos.find(p => p.id === item.id);
      if (!prod) return;  // si cambió algo, lo ignoramos

      // Creamos un objeto completo para la fila
      const productoFull = {
        id: prod.id,
        nombre: prod.nombre,
        precio: prod.precio,
        imagen: prod.imagen,
        cantidad: item.cantidad
      };

      contenedor.innerHTML += crearFilaProducto(productoFull);
      subtotalCalculado += prod.precio * item.cantidad;
    });
  }

  actualizarTotalCarrito(subtotalCalculado);
  eventosFila();
}

// Genera el HTML de cada fila
function crearFilaProducto(producto) {
  const subtotal = (producto.precio * producto.cantidad).toFixed(2);
  const tituloCorto = producto.nombre.length > 10
    ? producto.nombre.substring(0,10) + '…'
    : producto.nombre;

  return `
    <tr>
      <td>
        <button id="${producto.id}" class="remove-btn">
          <i class="far fa-times-circle"></i>
        </button>
      </td>
      <td>
        <img src="${producto.imagen}"
             alt="${producto.nombre}"
             style="height:80px;width:auto;object-fit:contain;">
      </td>
      <td>${tituloCorto}</td>
      <td>$${producto.precio.toFixed(2)}</td>
      <td>
        <input type="number"
               value="${producto.cantidad}"
               min="1"
               id="${producto.id}"
               class="cantidad-producto">
      </td>
      <td>$${subtotal}</td>
    </tr>`;
}

// Actualiza el total global
function actualizarTotalCarrito(subtotal) {
  document.querySelector('#total').innerText = subtotal.toFixed(2);
}

// Eventos para eliminar o cambiar cantidad
function eventosFila() {
  // Botones quitar
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
      const id = parseInt(btn.id);
      carrito = carrito.filter(item => item.id !== id);
      localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
      cargarProductosCarrito();
    });
  });

  // Inputs de cantidad
  document.querySelectorAll('.cantidad-producto').forEach(input => {
    input.addEventListener('change', () => {
      const nuevoValor = parseInt(input.value);
      if (nuevoValor < 1) {
        input.value = 1;
        return;
      }

      let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
      const id = parseInt(input.id);
      const item = carrito.find(i => i.id === id);
      if (item) {
        item.cantidad = nuevoValor;
        localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
        actualizarTotales();
      }
    });
  });
}

// Sólo recalcula subtotales y total (sin recargar toda la tabla)
function actualizarTotales() {
  const carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
  let sub = 0;
  carrito.forEach(item => {
    const prod = productos.find(p => p.id === item.id);
    if (prod) sub += prod.precio * item.cantidad;
  });

  // Actualiza cada subtotal de fila
  document.querySelectorAll('#tabla_carrito tr').forEach(fila => {
    const inp = fila.querySelector('.cantidad-producto');
    if (!inp) return;
    const id = parseInt(inp.id);
    const item = carrito.find(i => i.id === id);
    const celdaSubtotal = fila.cells[5];
    const prod = productos.find(p => p.id === id);
    if (item && prod) {
      celdaSubtotal.textContent = `$${(prod.precio * item.cantidad).toFixed(2)}`;
    }
  });

  actualizarTotalCarrito(sub);
}

function agregarAlCarrito(id) {
  debugger
  let carrito = JSON.parse(localStorage.getItem("carritoDeCompras")) || [];
  const item = carrito.find(p => p.id === id);
  if (item) {
    item.cantidad += 1;
  } else {
    carrito.push({ id, cantidad: 1 });
  }
  localStorage.setItem("carritoDeCompras", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
}
