function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskDate = document.getElementById('taskDate');
    var taskImportance = document.getElementById('taskImportance');
    var taskList = document.getElementById('taskList');
  
    if (taskInput.value.trim() !== '') {
      var newTask = document.createElement('li');
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', function() {
        toggleCompleted(this);
      });
      newTask.appendChild(checkbox);
      
      var taskText = document.createElement('span');
      taskText.textContent = taskInput.value + " - " + taskDate.value;
      newTask.appendChild(taskText);
  
      newTask.classList.add(taskImportance.value);
      
      taskList.appendChild(newTask);
      taskInput.value = '';
      taskDate.value = '';
    } else {
      alert('Please enter a task!');
    }
  }
  
  function toggleCompleted(checkbox) {
    var taskText = checkbox.nextSibling;
    if (checkbox.checked) {
      taskText.classList.add('completed');
    } else {
      taskText.classList.remove('completed');
    }
  }
  