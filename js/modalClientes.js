const API_URL = 'http://localhost:3000/Clientes';

// Función para mostrar la imagen seleccionada en el formulario
function previewImage(event) {
  const file = event.target.files[0];
  const preview = document.getElementById('preview');

  if (file) {
    const reader = new FileReader();

    reader.addEventListener('load', function() {
      preview.innerHTML = `<img src="${reader.result}" alt="Preview">`;
    });

    reader.readAsDataURL(file);
  }
}

// Función para agregar un nuevo cliente
function addClient(event) {
  event.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const photo = document.getElementById('photo').files[0];

  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('photo', photo);

  fetch(API_URL, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(client => {
    displayClient(client);
    document.getElementById('addClientForm').reset();
    document.getElementById('preview').innerHTML = '';
  })
  .catch(error => console.error(error));
}

// Función para mostrar un cliente en la tabla
function displayClient(client) {
  const row = document.createElement('tr');
  const firstNameCell = document.createElement('td');
  const lastNameCell = document.createElement('td');
  const photoCell = document.createElement('td');
  const photo = document.createElement('img');
  const actionsCell = document.createElement('td');
  const deleteButton = document.createElement('button');

  firstNameCell.textContent = client.firstName;
  lastNameCell.textContent = client.lastName;
  photo.src = client.photo;
  photo.alt = `Foto de ${client.firstName} ${client.lastName}`;
  deleteButton.textContent = 'Eliminar';

  deleteButton.addEventListener('click', function() {
    fetch(`${API_URL}/${client.id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        row.remove();
      }
    })
    .catch(error => console.error(error));
  });

  firstNameCell.appendChild(photo);
  photoCell.appendChild(photo);
  actionsCell.appendChild(deleteButton);

  row.appendChild(firstNameCell);
  row.appendChild(lastNameCell);
  row.appendChild(photoCell);
  row.appendChild(actionsCell);

  document.getElementById('clientsTable').querySelector('tbody').appendChild(row);
}

// Cargar clientes al cargar la página
fetch(API_URL)
  .then(response => response.json())
  .then(clients => {
    clients.forEach(client => displayClient(client));
  })
  .catch(error => console.error(error));

// Asociar funciones a eventos
document.getElementById('photo').addEventListener('change', previewImage);
document.getElementById('addClientForm').addEventListener('submit', addClient);