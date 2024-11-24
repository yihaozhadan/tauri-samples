<template>
  <div class="kanban-board">
    <div class="add-task-form">
      <input 
        v-model="newTask.title" 
        type="text" 
        placeholder="Enter task title"
        @keyup.enter="addTask"
      >
      <select v-model="newTask.status">
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="complete">Complete</option>
      </select>
      <button @click="addTask" :disabled="!newTask.title">Add Task</button>
    </div>
    <div class="columns">
      <div 
        class="column todo"
        @dragover.prevent="onDragOver($event, 'todo')"
        @drop="onDrop($event, 'todo')"
      >
        <h2>To Do</h2>
        <div class="tasks">
          <div 
            v-for="task in todoTasks" 
            :key="task.id" 
            class="task"
            draggable="true"
            @dragstart="onDragStart($event, task)"
            @dragend="onDragEnd"
            @dragenter.prevent="onDragEnter($event, task)"
          >
            <div class="task-content">
              {{ task.title }}
              <div class="task-actions">
                <button 
                  class="action-btn edit-btn" 
                  @click="editTask(task)"
                  title="Edit task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button 
                  class="action-btn delete-btn" 
                  @click="deleteTask(task)"
                  title="Delete task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        class="column in-progress"
        @dragover.prevent="onDragOver($event, 'in-progress')"
        @drop="onDrop($event, 'in-progress')"
      >
        <h2>In Progress</h2>
        <div class="tasks">
          <div 
            v-for="task in inProgressTasks" 
            :key="task.id" 
            class="task"
            draggable="true"
            @dragstart="onDragStart($event, task)"
            @dragend="onDragEnd"
            @dragenter.prevent="onDragEnter($event, task)"
          >
            <div class="task-content">
              {{ task.title }}
              <div class="task-actions">
                <button 
                  class="action-btn edit-btn" 
                  @click="editTask(task)"
                  title="Edit task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button 
                  class="action-btn delete-btn" 
                  @click="deleteTask(task)"
                  title="Delete task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        class="column complete"
        @dragover.prevent="onDragOver($event, 'complete')"
        @drop="onDrop($event, 'complete')"
      >
        <h2>Complete</h2>
        <div class="tasks">
          <div 
            v-for="task in completeTasks" 
            :key="task.id" 
            class="task"
            draggable="true"
            @dragstart="onDragStart($event, task)"
            @dragend="onDragEnd"
            @dragenter.prevent="onDragEnter($event, task)"
          >
            <div class="task-content">
              {{ task.title }}
              <div class="task-actions">
                <button 
                  class="action-btn edit-btn" 
                  @click="editTask(task)"
                  title="Edit task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button 
                  class="action-btn delete-btn" 
                  @click="deleteTask(task)"
                  title="Delete task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Task Modal -->
    <div v-if="editingTask" class="modal-overlay" @click="cancelEdit">
      <div class="modal" @click.stop>
        <h2>Edit Task</h2>
        <input 
          v-model="editingTask.title" 
          type="text" 
          placeholder="Task title"
          @keyup.enter="saveEdit"
        >
        <select v-model="editingTask.status">
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="complete">Complete</option>
        </select>
        <div class="modal-actions">
          <button class="cancel-btn" @click="cancelEdit">Cancel</button>
          <button 
            class="save-btn" 
            @click="saveEdit"
            :disabled="!editingTask.title"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'KanbanBoard',
  setup() {
    const tasks = ref([
      { id: 1, title: 'Task 1', status: 'todo', order: 0 },
      { id: 2, title: 'Task 2', status: 'todo', order: 1 },
      { id: 3, title: 'Task 3', status: 'in-progress', order: 0 },
      { id: 4, title: 'Task 4', status: 'complete', order: 0 }
    ]);
    const draggedTask = ref(null);
    const dragOverTask = ref(null);
    const newTask = ref({
      title: '',
      status: 'todo'
    });
    const editingTask = ref(null);

    const addTask = () => {
      if (!newTask.value.title) return;

      const maxId = Math.max(...tasks.value.map(task => task.id), 0);
      const columnTasks = tasks.value.filter(task => task.status === newTask.value.status);
      const order = columnTasks.length > 0 
        ? Math.max(...columnTasks.map(t => t.order)) + 1 
        : 0;

      const task = {
        id: maxId + 1,
        title: newTask.value.title,
        status: newTask.value.status,
        order: order
      };

      tasks.value.push(task);
      newTask.value.title = '';
      newTask.value.status = 'todo';
    };

    const editTask = (task) => {
      editingTask.value = { ...task };
    };

    const cancelEdit = () => {
      editingTask.value = null;
    };

    const saveEdit = () => {
      if (!editingTask.value.title) return;

      const taskIndex = tasks.value.findIndex(t => t.id === editingTask.value.id);
      if (taskIndex !== -1) {
        if (tasks.value[taskIndex].status !== editingTask.value.status) {
          const columnTasks = tasks.value.filter(task => task.status === editingTask.value.status);
          editingTask.value.order = columnTasks.length > 0 
            ? Math.max(...columnTasks.map(t => t.order)) + 1 
            : 0;
        }

        tasks.value.splice(taskIndex, 1, { ...editingTask.value });
        reorderTasks(editingTask.value.status);
      }

      editingTask.value = null;
    };

    const deleteTask = (task) => {
      if (confirm('Are you sure you want to delete this task?')) {
        const taskIndex = tasks.value.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
          tasks.value.splice(taskIndex, 1);
          reorderTasks(task.status);
        }
      }
    };

    const onDragStart = (event, task) => {
      draggedTask.value = task;
      event.target.classList.add('dragging');
    };

    const onDragEnd = (event) => {
      event.target.classList.remove('dragging');
      draggedTask.value = null;
      dragOverTask.value = null;
    };

    const onDragEnter = (event, task) => {
      if (task !== draggedTask.value) {
        dragOverTask.value = task;
      }
    };

    const onDragOver = (event, status) => {
      event.preventDefault();
      const taskElement = event.target.closest('.task');
      if (taskElement) {
        const rect = taskElement.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        taskElement.classList.toggle('drop-above', event.clientY < midY);
        taskElement.classList.toggle('drop-below', event.clientY >= midY);
      }
    };

    const reorderTasks = (status) => {
      const statusTasks = tasks.value
        .filter(task => task.status === status)
        .sort((a, b) => a.order - b.order);
      
      statusTasks.forEach((task, index) => {
        const taskIndex = tasks.value.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
          tasks.value[taskIndex].order = index;
        }
      });
    };

    const onDrop = (event, status) => {
      event.preventDefault();
      
      if (!draggedTask.value) return;

      const draggedTaskIndex = tasks.value.findIndex(task => task.id === draggedTask.value.id);
      if (draggedTaskIndex === -1) return;

      document.querySelectorAll('.task').forEach(task => {
        task.classList.remove('drop-above', 'drop-below');
      });

      const updatedTask = {
        ...tasks.value[draggedTaskIndex],
        status: status
      };

      if (draggedTask.value.status === status && dragOverTask.value) {
        const dropTaskIndex = tasks.value.findIndex(task => task.id === dragOverTask.value.id);
        if (dropTaskIndex !== -1) {
          const dropRect = event.target.getBoundingClientRect();
          const dropMiddleY = dropRect.top + dropRect.height / 2;
          
          if (event.clientY < dropMiddleY) {
            updatedTask.order = tasks.value[dropTaskIndex].order - 0.5;
          } else {
            updatedTask.order = tasks.value[dropTaskIndex].order + 0.5;
          }
        }
      } else {
        const columnTasks = tasks.value.filter(task => task.status === status);
        updatedTask.order = columnTasks.length > 0 
          ? Math.max(...columnTasks.map(t => t.order)) + 1 
          : 0;
      }

      tasks.value.splice(draggedTaskIndex, 1, updatedTask);
      reorderTasks(status);
    };

    const todoTasks = computed(() => tasks.value
      .filter(task => task.status === 'todo')
      .sort((a, b) => a.order - b.order)
    );

    const inProgressTasks = computed(() => tasks.value
      .filter(task => task.status === 'in-progress')
      .sort((a, b) => a.order - b.order)
    );

    const completeTasks = computed(() => tasks.value
      .filter(task => task.status === 'complete')
      .sort((a, b) => a.order - b.order)
    );

    return {
      tasks,
      draggedTask,
      dragOverTask,
      newTask,
      editingTask,
      addTask,
      editTask,
      cancelEdit,
      saveEdit,
      deleteTask,
      onDragStart,
      onDragEnd,
      onDragEnter,
      onDragOver,
      onDrop,
      todoTasks,
      inProgressTasks,
      completeTasks
    };
  }
}
</script>

