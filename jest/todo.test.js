import todo, { Todo } from '../src/todo';
import projects, { Project } from '../src/project';

let t;
let project;

beforeAll(() => {
  project = projects.createProject('example');
  t = todo.createTodo('title', 'description', '20-01-2021', 1);
  project.addTodo(t);
});

describe('createTodo', () => {
  it('Creates a Todo', () => {
    expect(t instanceof Todo).toBe(true);
  });

  it('Creates a todo with the given arguments', () => {
    expect(t.title).toBe('title');
    expect(t.description).toBe('description');
    expect(t.dueDate).toBe('20-01-2021');
    expect(t.priority).toBe(1);
  });
});

describe('deleteTodo', () => {
  it('deletes a project from the given list with the given index', () => {
    todo.deleteTodo(project.list, 0);
    expect(project.list.length).toBe(0)
  })
})

describe('edit', () => {
  it('replace todo information with the given arguments', () => {
    t.edit('test', 'example', '01-12-5000', 3);
    expect(t.title).toBe('test');
    expect(t.description).toBe('example');
    expect(t.dueDate).toBe('01-12-5000');
    expect(t.priority).toBe(3);
  })
})


