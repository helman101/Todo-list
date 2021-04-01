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
    projectModule.createProject(name.value);
    const arr = projectModule.getProjectsArray();
    loadProjects(arr, arr.length-1);
    loadTodo(arr.length-1);
    form.reset();
    form.classList.add('hidden');
    const todoForm = form.nextElementSibling;
    todoForm.classList.add('hidden');
    projectModule.saveLocal();
  });
  submit.textContent = 'Submit';

  wrapper.appendChild(formTitle);
  wrapper.appendChild(nameLabel);
  wrapper.appendChild(name);
  wrapper.appendChild(submit);
  form.appendChild(wrapper);

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
  input.classList.add('m-bot-10');
  input.type = type;
  return input;
}

const todoForm = () => {
  const form = document.createElement('form');
  const wrapper = document.createElement('div');
  wrapper.classList.add('d-flex', 'flex-column');
  form.classList.add('hidden', 'todo-form');
  const formTitle = document.createElement('h3');
  formTitle.classList.add('m-bot-10', 'bold', 'title');
  const titleLabel = createLabel('title');
  const title = createInput('title', 'text');
  const descriptionLabel = createLabel('description');
  const description = createInput('description', 'text');
  const dueLabel = createLabel('due');
  const due = createInput('due', 'date');
  const priorityLabel = createLabel('priority');
  const priority = createInput('priority', 'range');
  priority.max = 4;
  priority.min = 1;
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

  wrapper.appendChild(formTitle);
  wrapper.appendChild(titleLabel);
  wrapper.appendChild(title);
  wrapper.appendChild(descriptionLabel);
  wrapper.appendChild(description);
  wrapper.appendChild(dueLabel);
  wrapper.appendChild(due);
  wrapper.appendChild(priorityLabel);
  wrapper.appendChild(priority);
  wrapper.appendChild(btn);
  form.appendChild(wrapper);

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
      if (elem !== 'title' && elem !== 'priority') {
        let head = document.createElement('p');
        head.classList.add('bold');
        let p = document.createElement('p');
        p.classList.add('m-bot-10');
        head.textContent = `${elem}: `;
        p.textContent = `${todo[elem]}`;
        div.appendChild(head);
        div.appendChild(p);
      }
    }
    parent.appendChild(div);
  }
}

const pickColor = (number) => {
  const colors = ['red', 'blue', 'yellow', 'black'];
  return colors[number - 1];
}

const loadTodo = (index) => {

  let todoDiv = document.querySelector('#todo');
  let projectArr = projectModule.getProjectsArray();
  //const forms = document.querySelector('.forms');
  todoDiv.innerHTML = ''

  if(projectArr.length === 0){ return }
  
  let list = projectArr[index].list;
  for (let i = 0; i < list.length; i++){
    let newDiv = document.createElement('div');
    newDiv.classList.add('m-bot-10');
    const wrapper = document.createElement('div');
    wrapper.classList.add('d-flex');
    let todoTitle = document.createElement('p');
    let deleteTodoBtn = document.createElement('button');
    deleteTodoBtn.classList.add('delete')
    deleteTodoBtn.textContent = '-';
    deleteTodoBtn.addEventListener('click', () => {
      todoModule.deleteTodo(list, i);
      loadTodo(index);
      projectModule.saveLocal();
    })
    const priority = document.createElement('div');
    priority.classList.add('priority');
    priority.style.backgroundColor = pickColor(list[i].priority);
    todoTitle.classList.add('pointer');
    todoTitle.textContent = list[i].title;
    todoTitle.addEventListener('click', loadTodoInfo.bind(this, list[i], newDiv))
    wrapper.appendChild(deleteTodoBtn)
    wrapper.appendChild(priority);
    wrapper.appendChild(todoTitle)
    newDiv.appendChild(wrapper);
    todoDiv.appendChild(newDiv);
  }
  const btn = document.createElement('button');
  btn.classList.add('add')
  btn.setAttribute('id', index);
  btn.textContent = '+';
  btn.addEventListener('click', () => {
    const todo = document.querySelector(".todo-form");
    todo.setAttribute('id', index);
    const title = todo.querySelector('h3');
    title.textContent = `New ${projectArr[index].name} Todo`;
    show(todo);
  });
  todoDiv.appendChild(btn);
}

const loadProjects = (projects, active = 0) => {
  let projectDiv = document.querySelector('#projects');
  projectDiv.innerHTML = '';
  for (let i = 0; i < projects.length; i++){
    let newDiv = document.createElement('div');
    newDiv.classList.add('d-flex');
    projects[i].active = false;
    if (i === active) {
      projects[i].active = true;
    }
    let projectSpan = document.createElement('p');
    projectSpan.classList.add('project');
    let deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.classList.add('delete');
    deleteProjectBtn.textContent = 'X'
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
      setWhiteBg();
      newDiv.classList.add('selected');
      projects[i].active = true;
    });
    newDiv.appendChild(deleteProjectBtn);
    newDiv.appendChild(projectSpan);
    projectDiv.appendChild(newDiv);
  }
}

const setWhiteBg = () => {
  const div = document.querySelectorAll('#projects div')
  for (let i = 0; i < div.length; i++) {
    div[i].classList.remove('selected')
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
  projectButton.classList.add('fixed', 'projectBtn');
  container.appendChild(projectButton);
  formDiv.appendChild(form);
  formDiv.appendChild(todo);
  container.appendChild(formDiv);
  loadProjects(projects);
  loadTodo(0);
}

export default pageLoad