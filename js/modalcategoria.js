const url = "http://localhost:3000/categorias";
const dataTable = document.getElementById('dataTable');

document.getElementById('myForm').addEventListener('submit', function(e) {
	e.preventDefault();
	const data = {
		name: document.querySelector('input[name=name]').value
	};

	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(data => {
		displayData(data);
	})
	.catch(error => console.error(error));
});

function displayData(data) {
	const row = document.createElement('tr');
	const idCell = document.createElement('td');
	const nameCell = document.createElement('td');
	const actionsCell = document.createElement('td');
	const deleteButton = document.createElement('button');

	idCell.textContent = data.id;
	nameCell.textContent = data.name;
	deleteButton.textContent = 'Eliminar';

	deleteButton.addEventListener('click', function(e) {
		e.preventDefault();
		fetch(`${url}/${data.id}`, {
			method: 'DELETE'
		})
		.then(response => {
			if (response.ok) {
				row.remove();
			}
		})
		.catch(error => console.error(error));
	});

	actionsCell.appendChild(deleteButton);

	row.appendChild(idCell);
	row.appendChild(nameCell);
	row.appendChild(actionsCell);

	dataTable.querySelector('tbody').appendChild(row);
}

fetch(url)
.then(response => response.json())
.then(data => {
	for (let i = 0; i < data.length; i++) {
		displayData(data[i]);
	}
})
.catch(error => console.error(error));