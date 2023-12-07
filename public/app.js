fetch('/character')
	.then(res => res.json())
	.then(updateCharacter)
	.catch(e => console.log(e));

function updateCharacter(data) {
	const tableBody = document.querySelector('#characterLevels');

	tableBody.innerHTML = '';

	data.classes.forEach(progression => {
		const row = document.createElement('tr');

		const levelCell = document.createElement('td');
		levelCell.textContent = progression.level;
		row.appendChild(levelCell);

		const classCell = document.createElement('td');
		classCell.textContent = progression.class;
		row.appendChild(classCell);

		tableBody.appendChild(row);
	});
}

const levelUpBtn = document.querySelector('#levelUpBtn');
const levelDownBtn = document.querySelector('#levelDownBtn');
const selectedClassDropdown = document.querySelector('#selectedClass');

levelUpBtn.addEventListener('click', function (e) {
	e.preventDefault();
	fetch('/levelup', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({ selectedClass: selectedClassDropdown.value })
	})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			return fetch('/character');
		})
		.then(res => res.json())
		.then(updateCharacter)
		.catch(e => console.log(e));
});

levelDownBtn.addEventListener('click', function (e) {
	e.preventDefault();
	fetch('/leveldown', { method: 'DELETE' })
		.then(res => res.json())
		.then(data => {
			console.log(data);
			return fetch('/character');
		})
		.then(res => res.json())
		.then(updateCharacter)
		.catch(e => console.log(e));
});
