//Variables
const presupuestoDeUsuario = prompt('Cual es tu presupuesto (mensual, semanal, vos tranqui)');
const formulario = document.getElementById('formulario');
let cantidadPresupuesto;
/*--------------------------------------------------------*/ 
//Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    if (presupuestoDeUsuario === null || presupuestoDeUsuario === '') {
        window.location.reload();
    } else {
        //Instanciar la clase de presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoDeUsuario);
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    //Leer los gastos
    const nombreCompra = document.getElementById('compra').value;
    const precioCompra = document.getElementById('precio').value;
    // Instanciar la interfaz
    const ui = new Interfaz();
    if (nombreCompra === '' || precioCompra === '') {
        ui.imprimirMensaje('Hubo un error', 'error');
    } else {
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.presupuestoRestante(precioCompra);
        ui.agregarGastoListado(nombreCompra,precioCompra);
    }

} )

/*--------------------------------------------------------*/ 
//Clases
    class Presupuesto{
        constructor(presupuesto){
            this.presupuesto = Number(presupuesto);
            this.restante = Number(presupuesto);
        }
        presupuestoRestante(cantidad = 0){
            return this.restante -= Number(cantidad);
        }
    }
//clase de nterfaz de usuario
    class Interfaz{
        insertarPresupuesto(cantidad){
            const presupuestoH3 = document.getElementById('presupuestoh3');
            const restanteH3 = document.getElementById('restante');
            presupuestoH3.innerHTML = `Presupuesto: $${cantidad}`;
            restanteH3.innerHTML = `Restante: $${cantidad}`;
        }
        imprimirMensaje(mensaje, tipo){
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('text-center', 'alert' , 'mensajito');
            if(tipo === 'error') {
                divMensaje.classList.add('alert-danger');
           } else {
                divMensaje.classList.add('alert-success');
           }
            divMensaje.appendChild(document.createTextNode(mensaje));
            document.querySelector('.primario').insertBefore(divMensaje, formulario);
            setTimeout(function () {
                document.querySelector('.mensajito').remove();
                formulario.reset();
            }, 1500);
        }
        agregarGastoListado(nombreCompra, cantidad){
            const gastoListado = document.querySelector('.gastos');
            //Crear las listas
            const li = document.createElement('li');
            li.className = 'list-group-item col-md-11  ';
            //Insertamos el gasto
               
               li.innerHTML = `${nombreCompra} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span> `;
               gastoListado.appendChild(li);
        }
        presupuestoRestante(cantidad){
            const restante = document.querySelector('#restante');
            //Leer el presupuesto restante
            const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
            restante.innerHTML = `Restante: $${presupuestoRestanteUsuario}`;
            this.comprobarPresupuestoColor();
        }
        comprobarPresupuestoColor(){
            const presupuestoTotal = cantidadPresupuesto.presupuesto;
            const presupuestoRestante = cantidadPresupuesto.restante;
            //Comprobar el 25% de gasto restanto o el 50%
            if ((presupuestoTotal / 4) > presupuestoRestante)  {
                const restante = document.querySelector('.restante');
                restante.classList.remove('alert-success', 'alert-warning');
               restante.classList.add('alert-danger');
            } else if( (presupuestoTotal / 2) > presupuestoRestante) {
                const restante = document.querySelector('.restante');
                restante.classList.remove('alert-success');
                restante.classList.add('alert-warning');
           }
        }
        mostrarMensaje(mensaje, tipo){
            const divMensaje = document.createElement('div');
            div.classList.add('text-center', 'alert');
            if (tipo === 'error') {
                divMensaje.classList.add('alert-danger');
            } else {
                divMensaje.classList.add('alert-success');
            }
            divMensaje.appendChild(document.createTextNode(mensaje));
            
        }
    }
