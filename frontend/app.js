const apiUrl = 'http://localhost:3000/tasks';

async function loadTasks() {
  const response = await fetch(apiUrl);
  const tasks = await response.json();

  tasks.forEach(task => {
    createTask(task);
  });
}

function createTask({ title, category, description, status, _id }) {
  const column = document.getElementById(`tasks-${status}`);
  const taskCard = document.createElement('div');
  taskCard.classList.add('task-card');
  taskCard.innerHTML = `
    <h6>${title}</h6>
    <p>${category}</p>
    <p>${description}</p>
    <button onclick="deleteTask('${_id}')" class="btn btn-sm btn-danger">Eliminar</button>
  `;
  column.appendChild(taskCard);
}

async function deleteTask(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  location.reload();
}

document.getElementById('save-task-btn').addEventListener('click', async () => {
  const task = {
    title: document.getElementById('task-title').value,
    category: document.getElementById('task-category').value,
    description: document.getElementById('task-desc').value,
    status: 'pending',
  };

  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  location.reload();
});

loadTasks();
