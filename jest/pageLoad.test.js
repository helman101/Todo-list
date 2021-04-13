import * as page from '../src/page-load';
import projects from '../src/project';
import todo from '../src/todo';

let div;
let project;
let t;
let todoDiv;
let projectDiv;

beforeAll(() => {
  div = document.createElement('div');
  todoDiv = document.createElement('div');
  todoDiv.setAttribute('id', 'todo');
  projectDiv = document.createElement('div');
  projectDiv.setAttribute('id', 'projects');
  project = projects.createProject('test');
  t = todo.createTodo('test', 'desc', '15-02-2021', 2);
  project.addTodo(t);
});


describe('show', () => {
  it('toggles the hidden class of an element', () => {
    const div = document.createElement('div');
    page.show(div);
    expect(div.classList.contains('hidden')).toBe(true);
    page.show(div);
    expect(div.classList.contains('hidden')).toBe(false);
  });
});

describe('showButton', () => {
  it('Creates a button with the given name', () => {
    const btn = page.showButton(div, 'content');
    expect(btn.textContent).toBe('content');
  });
  it('Creates a button that hides or shows the given object', () => {
    const btn = page.showButton(div, 'content');
    btn.click();
    expect(div.classList.contains('hidden')).toBe(true);
  });
});

describe('createLabel', () => {
  it('Creates a label with the given name capitalized', () => {
    const label = page.createLabel('label');
    expect(label.textContent).toBe('Label');
  });
  it('Creates a label with for artibute', () => {
    const label = page.createLabel('label');
    expect(label.getAttribute('for')).toBe('label');
  });
});

describe('createInput', () => {
  it('Creates an input with the given id', () => {
    const input = page.createInput('input', 'text');
    expect(input.id).toBe('input');
  });
  it('Creates an input with the given type', () => {
    const input = page.createInput('input', 'text');
    expect(input.type).toBe('text');
  });
});

describe('pickColor', () => {
  it('Return the corresponding color based on the priority of the element', () => {
    expect(page.pickColor(1)).toBe('red');
    expect(page.pickColor(2)).toBe('blue');
    expect(page.pickColor(3)).toBe('yellow');
    expect(page.pickColor(4)).toBe('black');
  });
});

describe('loadTodoInfo', () => {
  let todoInfo;
  beforeAll(() => {
    todoInfo = document.createElement('div');
  });

  it('Loads the information of a Todo and appends it to the given parent', () => {
    projects.createProject('test');
    page.loadTodoInfo(project.list, 0, todoInfo);
    const p = todoInfo.querySelectorAll('p');
    const expanded = todoInfo.querySelector('.expanded');
    expect(expanded.nodeName).toBe('DIV');
    expect(p[1].textContent).toBe('desc');
  });

  it('Collapses the information if they are already loaded', () => {
    page.loadTodoInfo(project.list, 0, todoInfo);
    const expanded = todoInfo.querySelector('.expanded');
    expect(expanded).toBeNull();
  });
});

describe('loadTodo', () => {
  it('creates a DIV with the given Todo', () => {
    const newT = page.loadTodo(project.list, 0);
    const title = newT.querySelector('.pointer');
    expect(title).not.toBeNull();
  });

  it('creates a new delete button', () => {
    const newT = page.loadTodo(project.list, 0);
    const btn = newT.querySelector('.delete');
    expect(btn).not.toBeNull();
  });

  it('the delete button works propertly', () => {
    const newT = page.loadTodo(project.list, 0);
    div.appendChild(newT);
    const btn = div.querySelector('.delete');
    btn.click();
    expect(div.hasChildNodes(newT)).toBeFalsy();
  });
});

describe('loadAllTodos', () => {
  it('creates a DIV for each todo in the given project', () => {
    page.loadAllTodos(0, todoDiv);
    const childrens = todoDiv.children.length;
    expect(childrens).toBe(1);
  });

  it('creates a button add for the given project', () => {
    const addBtn = todoDiv.querySelector('.add');
    expect(addBtn).not.toBeNull();
  });
});

describe('loadProjects', () => {
  it('create a new div for each project of the given array', () => {
    page.loadProjects(projects.getProjectsArray(), 0, projectDiv, todoDiv);
    const projectArr = projectDiv.querySelectorAll('.project');
    expect(projectArr.length).toBeGreaterThan(0);
  });
  it('create a delete button for each project', () => {
    const btnArr = projectDiv.querySelectorAll('.delete');
    expect(btnArr.length).toBeGreaterThan(0);
  });
  it('the button deletes one project', () => {
    const pLength = projectDiv.querySelectorAll('.project').length;
    const btnArr = projectDiv.querySelector('.delete');
    btnArr.click();
    const newPLength = projectDiv.querySelectorAll('.project').length;
    expect(newPLength).toBe(pLength - 1);
  });
});

describe('todoFields', () => {
  it('generate the todo form field with the given arguments', () => {
    const todoFormWrapper = page.todoFields('fieldTest', 'fieldDesc', '20-20-2023', 2);
    const title = todoFormWrapper.querySelector('#title');
    const desc = todoFormWrapper.querySelector('#description');
    const date = todoFormWrapper.querySelector('#due');
    const prio = todoFormWrapper.querySelector('#priority');
    expect(title).not.toBeNull();
    expect(desc).not.toBeNull();
    expect(date).not.toBeNull();
    expect(prio).not.toBeNull();
  });
});

describe('todoForm', () => {
  it('creates a new Todo form', () => {
    const form = page.todoForm(todoDiv);
    expect(form).not.toBeNull();
  });

  it('creates the form with a submit button', () => {
    const form = page.todoForm(todoDiv);
    const button = form.querySelector('#Submit');
    expect(button).not.toBeNull();
  });

  it('creates a new Todo for the project by id', () => {
    const form = page.todoForm(todoDiv);
    form.id = 0;
    const button = form.querySelector('#Submit');
    const projectsArr = projects.getProjectsArray();
    const { length } = projectsArr[0].list;
    button.click();
    expect(projectsArr[0].list.length).toBe(length + 1);
  });
});

describe('editForm', () => {
  let formDiv;
  beforeAll(() => {
    formDiv = document.createElement('div');
    todoDiv.appendChild(formDiv);
  });

  it('creates a Todo edit form', () => {
    const projectsArr = projects.getProjectsArray();
    const editForm = page.editForm(projectsArr[0].list, 0, formDiv);
    expect(editForm).not.toBeNull();
  });

  it('edits the selected todo', () => {
    const projectsArr = projects.getProjectsArray();
    const editForm = page.editForm(projectsArr[0].list, 0, formDiv);
    const title = editForm.querySelector('#title');
    title.value = 'Updated';
    const btn = editForm.querySelector('#Submit');
    btn.click();
    expect(projectsArr[0].list[0].title).toBe('Updated');
  });
});

describe('projectForm', () => {
  it('creates a new project form', () => {
    const mockDiv = document.createElement('div');
    const form = page.projectForm(projectDiv, todoDiv, mockDiv);
    const formTitle = form.querySelector('h3');
    expect(formTitle.textContent).toBe('New Project');
  });

  it('Submits a new project with the given name', () => {
    const mockDiv = document.createElement('div');
    const form = page.projectForm(projectDiv, todoDiv, mockDiv);
    const name = form.querySelector('#name');
    const btn = form.querySelector('button');
    name.value = 'TestExample';
    btn.click();
    const projectsArr = projects.getProjectsArray();
    expect(projectsArr[projectsArr.length - 1].name).toBe('TestExample');
  });
});