<style scoped>
.kanban-board {
  padding: 20px;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.add-task-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 10px;
}

.add-task-form input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.add-task-form select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
}

.add-task-form button {
  padding: 8px 16px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.add-task-form button:hover {
  background-color: #1976D2;
}

.add-task-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.columns {
  display: flex;
  gap: 20px;
  height: 100%;
}

.column {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 16px;
  min-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.column h2 {
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #eee;
  color: #333;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task {
  background: white;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #eee;
  cursor: move;
  transition: all 0.2s ease;
  user-select: none;
  position: relative;
}

.task:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.task.dragging {
  opacity: 0.5;
  transform: scale(0.95);
}

.task.drop-above {
  border-top: 2px solid #2196F3;
  margin-top: -2px;
}

.task.drop-below {
  border-bottom: 2px solid #2196F3;
  margin-bottom: -2px;
}

.todo {
  border-top: 4px solid #4CAF50;
}

.in-progress {
  border-top: 4px solid #2196F3;
}

.complete {
  border-top: 4px solid #9C27B0;
}

.column.dragover {
  background-color: #f8f9fa;
}

.task-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;
}

.task-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.action-btn {
  width: 32px;
  height: 32px;
  padding: 6px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
}

.action-btn svg {
  width: 16px;
  height: 16px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  transform: translateY(-1px);
}

.edit-btn {
  color: #1976D2;
}

.edit-btn:hover {
  background-color: #e3f2fd;
  color: #1565C0;
}

.edit-btn:hover svg {
  transform: scale(1.1);
}

.delete-btn {
  color: #d32f2f;
}

.delete-btn:hover {
  background-color: #ffebee;
  color: #c62828;
}

.delete-btn:hover svg {
  transform: scale(1.1);
}

/* Tooltip styles */
.action-btn[title]:hover::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  margin-bottom: 4px;
  z-index: 1;
}

.action-btn[title]:hover::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 4px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
  margin-bottom: -4px;
  z-index: 1;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal h2 {
  margin: 0 0 16px 0;
  color: #333;
}

.modal input,
.modal select {
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.modal button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.save-btn {
  background-color: #2196F3;
  color: white;
}

.save-btn:hover {
  background-color: #1976D2;
}

.save-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
