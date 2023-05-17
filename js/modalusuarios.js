const userTable = document.getElementById('user-table');
fetch('http://localhost:3000/users')
	.then(response => response.json())
	.then(data => {
		data.forEach(user => {
			const row = document.createElement('tr');

			const idCell = document.createElement('td');
			idCell.textContent = user.id;
			row.appendChild(idCell);

			const NombreCell = document.createElement('td');
			NombreCell.textContent = user.Nombre;
			row.appendChild(NombreCell);

			const passwordCell = document.createElement('td');
			passwordCell.textContent = user.password;
			row.appendChild(passwordCell);

			const EmailCell = document.createElement('td');
			EmailCell.textContent = user.Email;
			row.appendChild(EmailCell);

			const actionsCell = document.createElement('td');
			const detailsButton = document.createElement('button');
			detailsButton.textContent = 'Detalles';
			detailsButton.addEventListener('click', () => {
				alert(`Detalles del usuario:\n\nID: $user.id}\nNombre: ${user.name}\nNúmero: ${user.number}\n{Dirección: ${user.address}`);
			});
			actionsCell.appendChild(detailsButton);

			const deleteButton = document.createElement('button');
			deleteButton.textContent = 'Borrar';
			deleteButton.addEventListener('click', () => {
				if (confirm('¿Estás seguro de que deseas borrar este usuario?')) {
					fetch(`http://localhost:3000/users/${user.id}`, {
						method: 'DELETE'
					})
					.then(() => {
						row.remove();
					})
					.catch(error => {
						console.error('Error al borrar usuario:', error);
					});
				}
			});
			actionsCell.appendChild(deleteButton);

			row.appendChild(actionsCell);

			userTable.querySelector('tbody').appendChild(row);
		});
	})
	.catch(error => {
		console.error('Error al obtener usuarios:', error);
	});
