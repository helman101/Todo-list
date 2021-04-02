import project from './project';
import todo from './todo';
import storageModule from './storage';

const show = (object) => {
  object.classList.toggle('hidden');
};

const showButton = (object, content) => {
  const btn = document.createElement('button');
  btn.textContent = content;
  btn.addEventListener('click', show.bind(this, object));
  return btn;
};

const createLabel = (name) => {
  const label = document.createElement('label');
  label.setAttribute('for', `${name}`);
  let capitalized = name.charAt(0).toUpperCase();
  capitalized = capitalized.concat(name.slice(1));
  label.textContent = capitalized;

  return label;
};

const createInput = (name, type) => {
  const input = document.createElement('input');
  input.setAttribute('id', `${name}`);
  input.classList.add('m-bot-10');
  input.type = type;
  return input;
};

const setWhiteBg = () => {
  const div = document.querySelectorAll('#projects div');
  for (let i = 0; i < div.length; i += 1) {
    div[i].classList.remove('selected');
  }
};

const setActive = () => {
  const projects = project.getProjectsArray();
  for (let i = 0; i < projects.length; i += 1) {
    projects[i].active = false;
  }
};

const pickColor = (number) => {
  const colors = ['red', 'blue', 'yellow', 'black'];
  return colors[number - 1];
};

const loadTodoInfo = (list, i, parent) => {
  const todo = list[i];
  if (parent.querySelector('.expanded')) {
    const expanded = parent.querySelector('.expanded');
    parent.removeChild(expanded);
  } else {
    const div = document.createElement('div');
    div.classList.add('expanded');
    const editBtn = document.createElement('button');
    editBtn.addEventListener('click', edit.bind(this, list, i, parent)); // eslint-disable-line
    editBtn.textContent = 'Edit';
    const todoKeys = Object.keys(todo);
    const todoValues = Object.values(todo);
    for (let i = 0; i < todoKeys.length; i += 1) {
      if (todoKeys[i] !== 'title' && todoKeys[i] !== 'priority' && todoKeys[i] !== 'edit') {
        const head = document.createElement('p');
        head.classList.add('bold');
        const p = document.createElement('p');
        p.classList.add('m-bot-10');
        head.textContent = `${todoKeys[i]}: `;
        p.textContent = `${todoValues[i]}`;
        div.appendChild(head);
        div.appendChild(p);
      }
    }
    div.appendChild(editBtn);
    parent.appendChild(div);
  }
};

const loadTodo = (list, index) => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('m-bot-10');
  const wrapper = document.createElement('div');
  wrapper.classList.add('d-flex');
  const todoTitle = document.createElement('p');
  const deleteTodoBtn = document.createElement('button');
  deleteTodoBtn.classList.add('delete');
  deleteTodoBtn.textContent = '-';
  deleteTodoBtn.addEventListener('click', () => {
    todo.deleteTodo(list, index);
    newDiv.parentNode.removeChild(newDiv);
    storageModule.saveLocal();
  });
  const priority = document.createElement('div');
  priority.classList.add('priority');
  priority.style.backgroundColor = pickColor(list[index].priority);
  todoTitle.classList.add('pointer');
  todoTitle.textContent = list[index].title;
  todoTitle.addEventListener('click', loadTodoInfo.bind(this, list, index, newDiv));
  wrapper.appendChild(deleteTodoBtn);
  wrapper.appendChild(priority);
  wrapper.appendChild(todoTitle);
  newDiv.appendChild(wrapper);
  return newDiv;
};

const loadAllTodos = (index) => {
  const todoDiv = document.querySelector('#todo');
  const projectArr = project.getProjectsArray();
  todoDiv.innerHTML = '';

  if (projectArr.length === 0) { return; }

  const { list } = projectArr[index];
  for (let i = 0; i < list.length; i += 1) {
    const newDiv = loadTodo(list, i);
    todoDiv.appendChild(newDiv);
  }
  const btn = document.createElement('button');
  btn.classList.add('add');
  btn.setAttribute('id', index);
  btn.textContent = '+';
  btn.addEventListener('click', () => {
    const todo = document.querySelector('.todo-form');
    todo.setAttribute('id', index);
    const title = todo.querySelector('h3');
    title.textContent = `New ${projectArr[index].name} Todo`;
    show(todo);
  });
  todoDiv.appendChild(btn);
};

const loadProjects = (projects, active = 0) => {
  const projectDiv = document.querySelector('#projects');
  projectDiv.innerHTML = '';
  for (let i = 0; i < projects.length; i += 1) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('d-flex');
    projects[i].active = false;
    if (i === active) {
      projects[i].active = true;
    }
    const projectSpan = document.createElement('p');
    projectSpan.classList.add('project');
    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.classList.add('delete');
    deleteProjectBtn.textContent = 'X';
    deleteProjectBtn.addEventListener('click', () => {
      if (projects[i].active) {
        project.deleteProject(i);
        projectDiv.removeChild(newDiv);
        loadAllTodos(0);
      } else {
        project.deleteProject(i);
        loadProjects(projects, project.getActive());
      }
      storageModule.saveLocal();
    });
    projectSpan.classList.add('pointer');
    projectSpan.textContent = projects[i].name;
    projectSpan.addEventListener('click', () => {
      const todo = document.querySelector('.todo-form');
      todo.classList.add('hidden');
      loadAllTodos(i);
      setActive();
      setWhiteBg();
      newDiv.classList.add('selected');
      projects[i].active = true;
    });
    newDiv.appendChild(deleteProjectBtn);
    newDiv.appendChild(projectSpan);
    projectDiv.appendChild(newDiv);
  }
};


