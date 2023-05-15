const userTable = document.getElementById('user-table');
fetch('http://localhost:3000/usuarios')
	.then(response => response.json())
	.then(data => {
		data.forEach(user => {
			const row = document.createElement('tr');

			const idCell = document.createElement('td');
			idCell.textContent = user.id;
			row.appendChild(idCell);

			const imageCell = document.createElement('td');
			const image = document.createElement('img');
			image.src = user.image;
			image.alt = user.name;
			image.style.width = '100px';
			image.style.height = '100px';
			imageCell.appendChild(image);
			row.appendChild(imageCell);

			const nameCell = document.createElement('td');
			nameCell.textContent = user.name;
			row.appendChild(nameCell);

			const numberCell = document.createElement('td');
			numberCell.textContent = user.number;
			row.appendChild(numberCell);

			const addressCell = document.createElement('td');
			addressCell.textContent = user.address;
			row.appendChild(addressCell);

			const actionsCell = document.createElement('td');
			const detailsButton = document.createElement('button');
			detailsButton.textContent = 'Detalles';
			detailsButton.addEventListener('click', () => {
				alert(`Detalles del usuario:\n\nID: ${user.id}\nNombre: ${user.name}\nNúmero: ${user.number}\nDirección: ${user.address}`);
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

	const uuserTable = document.getElementById('user-table');
	fetch('http://localhost:3000/usuarios')
		.then(response => response.json())
		.then(data => {
			data.forEach(user => {
				const row = document.createElement('tr');
	
				const idCell = document.createElement('td');
				idCell.textContent = user.id;
				row.appendChild(idCell);
	
				const imageCell = document.createElement('td');
				const image = document.createElement('img');
				image.src = user.image;
				image.alt = user.name;
				image.style.width = '100px';
				image.style.height = '100px';
				imageCell.appendChild(image);
				row.appendChild(imageCell);
	
				const nameCell = document.createElement('td');
				nameCell.textContent = user.name;
				row.appendChild(nameCell);
	
				const numberCell = document.createElement('td');
				numberCell.textContent = user.number;
				row.appendChild(numberCell);
	
				const addressCell = document.createElement('td');
				addressCell.textContent = user.address;
				row.appendChild(addressCell);
	
				const actionsCell = document.createElement('td');
				const detailsButton = document.createElement('button');
				detailsButton.textContent = 'Detalles';
				detailsButton.addEventListener('click', () => {
					alert(`Detalles del usuario:\n\nID: ${user.id}\nNombre: ${user.name}\nNúmero: ${user.number}\nDirección: ${user.address}`);
				});
				actionsCell.appendChild(detailsButton);
	
				const deleteButton = document.createElement('button');
				deleteButton.textContent = 'Borrar';
				deleteButton.addEventListener('click', () => {
					if (confirm('¿Estás seguro de que deseas borrar este usuario?')) {
						fetch(`http://localhost:3000/usuarios/${user.id}`, {
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