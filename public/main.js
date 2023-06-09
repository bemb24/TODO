document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = taskInput.value;

        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Tarea creada exitosamente') {
                taskList.innerHTML += `<li><span>${task}</span> <button class="delete">Eliminar</button></li>`;
                taskInput.value = '';
            }
        })
        .catch(error => console.error('Error:', error));
    });

    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(data => {
            data.tasks.forEach(task => {
                taskList.innerHTML += `<li><span>${task}</span> <button class="delete">Eliminar</button></li>`;
            });
        })
        .catch(error => console.error('Error:', error));

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const taskItem = e.target.parentElement;
            const task = taskItem.querySelector('span').textContent;

            fetch('http://localhost:3000/tasks', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Tarea eliminada exitosamente') {
                    taskItem.remove();
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });
});