const todoFields = (t = '', desc = '', dueDate = '', pr = '') => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('d-flex', 'flex-column');
  const formTitle = document.createElement('h3');
  formTitle.classList.add('m-bot-10', 'bold', 'title');
  const titleLabel = createLabel('title');
  const title = createInput('title', 'text');
  title.value = t;
  const descriptionLabel = createLabel('description');
  const description = createInput('description', 'text');
  description.value = desc;
  const dueLabel = createLabel('due');
  const due = createInput('due', 'date');
  due.value = dueDate;
  const priorityLabel = createLabel('priority');
  const priority = createInput('priority', 'range');
  priority.value = pr;
  priority.max = 4;
  priority.min = 1;

  wrapper.appendChild(formTitle);
  wrapper.appendChild(titleLabel);
  wrapper.appendChild(title);
  wrapper.appendChild(descriptionLabel);
  wrapper.appendChild(description);
  wrapper.appendChild(dueLabel);
  wrapper.appendChild(due);
  wrapper.appendChild(priorityLabel);
  wrapper.appendChild(priority);

  return wrapper;
};

const todoForm = () => {
  const form = document.createElement('form');
  form.classList.add('hidden', 'todo-form');
  const formStructure = todoFields();
  const btn = createInput('Submit', 'submit');
  btn.value = 'Submit';

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = form.querySelector('#title');
    const desc = form.querySelector('#description');
    const due = form.querySelector('#due');
    const priority = form.querySelector('#priority');
    const newtodo = todo.createTodo(title.value, desc.value, due.value, priority.value);
    const arr = project.getProjectsArray();
    const index = form.id;
    arr[index].addTodo(newtodo);
    loadAllTodos(index);
    form.reset();
    storageModule.saveLocal();
  });

  formStructure.appendChild(btn);
  form.appendChild(formStructure);

  return form;
};

const editForm = (list, i, element) => {
  const form = document.createElement('form');
  form.classList.add('todo-form');
  const formStructure = todoFields(
    list[i].title,
    list[i].description,
    list[i].dueDate,
    list[i].priority,
  );
  const btn = createInput('Submit', 'submit');
  btn.value = 'Submit';

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = form.querySelector('#title');
    const desc = form.querySelector('#description');
    const due = form.querySelector('#due');
    const priority = form.querySelector('#priority');
    list[i].edit(title.value, desc.value, due.value, priority.value);
    const edited = loadTodo(list, i);
    element.parentNode.insertBefore(edited, element);
    element.parentNode.removeChild(element);
    loadTodoInfo(list, i, edited);
    storageModule.saveLocal();
  });

  formStructure.appendChild(btn);
  form.appendChild(formStructure);

  return form;
};

const edit = (list, i, parent) => {
  const expanded = parent.querySelector('.expanded');
  expanded.innerHTML = '';
  const form = editForm(list, i, parent);
  expanded.appendChild(form);
};

const projectForm = () => {
  const form = document.createElement('form');
  const wrapper = document.createElement('div');
  wrapper.classList.add('d-flex', 'flex-column');
  form.classList.add('hidden');
  const formTitle = document.createElement('h3');
  formTitle.textContent = 'New Project';
  formTitle.classList.add('m-bot-10', 'bold', 'title');
  const nameLabel = createLabel('name');
  const name = createInput('name', 'text');

  const submit = document.createElement('button');
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    project.createProject(name.value);
    const arr = project.getProjectsArray();
    loadProjects(arr, arr.length - 1);
    loadAllTodos(arr.length - 1);
    form.reset();
    form.classList.add('hidden');
    const todoForm = form.nextElementSibling;
    todoForm.classList.add('hidden');
    storageModule.saveLocal();
  });
  submit.textContent = 'Submit';

  wrapper.appendChild(formTitle);
  wrapper.appendChild(nameLabel);
  wrapper.appendChild(name);
  wrapper.appendChild(submit);
  form.appendChild(wrapper);

  return form;
};

const pageLoad = (projects) => {
  const container = document.querySelector('#container');
  const content = document.querySelector('.content');
  content.classList.add('d-flex');
  const projectDiv = document.createElement('div');
  const todoDiv = document.createElement('div');
  const formDiv = document.createElement('div');
  formDiv.classList.add('forms', 'absolute');
  projectDiv.setAttribute('id', 'projects');
  projectDiv.classList.add('projects');
  todoDiv.setAttribute('id', 'todo');
  todoDiv.classList.add('todo');
  content.appendChild(projectDiv);
  content.appendChild(todoDiv);
  const form = projectForm();
  const todo = todoForm();
  const projectButton = showButton(form, 'Project');
  projectButton.classList.add('fixed', 'projectBtn', 'pointer');
  container.appendChild(projectButton);
  formDiv.appendChild(form);
  formDiv.appendChild(todo);
  container.appendChild(formDiv);
  loadProjects(projects);
  loadAllTodos(0);
};

export default pageLoad;