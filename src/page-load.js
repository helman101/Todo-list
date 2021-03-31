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
    const arr = projectModule.getProjectsArray();
    loadProjects(arr, arr.length-1);
    loadTodo(arr.length-1);
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
  todoDiv.innerHTML = ''

  if(projectArr.length === 0){ return }
  
  let list = projectArr[index].list;
  for (let i = 0; i < list.length; i++){
    let newDiv = document.createElement('div');
    let todoSpan = document.createElement('span');
    let deleteTodoBtn = document.createElement('button');

    deleteTodoBtn.textContent = '-';
    deleteTodoBtn.addEventListener('click', () => {
      todoModule.deleteTodo(list, i);
      loadTodo(index);
    })

    todoSpan.textContent = list[i].title;
    newDiv.appendChild(todoSpan)
    newDiv.appendChild(deleteTodoBtn)
    todoDiv.appendChild(newDiv);
  }
  const btn = document.createElement('button');
  btn.textContent = '+';
  const todo = todoForm(index);
  btn.addEventListener('click', show.bind(this, todo));
  todoDiv.appendChild(btn);
  todoDiv.appendChild(todo);
}

const loadProjects = (projects, active = 0) => {
  let projectDiv = document.querySelector('#projects');
  projectDiv.innerHTML = '';
  for (let i = 0; i < projects.length; i++){
    let newDiv = document.createElement('div');
    projects[i].active = false;
    if (i === active) {
      projects[i].active = true;
    }
    let projectSpan = document.createElement('span');
    let deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.textContent = '-'
    deleteProjectBtn.addEventListener('click', () => {
      if (projects[i].active) {
        projectModule.deleteProject(i);
        loadProjects(projects);
        loadTodo(0);
      }
      else {
        projectModule.deleteProject(i);
        loadProjects(projects, projectModule.getActive());
      }
    })
    projectSpan.textContent = projects[i].name;
    projectSpan.addEventListener('click', function() {
      loadTodo(i);
      setActive();
      projects[i].active = true;
    });
    newDiv.appendChild(deleteProjectBtn);
    newDiv.appendChild(projectSpan);
    projectDiv.appendChild(newDiv);
  }
}

const setActive = () => {
  const projects = projectModule.getProjectsArray();
  for (let i = 0; i < projects.length; i++) {
    projects[i].active = false;
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