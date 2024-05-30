//todo se ejecuta cuando el dom se carga completamente
document.addEventListener('DOMContentLoaded', () => {


    //selecciona el formulario del dom
    const formulario = document.querySelector('form');

    // funcion mostrar error
    const mostrarError = (input, mensaje) => {
        //acceder al div contenedor para ver cual tipo de error es
        const divPadre = input.parentNode; //nos devuelve la etiqueta contenedora del input
        const errorText = divPadre.querySelector('.error-text'); //de esta forma selecciono el div del input que no se ha cargado

        divPadre.classList.add('error');//agrego la clase de error al elemento padre en el css
        //agrego el mensaje error
        errorText.innerText = mensaje;

    }
    const input = document.querySelector('#email');
    const mensaje = 'Campo obligatorio';

    //---------
    //funcion para eliminar el mensaje de error si ya se ingresó el campo

    const eliminarError = input => {
        //acceder al div contenedor para ver cual tipo de error es
        const divPadre = input.parentNode; //nos devuelve la etiqueta contenedora del input
        //eliminar la clase error
        divPadre.classList.remove('error');
        //encontramos el elemento error-text
        const errorText = divPadre.querySelector('.error-text');
        //establecemos el texto como vacio
        errorText.innerText = '';

    }

    //---------
    //funcion para corroborar si los campos estan completos para quitar el error

    formulario.querySelectorAll('input').forEach(input => {
        //el evento se activa cuando el valor de un elemento del formulario cambia y se sale del elemento
        input.addEventListener('change', () => {
            //obtenemos el valor del campo seleccionado
            const valor = input.value.trim(); //elimina cualquier espacio en blanco al principio y al final del valor obtenido
            //condicion para evaluar si el campo es vacio
            if (valor !== '') {
                eliminarError(input);
            }

        })
    });

    //----------
    //funcion para vaildar campo
    function validarCampo(campoId, mensaje) {
        const campo = document.getElementById(campoId);
        const value = campo.value.trim();

        if (value == '') {
            mostrarError(campo, mensaje);
            return false;
        }
        else {
            eliminarError(campo);
            return true;
        }

    }

    //funcion para validar un correo electronico utilizando una expresion regular
    function isEmail(email) {
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email);//devuelve true si la cadena coincide con el patrón de la expresión regular
    }

    //funcion para validar el campo de email
    function validarEmail(campoId, mensaje) {
        //obtengo el campo mediante id
        const campo = document.getElementById(campoId);
        const email = campo.value.trim();

        if (email === '') {
            mostrarError(campo, 'el correo electronico es obligatorio');
            return false;

        }
        else if (!isEmail(email)) {
            mostrarError(campo, mensaje);
            return false;
        }
        else {
            eliminarError(campo);
            return true;
        }

    }

    //funcion para validar el formulario
    const validarFormulario = () => {
        let validar = true;

        validar = validarEmail('email', 'el correo electronico no es valido') && validar;
        validar = validarCampo('password', 'la contraseña es obligatoria') && validar;

        return validar;
    }


    //agregar un evento de escucha para saber cuando se envia el formulario

    formulario.addEventListener('submit', event => {
        event.preventDefault(); //esto es para que no se envie sin validar la condicion

        if (!validarFormulario()) {
            //mensaje no valido
            event.preventDefault()
            console.log("El formulario no es valido")
        }
        else {
            console.log("El formulario es valido")
            window.location.href = 'index.html';
        }
    })

})

