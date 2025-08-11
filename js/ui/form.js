//Valores iniciales
const initialValues = {
    name: '',
    lastname: '',
    email: '',
    tel: ''
}

export function iniciarFormulario() {


    const containerForm = document.getElementById('container-form');
    containerForm.innerHTML = renderForm(initialValues, {})


    const renderAndAttachListeners = (data = initialValues, errors = {}) => {
        containerForm.innerHTML = renderForm(data, errors);

        const inputName = document.getElementById('name');
        const inputLastName = document.getElementById('lastname');
        const inputTel = document.getElementById('tel');

        validateLetters(inputName);
        validateLetters(inputLastName);
        validateNumbers(inputTel);
    };

    // Llamamos a la función para la primera renderización.
    renderAndAttachListeners();

    //obtenemos los datos del formulario cuando el usuario de click en contactar
    containerForm.addEventListener('submit', (e) => {
        if (e.target.matches('#form')) {
            e.preventDefault();

            //constuye el objeto con los datos del fomrulario
            const data = Array.from(e.target.elements).reduce((acc, el) => {
                if (!el.name) return acc;
                acc[el.name] = el.value;
                return acc;
            }, {})


            //Recibe el objeto con los errores
            const errors = validate(data);


            if (Object.keys(errors).length > 0) {
                renderAndAttachListeners(data, errors);

            } else {
                //mostramos una alerta tipo toast
                toast('¡Formulario enviado con éxito!', true);
                renderAndAttachListeners();        
                e.target.reset();
            }
        }
    });

}

function toast(msg, success) {
    const toast = document.getElementById('toast');
    toast.textContent = msg
    if (!success) return;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * @param {data}
 * @returns
 */
function renderForm(data = initialValues, errors = {}) {
    console.log("En la funcion render:", data);
    console.log("En la funcion render:", errors);
    return `
        <div>
            <h3>¿Tienes alguna duda?</h3>

            <form id="form" Class="form" novalidate>
                <h3>Contáctanos</h3>
                <div class ="field">
                    <label for="name">Nombre</label>
                    <input type="text" id="name" name="name" value="${data.name}" class="${errors.name ? 'border-error' : ''}">
                    <span class="error" name="error-name" id="error-name">${errors.name ? errors.name : ''}</span>
                </div>
                <div class ="field">
                    <label for="last_name">Apellido</label>
                    <input type="text" id="lastname" class="${errors.lastname ? 'border-error' : ''}" name="lastname" value="${data.lastname}">
                    <span class="error" name="error-lastname" id="error-lastname">${errors.lastname ? errors.lastname : ''}</span>
                </div>
                <div class ="field">
                    <label for="age">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" value="${data.email}" class="${errors.email ? 'border-error' : ''}">
                    <span class="error" name="error-email" id="error-email">${errors.email ? errors.email : ''}</span>
                </div>
                <div class ="field">
                    <label for="tel">Numero Telefónico:</label>
                    <input type="tel" id="tel" name="tel" value="${data.tel ? data.tel : ''}" class="${errors.tel ? 'border-error' : ''}">
                    <span class="error" name="error-tel" id="error-tel">${errors.tel ? errors.tel : ''}</span>
                </div>
                <button type="submit" class="btn red red-hover">Contactar</button>
            </form>
        </div>
    `;
}

/**
 * 
 * @param {object} data
 * @returns {object} errors 
 */
export function validate(data) {
    const errors = {};
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telRegex = /^\d{10}$/;


    //Validamos vacios
    if (data.name.trim() === '') {
        errors['name'] = "Este campo es obligatorio";
    } else if (data.name && !nameRegex.test(data.name)) {
        errors['name'] = "Este formato es invalido";
    }

    if (data.lastname.trim() === '') {
        errors['lastname'] = "Este campo es obligatorio";
    } else if (data.lastname && !nameRegex.test(data.lastname)) {
        errors['lastname'] = "Este formato es invalido";
    }

    if (data['email'].trim() === '') {
        errors['email'] = "Este campo es obligatorio";
    } else if (data.email && !emailRegex.test(data.email)) {
        errors['email'] = "El correo electrónico debe contener un simbolo de @";
    }

    if (data['tel'].trim() === '') {
        errors['tel'] = "Este campo es obligatorio";
    } else if (data.tel && !telRegex.test(data.tel)) {
        errors['tel'] = "El número telefónico debe de ser de 10 caracteres";
    }


    return errors;
}

const validateLetters = (reference) => {
    reference.addEventListener('keydown', function (evento) {
        const key = evento.keyCode || evento.which;
        const tecla = String.fromCharCode(key);
        const patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!patron.test(tecla) && key !== 8 && key !== 46 && key !== 9 && (key < 37 || key > 40)) {
            evento.preventDefault();
        }
    });
}


const validateNumbers = (reference) => {
    reference.addEventListener('keydown', function (evento) {
        const key = evento.keyCode || evento.which;
        const tecla = String.fromCharCode(key);
        const patron = /[0-9]/;
        if (!patron.test(tecla) && key !== 8 && key !== 46 && key !== 9 && (key < 37 || key > 40)) {
            evento.preventDefault();
        }
    });
}