document.addEventListener('DOMContentLoaded', function() {
    const showNoteInputBtn = document.getElementById('show-note-input');
    const showResourceInputBtn = document.getElementById('show-resource-input');
    const showProjectInputBtn = document.getElementById('show-project-input');

    const noteInputs = document.getElementById('note-inputs');
    const resourceInputs = document.getElementById('resource-inputs');
    const projectInputs = document.getElementById('project-inputs');

    showNoteInputBtn.addEventListener('click', function() {
        noteInputs.style.display = 'block';
    });

    showResourceInputBtn.addEventListener('click', function() {
        resourceInputs.style.display = 'block';
    });

    showProjectInputBtn.addEventListener('click', function() {
        projectInputs.style.display = 'block';
    });

    const addNoteBtn = document.getElementById('add-note-btn');
    const addResourceBtn = document.getElementById('add-resource-btn');
    const addProjectBtn = document.getElementById('add-project-btn');

    addNoteBtn.addEventListener('click', function() {
        const noteHeadingInput = document.getElementById('note-heading');
        const noteContentInput = document.getElementById('note-content');
        const notesList = document.getElementById('notes-list');

        const noteHeading = noteHeadingInput.value.trim();
        const noteContent = noteContentInput.value.trim();

        if (noteHeading && noteContent) {
            const listItem = document.createElement('li');
            const headingElement = document.createElement('h3');
            const contentElement = document.createElement('p');
            const deleteIcon = document.createElement('span');

            headingElement.textContent = noteHeading;
            contentElement.textContent = noteContent;
            deleteIcon.innerHTML = '&#x274C;'; // Unicode for cross mark
            deleteIcon.classList.add('delete-icon'); // Add class for styling

            listItem.appendChild(headingElement);
            listItem.appendChild(deleteIcon);
            listItem.appendChild(contentElement);
            notesList.appendChild(listItem);

            // Clear input fields after adding note
            noteHeadingInput.value = '';
            noteContentInput.value = '';

            // Hide input fields
            noteInputs.style.display = 'none';

            // Delete functionality
            deleteIcon.addEventListener('click', function() {
                listItem.remove();
            });
        }
    });

    addResourceBtn.addEventListener('click', function() {
        const resourceInput = document.getElementById('resource-input');
        const resourcesList = document.getElementById('resources-list');
        const resource = resourceInput.value.trim();

        if (resource) {
            const listItem = document.createElement('li');
            const deleteIcon = document.createElement('span');

            listItem.textContent = resource;
            deleteIcon.innerHTML = '&#x274C;'; // Unicode for cross mark
            deleteIcon.classList.add('delete-icon'); // Add class for styling

            listItem.appendChild(deleteIcon);
            resourcesList.appendChild(listItem);

            // Clear input field after adding resource
            resourceInput.value = '';

            // Hide input fields
            resourceInputs.style.display = 'none';

            // Delete functionality
            deleteIcon.addEventListener('click', function() {
                listItem.remove();
            });
        }
    });

    addProjectBtn.addEventListener('click', function() {
        const projectInput = document.getElementById('project-input');
        const projectsList = document.getElementById('projects-list');
        const project = projectInput.value.trim();

        if (project) {
            const listItem = document.createElement('li');
            const deleteIcon = document.createElement('span');

            listItem.textContent = project;
            deleteIcon.innerHTML = '&#x274C;'; // Unicode for cross mark
            deleteIcon.classList.add('delete-icon'); // Add class for styling

            listItem.appendChild(deleteIcon);
            projectsList.appendChild(listItem);

            // Clear input field after adding project
            projectInput.value = '';

            // Hide input fields
            projectInputs.style.display = 'none';

            // Delete functionality
            deleteIcon.addEventListener('click', function() {
                listItem.remove();
            });
        }
    });
});

