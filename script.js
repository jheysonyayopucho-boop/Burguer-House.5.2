let carrito = 0;
let carritoProductos = [];


const botonesComprar = document.querySelectorAll(".btn-comprar");
const listacarrito = document.getElementById("lista-carrito");
const mensajevacio = document.getElementById("mensaje-vacio");
const botonVaciar = document.getElementById("vaciar-carrito");
const datosGuardados = localStorage.getItem("carrito");

if (datosGuardados) {
    carritoProductos = JSON.parse(datosGuardados);

    carrito = carritoProductos.reduce(function(total, producto) {
        return total + producto.cantidad;
    }, 0);

    document.getElementById("contador").textContent = carrito;

    actualizarCarrito();
}
botonesComprar.forEach(function(boton) {

    boton.addEventListener("click", function() {

        carrito++;

        document.getElementById("contador").textContent = carrito;
        const nombre = boton.dataset.nombre;
        const precio = boton.dataset.precio;
        const hamburguesa = {
            nombre,
            precio,
            cantidad:1


        };
        const existente = carritoProductos.find(function(producto){
            return producto.nombre=== nombre;
        });
        if (existente) {
            existente.cantidad++;
        } else {
            carritoProductos.push(hamburguesa);
        }
        localStorage.setItem(
          "carrito",
           JSON.stringify(carritoProductos)
        );
        actualizarCarrito();
        console.log(carritoProductos);
        console.log(hamburguesa);

        if (mensajevacio) {
            mensajevacio.remove();
        }
        
        console.log("producto agregado");
        
        
    });

});
function actualizarCarrito() {

    listacarrito.innerHTML = "";
    
    if  (carritoProductos.length === 0){
        const mensaje = document.createElement("p")
        mensaje.textContent = "tu carrito esta vacio.";
        listacarrito.appendChild(mensaje);
        return;
        
    }
    let total = 0;
    carritoProductos.forEach(function(producto) {

        const p = document.createElement("p");

        p.textContent =
            "🍔 " +
            producto.nombre +
            " x" +
            producto.cantidad +
            " - Bs. " +
            (producto.precio * producto.cantidad);
        total +=producto.precio*producto.cantidad;
        listacarrito.appendChild(p);

    });
    const totaltexto=document.createElement("h3");
    totaltexto.textContent="total = Bs." + total;
    listacarrito.appendChild(totaltexto);
    
}
botonVaciar.addEventListener("click", function(){
        console.log("boton vaciar precionando");
        carrito = 0;

        carritoProductos = [];
        localStorage.setItem(
          "carrito",
           JSON.stringify(carritoProductos)
        );
        document.getElementById("contador").textContent = carrito;

        actualizarCarrito();
}); 
