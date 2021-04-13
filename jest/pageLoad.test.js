import { describe, expect, it } from '@jest/globals';
import * as page from '../src/page-load';
import projects, { Project } from '../src/project';
import todo, { Todo } from '../src/todo';

let div;
let project;
let t;
let todoDiv;
let projectDiv;

beforeAll(() => {
  div = document.createElement('div');
  todoDiv = document.createElement('div');
  todoDiv.setAttribute('id', 'todo');
  projectDiv = document.createElement('div')
  projectDiv.setAttribute('id', 'projects')
  project = projects.createProject('test');
  t = todo.createTodo('test', 'desc', '15-02-2021', 2)
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
})

describe('showButton', () => {
  it('Creates a button with the given name', () => {
    const btn = page.showButton(div, 'content');
    expect(btn.textContent).toBe('content');
  })
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
  let todoInfo
  beforeAll(() => {
    todoInfo = document.createElement('div');
  });

  it('Loads the information of a Todo and appends it to the given parent', () => {
    projects.createProject('test');
    page.loadTodoInfo(project.list, 0, todoInfo);
    const p = todoInfo.querySelectorAll('p');
    const expanded = todoInfo.querySelector('.expanded')
    expect(expanded.nodeName).toBe('DIV')
    expect(p[1].textContent).toBe('desc');
  });

  it('Collapses the information if they are already loaded', () => {
    page.loadTodoInfo(project.list, 0, todoInfo);
    const expanded = todoInfo.querySelector('.expanded')
    expect(expanded).toBeNull;
  });
});

describe('loadTodo', () => {
  it('creates a DIV with the given Todo', () => {
    let newT = page.loadTodo(project.list, 0);
    let title = newT.querySelector('.pointer');
    expect(title).not.toBeNull();
  });

  it('creates a new delete button', () => {
    let newT = page.loadTodo(project.list, 0);
    let btn = newT.querySelector('.delete');
    expect(btn).not.toBeNull();
  })

  it('the delete button works propertly', () => {
    let newT = page.loadTodo(project.list, 0);
    div.appendChild(newT);
    let btn = div.querySelector('.delete');
    btn.click();
    expect(div.hasChildNodes(newT)).toBeFalsy()
  });
})

describe('loadAllTodos', () => {
  it('creates a DIV for each todo in the given project', () => {
    page.loadAllTodos(0, todoDiv);
    let childrens = todoDiv.children.length;
    expect(childrens).toBe(1);
  });

  it('creates a button add for the given project', () => {
    let addBtn = todoDiv.querySelector('.add');
    expect(addBtn).not.toBeNull();
  });
});

describe('loadProjects', () => {
  it('create a new div for each project of the given array', () => {
    page.loadProjects(projects.getProjectsArray(), 0, projectDiv, todoDiv);
    let projectArr = projectDiv.querySelectorAll('.project');
    expect(projectArr.length).toBeGreaterThan(0);
  });
  it('create a delete button for each project', () => {
    let btnArr = projectDiv.querySelectorAll('.delete');
    expect(btnArr.length).toBeGreaterThan(0);
  });
  it('the button deletes one project', () => {
    let pLength = projectDiv.querySelectorAll('.project').length;
    let btnArr = projectDiv.querySelector('.delete');
    btnArr.click();
    let newPLength = projectDiv.querySelectorAll('.project').length;
    expect(newPLength).toBe(pLength - 1);
  });
});

describe('todoFields', () => {
  it('generate the todo form field with the given arguments', () => {
    let todoFormWrapper = page.todoFields('fieldTest', 'fieldDesc', '20-20-2023', 2);
    let title = todoFormWrapper.querySelector('#title');
    let desc = todoFormWrapper.querySelector('#description');
    let date = todoFormWrapper.querySelector('#due');
    let prio = todoFormWrapper.querySelector('#priority');
    expect(title).not.toBeNull();
    expect(desc).not.toBeNull();
    expect(date).not.toBeNull();
    expect(prio).not.toBeNull();
  });
});