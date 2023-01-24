// Array para el carrito de compras
const carrito = []

// Ordenar productos de menor a mayor
const ordenarMenorMayor = () => {
    productos.sort((a, b) => a.precio - b.precio)
    mostrarListaOrdenada()
};

// Ordenar productos de mayor a menor
//El método sort() ordena los elementos de un arreglo (array) localmente y devuelve el arreglo ordenado.
const ordenarMayorMenor = () => {
    productos.sort((a, b) => b.precio - a.precio)
    mostrarListaOrdenada()
};
// //Con el metodo map vamos a obtener el nombre del producto y el precio del producto
const mostrarListaOrdenada = () => {
    const listaDeProductos = productos.map(producto => {
        return '- '+producto.nombre+' $'+producto.precio
    })
    alert('Lista de precios:'+'\n\n'+listaDeProductos.join('\n'))
    comprarProductos(listaDeProductos)
};

const comprarProductos = (listaDeProductos) => {
    let productoNombre = ''
    let productoCantidad = 0
    let otroProducto = false

    do {
        productoNombre = prompt('¿Qué producto desea comprar?'+'\n\n'+listaDeProductos.join('\n'))
        productoCantidad = parseInt(prompt('¿Cuántos queres comprar?'))

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            alert('El producto no se encuentra en el catálogo!')
        }

        otroProducto = confirm('Desea agregar otro producto?')
    } while (otroProducto);

    confirmarCompra()
};
const agregarAlCarrito = (producto, productoId, productoCantidad) => {
  const productoRepetido = carrito.find(producto => producto.id === productoId)
  if (!productoRepetido){
    producto.cantidad += productoCantidad
    carrito.push(producto)
  } else {
    productoRepetido.cantidad += productoCantidad
  }
  console.log (carrito)
};

const elimanarProductoCarrito = (nombreproductoAElinar) => {
carrito.forEach((producto, index) => {
  if (producto.nombre.toLowerCase()===nombreproductoAElinar){
    if (producto.cantidad > 1){
        producto.cantidad--
    } else{
      carrito.splice(index, 1)
    }
  }
})
confirmarCompra()
};

const confirmarCompra = () => {
  const listaProductos = carrito.map(producto =>{
    return '- '+producto.nombre+'/ cantidad:'+producto.cantidad

  })
  const isCheckout = confirm('Checkout: '
  +'\n\n'+listaProductos.join('\n')
  +'\n\nPara continuar presione "Acptar" sino "Cancelar" para eliminar el producto del carrito'
  )
if (isCheckout) {
finalizarCompra(listaProductos)
}else {
  const nombreproductoAElinar = ('Ingrese el nombre del producto a elimnar')
  elimanarProductoCarrito(nombreproductoAElinar)
}
};

const finalizarCompra = (listaProductos) =>{
  const cantidadTotal = carrito.reduce((acc, item)=> acc + item.cantidad)
  const precioTotal = carrito.reduce((acc, item)=> acc + (item.cantidad * item.precio),0)
  alert('Detalle de su compra : '
  +'\n\n'+listaProductos.join('\n')
  +'\n\nTotal de productos: '+cantidadTotal
  +'\n\nTotal de su compra: '+precioTotal
  +'\n\nGracias por su compra!'
  )
}
  const comprar = () => {
    const productosBaratos = confirm('¿Queres ordenar la lista de productos del mas barato al mas caro');
    if (productosBaratos) {
      ordenarMenorMayor();
    } else {
      ordenarMayorMenor();
    }
}


comprar()