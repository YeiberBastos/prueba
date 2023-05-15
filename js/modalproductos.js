// Hacer una solicitud a un servidor para obtener los datos en formato JSON
fetch("http://localhost:3000/productos")
  .then(response => response.json())
  .then(data => {
    // Crear una variable para almacenar los datos de los productos
    let productos = "";

    // Recorrer los datos y agregarlos a la variable
    data.forEach(producto => {
      productos += `
        <tr>
          <td>${producto.registrar}</td>
          <td>${producto.id}</td>
          <td>${producto.categoria}</td>
          <td>${producto.producto}</td>
          <td>${producto.precio}</td>
          <td><button onclick="borrarProducto(${producto.id})">Borrar</button></td>
        </tr>
      `;
    });

    // Agregar los datos de los productos a la tabla HTML
    document.getElementById("tablaProductos").innerHTML = productos;
  })
  .catch(error => console.error(error));

// Función para borrar un producto
function borrarProducto(id) {
  // Hacer una solicitud al servidor para borrar el producto con el ID dado
  fetch(`http://localhost:3000/productos/${id}`, { method: "DELETE" })
    .then(response => {
      if (response.ok) {
        // Actualizar la tabla HTML
        fetch("http://localhost:3000/productos")
          .then(response => response.json())
          .then(data => {
            let productos = "";
            data.forEach(producto => {
              productos += `
                <tr>
                  <td>${producto.registrar}</td>
                  <td>${producto.id}</td>
                  <td>${producto.categoria}</td>
                  <td>${producto.producto}</td>
                  <td>${producto.precio}</td>
                  <td><button onclick="borrarProducto(${producto.id})">Borrar</button></td>
                </tr>
              `;
            });
            document.getElementById("tablaProductos").innerHTML = productos;
          })
          .catch(error => console.error(error));
      }
    })
    .catch(error => console.error(error));
}