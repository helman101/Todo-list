import { describe, expect, it } from '@jest/globals';
import * as page from '../src/page-load';
import projects, { Project } from '../src/project';
import todo, { Todo } from '../src/todo';

let div;
let project;
let t;

beforeAll(() => {
  div = document.createElement('div');
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