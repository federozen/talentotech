document.addEventListener('DOMContentLoaded', function () {
  const formularioContacto = document.getElementById('formularioContacto');
  const tuNombre = document.getElementById('tuNombre');
  const tuCorreo = document.getElementById('tuCorreo');
  const asunto = document.getElementById('asunto');
  const tuMensaje = document.getElementById('tuMensaje');

  // Función para manejar la visibilidad y el texto de error
  const mostrarEstadoCampo = (elementoInput, esValido, mensaje = '') => {
    const divPadre = elementoInput.parentNode;
    const textoError = divPadre.querySelector('.texto-error');

    if (esValido) {
      divPadre.classList.remove('error');
      textoError.innerText = '';
    } else {
      divPadre.classList.add('error');
      textoError.innerText = mensaje;
    }
  };

  // Validaciones específicas
  const validarNombre = () => {
    const valor = tuNombre.value.trim();
    const esValido = valor.length >= 3;
    mostrarEstadoCampo(tuNombre, esValido, 'El nombre debe tener al menos 3 caracteres.');
    return esValido;
  };

  const validarCorreo = () => {
    const valor = tuCorreo.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const esValido = regex.test(valor);
    mostrarEstadoCampo(tuCorreo, esValido, 'Ingresa un correo válido.');
    return esValido;
  };

  const validarAsunto = () => {
    const valor = asunto.value.trim();
    const esValido = valor.length >= 5;
    mostrarEstadoCampo(asunto, esValido, 'El asunto debe tener al menos 5 caracteres.');
    return esValido;
  };

  const validarMensaje = () => {
    const valor = tuMensaje.value.trim();
    const esValido = valor.length >= 10;
    mostrarEstadoCampo(tuMensaje, esValido, 'El mensaje debe tener al menos 10 caracteres.');
    return esValido;
  };

  formularioContacto.addEventListener('submit', function (e) {
    e.preventDefault();
    let formularioEsValido = true;

    // Validar cada campo
    [validarNombre(), validarCorreo(), validarAsunto(), validarMensaje()]
      .forEach(esCampoValido => {
        if (!esCampoValido) formularioEsValido = false;
      });

    if (formularioEsValido) {
      console.log('¡Formulario enviado con éxito!');
      // Aquí podrías enviar con fetch...
      formularioContacto.reset();
    } else {
      console.log('El formulario no es válido. Por favor, revisa los campos.');
    }
  });
});
