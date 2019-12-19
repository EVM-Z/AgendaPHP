const formularioContactos = document.querySelector('#contacto'),
    listadoContactos = document.querySelector('#listado-contactos tbody');

eventListeners();

function eventListeners() {
    // Cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);

    if (listadoContactos) {
        // Listener para eliminar el contacto
        listadoContactos.addEventListener('click', eliminarContacto);
    }

}

function leerFormulario(e) {
    e.preventDefault();

    // Leer los datos de los inputs
    const nombre = document.querySelector('#nombre').value,
        empresa = document.querySelector('#empresa').value,
        telefono = document.querySelector('#telefono').value,
        accion = document.querySelector('#accion').value;

    if (nombre === '' || empresa === '' || telefono === '') {
        // 2 parametros: texto y clase
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    } else {
        // Pasa a la validación, crear llamado a Ajax
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        // console.log(...infoContacto);

        if (accion === 'crear') {
            // Creamos un nuevo elemento
            insertarBD(infoContacto);
        } else {
            // Editar el contacto
            // Leer el id
            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);
        }
    }
}

// Insertar en la base de datos via Ajax
function insertarBD(datos) {
    // Llamando a ajax
    // Crear el objeto
    const xhr = new XMLHttpRequest();
    // Abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);
    // Pasar los datos
    xhr.onload = function() {
            if (this.status === 200) {
                console.log(xhr.responseText);
                // Leemos la respuesta en PHP
                const respuesta = JSON.parse(xhr.responseText);

                // Inserta un nuevo elemento a la tabla
                const nuevoContacto = document.createElement('tr');
                nuevoContacto.innerHTML = `
                    <td>${respuesta.datos.nombre}</td>
                    <td>${respuesta.datos.empresa}</td>
                    <td>${respuesta.datos.telefono}</td>
                `;

                // Crear contenedor para los botones
                const contenedorAcciones = document.createElement('td');

                // Crear el icono de editar
                const iconoEditar = document.createElement('i');
                iconoEditar.classList.add('fas', 'fa-pen-square');

                // Crea el enlace para editar
                const btnEditar = document.createElement('a');
                btnEditar.appendChild(iconoEditar);
                btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
                btnEditar.classList.add('btn', 'btn-editar');

                // Agregarlo al padre
                contenedorAcciones.appendChild(btnEditar);

                // Crear el icono de eliminar
                const iconoEliminar = document.createElement('i');
                iconoEliminar.classList.add('fas', 'fa-trash-alt');

                // Crear el boton de eliminar
                const btnEliminar = document.createElement('a');
                btnEliminar.appendChild(iconoEliminar);
                btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);

                // Agregar al padre
                contenedorAcciones.appendChild(btnEliminar);

                // Agregarlo al tr
                nuevoContacto.appendChild(contenedorAcciones);

                // Agregar a los contactos
                listadoContactos.appendChild(nuevoContacto);

                // Resetear el formulario
                document.querySelector('form').reset();

                // Mostrar la notificacion
                mostrarNotificacion('Contacto Creado Correctamente', 'correcto');
            }
        }
        // Enviar los datos
    xhr.send(datos);
}

function actualizarRegistro(datos) {
    // console.log(...datos);
    // Crear el objeto
    const xhr = new XMLHttpRequest();
    // Abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);
    // Leer la respuesta
    xhr.onload = function() {
            if (this.status === 200) {
                const respuesta = JSON.parse(xhr.responseText);
                console.log(respuesta);
                if (respuesta.respuesta === 'correcto') {
                    // Mostrar notificacion
                    mostrarNotificacion('Contacto Editado Correctamente', 'correcto');
                } else {
                    // Un error
                    mostrarNotificacion('Error', 'error');
                }
                // Despues de 3 segundos redireccionar
                setTimeout(() => {
                    window.location.href = 'index.php';
                }, 3000);
            }
        }
        // Enviar los datos
    xhr.send(datos);
}

// Eliminar el contacto
function eliminarContacto(e) {
    // Muestras true cuando le damos al icono de borrar
    // console.log(e.target.parentElement.classList.contains('btn-borrar'));
    // En caso de que de click en el icono de borrar
    if (e.target.parentElement.classList.contains('btn-borrar')) {
        // Tomar el ID
        const id = e.target.parentElement.getAttribute('data-id');
        // Muestra el id del boton eliminar
        // console.log(id);
        // Preguntar al usuario
        const respuesta = confirm('¿Estas seguro?');
        if (respuesta) {
            console.log('Si estoy seguro');
            // Llamado a AJAX
            // Crear el objeto
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);
            // Leer la respuesta
            xhr.onload = function() {
                    if (this.status === 200) {
                        const resultado = JSON.parse(xhr.responseText);
                        if (resultado.respuesta == 'correcto') {
                            // Eliminar el registro del DOM
                            // Con parentElement subimos un nivel en el DOM
                            console.log(e.target.parentElement.parentElement.parentElement);
                            e.target.parentElement.parentElement.parentElement.remove();
                            // Mostrar notificaciones
                            mostrarNotificacion('Contacto eliminado', 'correcto');
                        } else {
                            mostrarNotificacion('Hubo un error', 'error');
                        }
                        // Despues de 3 segundos redirecionar
                        setTimeout(() => {
                            window.location.href = 'index.php';
                        }, 4000);
                    }
                }
                // Enviar la peticion
            xhr.send();
        } else {
            console.log('Dejame pensarlo');
        }
    }
}

// Notificacion en Pantalla
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    // Formulario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

    // Ocultar y Mostrar la notificacion
    setTimeout(() => {
        notificacion.classList.add('visible');
        setTimeout(() => {
            notificacion.classList.remove('visible');
            // Eliminamos el elemento del DOM
            setTimeout(() => {
                notificacion.remove();
            }, 500);
        }, 3000);
    }, 100);
}