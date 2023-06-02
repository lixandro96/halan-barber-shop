// variables
const formulario =  document.querySelector('#formulario');
const nombre =  document.querySelector('#nombre');
const dia =  document.querySelector('#dia');
const horario = document.querySelector('#horario');
const btnReservar  = document.querySelector('.reservar');
const tareas = document.querySelector('.tareas');
let datos = []
let total = document.querySelector('#total');
let usuarios = ['halan-26','lixandro96']



iniciarApp()

function iniciarApp(){
    btnReservar.disabled = true;
    btnReservar.style.cursor = 'not-allowed';
}

// enventos
function eventos(){
    
    document.addEventListener('DOMContentLoaded', () => {
        const preguntarUsiario = prompt('Ingrese su Usuario');
        if(!usuarios.includes(preguntarUsiario)){
            window.location.reload()
        }
        datos = JSON.parse(localStorage.getItem('informacion') || [])

        mostrarInfo()
    });

    formulario.addEventListener('submit',enviarDatos);

    nombre.addEventListener('input',validarDatos);

    dia.addEventListener('input',validarDatos);

    horario.addEventListener('input',validarDatos);

    tareas.addEventListener('click',eliminar);

    tareas.addEventListener('click',completar);
}

eventos()


// funciones 


function validarDatos(e){
    
    const error = document.createElement('p');
    if(e.target.value === ''){
        error.textContent = 'Todos los campos son obligatorios';
        error.classList.add('error');
        formulario.appendChild(error)
        iniciarApp()
        setTimeout(()=>{
            error.remove()
        },2000)
        return
    }
    if(nombre.value !== '' && dia.value !== '' && horario.value !== ''){
        btnReservar.disabled = false;
        btnReservar.style.cursor = 'pointer';
    }
}

function enviarDatos(e){
    e.preventDefault();
    
    const informacion = {
        nombre: nombre.value,
        dia: dia.value,
        horario: horario.value,
        id:Date.now(),
        pendiente:false
    }

    datos = [...datos,informacion];
    formulario.reset();

    mostrarInfo();
}


function mostrarInfo(){

    limpiarhtml()
    datos.forEach(dato => {
        const agregarhtml = document.createElement('div');
        agregarhtml.classList.add('item-tarea');
        agregarhtml.innerHTML = `
        ${dato.pendiente ? ( `
            <p class='completa'>${ dato.nombre }</p>
            <p class='completa'>${ dato.dia }</p>
            <p class='completa'>${ dato.horario }</p>
        `)
         :
            `
                <p>${dato.nombre}</p>
                <p>${dato.dia}</p>
                <p>${dato.horario}</p>
            `
        }
        <div class="botones">
            <button data-id='${dato.id}' class="eliminar">x</button>
            <button data-id='${dato.id}' class="completada">✔️​</button>
        </div>
        `;
        tareas.appendChild(agregarhtml)
        
    })
    
    if(datos.length < 1){
        const datosVacios = document.createElement('h2');
        datosVacios.textContent = '"SIN CLIENTES"';
        datosVacios.classList.add('datos-vacios')
        tareas.appendChild(datosVacios)
    }

    // agrega el total de clientes
    total.textContent = `Total clientes: ${datos.length}`;
    sincronizarStorage()
}


function sincronizarStorage(){
    localStorage.setItem('informacion',JSON.stringify(datos))
}


function limpiarhtml(){
    while(tareas.firstChild){
        tareas.removeChild(tareas.firstChild)
    }
}

function eliminar(e){
   if(e.target.classList.contains('eliminar')){
        const tareaID = Number(e.target.getAttribute('data-id'));
        const remover = datos.filter(dato => dato.id != tareaID);
        datos = remover
        mostrarInfo()
   }
}

function completar(e){
    if(e.target.classList.contains('completada')){
        const tareaID = Number(e.target.getAttribute('data-id'));
        
        const completar = datos.map(dato => {
            if(dato.id === tareaID){
                dato.pendiente = !dato.pendiente
                return dato
            }
            else{
                return dato
            }
        });
        mostrarInfo()
    }
    
}


