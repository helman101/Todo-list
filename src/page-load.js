import projectModule from './project'
import todoModule from './todo'

const showButton = (object, content) => {
  const btn = document.createElement('button');
  btn.textContent = content;
  btn.addEventListener('click', show.bind(this, object));
  return btn;
}

const show = (object) => {
  object.classList.toggle('hidden');
}

const projectForm = () => {
  const form = document.createElement('form');
  form.classList.add('hidden');
  const nameLabel = createLabel('name');

  const name = createInput('name', 'text');

  const submit = document.createElement('button');
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    projectModule.createProject(name.value);
    loadProjects(projectModule.getProjectsArray());
    form.reset();
  });
  submit.textContent = 'Submit';

  form.appendChild(nameLabel);
  form.appendChild(name);
  form.appendChild(submit);

  return form;
}

const createLabel = (name) => {
  const label = document.createElement('label');
  label.setAttribute('for', `${name}`);
  let capitalized = name.charAt(0).toUpperCase();
  capitalized = capitalized.concat(name.slice(1));
  label.textContent = capitalized;

  return label;
}

const createInput = (name, type) => {
  const input = document.createElement('input');
  input.setAttribute('id', `${name}`);
  input.type = type;
  return input;
}

const todoForm = (index) => {
  const form = document.createElement('form');
  form.classList.add('hidden');
  const titleLabel = createLabel('title');
  const title = createInput('title', 'text');
  const descriptionLabel = createLabel('description');
  const description = createInput('description', 'text');
  const dueLabel = createLabel('due');
  const due = createInput('due', 'date');
  const priorityLabel = createLabel('priority');
  const priority = createInput('priority', 'number');
  const btn = createInput('Submit', 'submit');
  btn.value = 'Submit';

  btn.addEventListener('click',  (e) => {
    e.preventDefault();
    let todo = todoModule.createTodo(title.value, description.value, due.value, priority.value);
    let arr = projectModule.getProjectsArray();
    arr[index].addTodo(todo);
    loadTodo(index);
    form.reset();
  });

  form.appendChild(titleLabel);
  form.appendChild(title);
  form.appendChild(descriptionLabel);
  form.appendChild(description);
  form.appendChild(dueLabel);
  form.appendChild(due);
  form.appendChild(priorityLabel);
  form.appendChild(priority);
  form.appendChild(btn);

  return form;
}

const loadTodo = (index) => {
  let todoDiv = document.querySelector('#todo');
  let projectArr = projectModule.getProjectsArray();
  let list = projectArr[index].list;
  todoDiv.innerHTML = ''
  for (let i = 0; i < list.length; i++){
    let newDiv = document.createElement('div');
    newDiv.textContent = list[i].title;
    todoDiv.appendChild(newDiv);
  }
  const btn = document.createElement('button');
  btn.textContent = '+';
  const todo = todoForm(index);
  btn.addEventListener('click', show.bind(this, todo));
  todoDiv.appendChild(btn);
  todoDiv.appendChild(todo);
}

const loadProjects = (projects) => {
  let projectDiv = document.querySelector('#projects');
  projectDiv.innerHTML = '';
  for (let i = 0; i < projects.length; i++){
    let newDiv = document.createElement('div');
    newDiv.textContent = projects[i].name;
    newDiv.addEventListener('click', loadTodo.bind(this, i))
    projectDiv.appendChild(newDiv);
  }
}

const pageLoad = (projects) => {
  let container = document.querySelector('#container');
  let content = document.querySelector('.content');
  content.classList.add('d-flex')
  let projectDiv = document.createElement('div');
  let todoDiv = document.createElement('div');
  projectDiv.setAttribute('id', 'projects');
  todoDiv.setAttribute('id', 'todo');
  content.appendChild(projectDiv);
  content.appendChild(todoDiv);
  const form = projectForm();
  const projectButton = showButton(form, 'Project');
  loadProjects(projects);
  loadTodo(0);
  container.appendChild(projectButton);
  container.appendChild(form);
}

export default pageLoad