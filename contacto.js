document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formularioContacto");

  const campos = {
    nombre: {
      el: document.getElementById("nombre"),
      validar: (valor) => valor.trim().length >= 3,
      mensaje: "El nombre debe tener al menos 3 caracteres."
    },
    correo: {
      el: document.getElementById("correo"),
      validar: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor),
      mensaje: "El correo no es válido."
    },
    asunto: {
      el: document.getElementById("asunto"),
      validar: (valor) => valor.trim().length >= 5,
      mensaje: "El asunto debe tener al menos 5 caracteres."
    },
    mensaje: {
      el: document.getElementById("mensaje"),
      validar: (valor) => valor.trim().length >= 10,
      mensaje: "El mensaje debe tener al menos 10 caracteres."
    }
  };

  const mostrarError = (campo, valido, mensaje) => {
    const grupo = campo.parentElement;
    const errorDiv = grupo.querySelector(".texto-error");
    if (valido) {
      grupo.classList.remove("error");
      errorDiv.textContent = "";
    } else {
      grupo.classList.add("error");
      errorDiv.textContent = mensaje;
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let esValido = true;

    for (let key in campos) {
      const campo = campos[key];
      const valor = campo.el.value;
      const valido = campo.validar(valor);
      mostrarError(campo.el, valido, campo.mensaje);
      if (!valido) esValido = false;
    }

    if (esValido) {
      alert("Formulario enviado con éxito (simulado)");
      form.reset();
    } else {
      alert("Por favor, revisá los campos.");
    }
  });
});
