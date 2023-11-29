fetch('/character')
    .then(res => res.json())
    .then(updateCharacter)
    .catch(e => console.log(e));

function updateCharacter(data) {
    const tableBody = document.querySelector('#characterLevels');

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