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
  const formTitle = document.createElement('h3');
  formTitle.textContent = 'New Project';
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
    projectModule.saveLocal();
  });
  submit.textContent = 'Submit';

  form.appendChild(formTitle);
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
  form.classList.add('hidden', 'todo-form');
  const formTitle = document.createElement('h3');
  formTitle.textContent = 'New ToDo';
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
    const index = form.id;
    arr[index].addTodo(todo);
    loadTodo(index);
    form.reset();
    projectModule.saveLocal();
  });

  form.appendChild(formTitle);
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

const loadTodoInfo = (todo, parent) => {
  if (parent.querySelector('.expanded')){
    let expanded = parent.querySelector('.expanded');
    parent.removeChild(expanded);
  } else {
    let div = document.createElement('div');
    div.classList.add('expanded');
    for (let elem in todo) {
      if (elem !== 'title') {
        let head = document.createElement('strong');
        let span = document.createElement('span');
        head.textContent = `${elem}: `;
        span.textContent = `${todo[elem]}`;
        div.appendChild(head);
        div.appendChild(span);
      }
    }
    parent.appendChild(div);
  }
}

const loadTodo = (index) => {

  let todoDiv = document.querySelector('#todo');
  let projectArr = projectModule.getProjectsArray();
  const forms = document.querySelector('.forms');
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
      projectModule.saveLocal();
    })
    todoSpan.classList.add('pointer');
    todoSpan.textContent = list[i].title;
    todoSpan.addEventListener('click', loadTodoInfo.bind(this, list[i], newDiv))
    newDiv.appendChild(todoSpan)
    newDiv.appendChild(deleteTodoBtn)
    todoDiv.appendChild(newDiv);
  }
  const btn = document.createElement('button');
  btn.setAttribute('id', index);
  btn.textContent = '+';
  btn.addEventListener('click', () => {
    const todo = document.querySelector(".todo-form");
    todo.setAttribute('id', index);
    show(todo);
  });
  todoDiv.appendChild(btn);
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
      projectModule.saveLocal();
    })
    projectSpan.classList.add('pointer');
    projectSpan.textContent = projects[i].name;
    projectSpan.addEventListener('click', function() {
      const todo = document.querySelector(".todo-form");
      todo.classList.add('hidden');
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
  let formDiv = document.createElement('div');
  formDiv.classList.add('forms', 'absolute');
  projectDiv.setAttribute('id', 'projects');
  todoDiv.setAttribute('id', 'todo');
  content.appendChild(projectDiv);
  content.appendChild(todoDiv);
  const form = projectForm();
  const todo = todoForm();
  const projectButton = showButton(form, 'Project');
  container.appendChild(projectButton);
  formDiv.appendChild(form);
  formDiv.appendChild(todo);
  container.appendChild(formDiv);
  loadProjects(projects);
  loadTodo(0);
}

export default pageLoad