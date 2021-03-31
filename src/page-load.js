import projectModule from './project'

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

const todoForm = () => {
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

  form.appendChild(titleLabel);
  form.appendChild(title);
  form.appendChild(descriptionLabel);
  form.appendChild(description);
  form.appendChild(dueLabel);
  form.appendChild(due);
  form.appendChild(priorityLabel);
  form.appendChild(priority);

  return form;
}

const loadProjects = (projects) => {
  let container = document.querySelector('#projects');
  container.innerHTML = '';
  for (let i = 0; i < projects.length; i++){
    let newDiv = document.createElement('div');
    newDiv.textContent = projects[i].name;
    container.appendChild(newDiv);
  }
}

const pageLoad = (projects) => {
  let container = document.querySelector('#container');
  let projectDiv = document.createElement('div');
  projectDiv.setAttribute('id', 'projects');
  container.appendChild(projectDiv)
  const form = projectForm();
  const projectButton = showButton(form, 'Project');
  const todo = todoForm();
  const todoButton = showButton(todo, 'Todo');
  loadProjects(projects);
  container.appendChild(projectButton);
  container.appendChild(form);
  container.appendChild(todoButton);
  container.appendChild(todo);
}

export default pageLoad