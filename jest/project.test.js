import { describe, expect, it } from '@jest/globals';
import projects, { Project } from '../src/project';
import todo from '../src/todo'

let project

beforeAll(() => {
  project = projects.createProject('example');
});

describe('createProject', () => {
  it('Creates a project', () => {
    expect(project instanceof Project).toBe(true);
  });
  
  it('Creates a project with the given name', () => {
    expect(project.name).toBe('example');
  });
  
  it('Creates a project with an empty list of todos', () => {
    expect(project.list.length).toBe(0);
  });
  
  it('Pushes the project in the projects array', () => {
    expect(projects.getProjectsArray().length).toBe(1);
  });
});

describe('deleteProject', () => {
  it('Deletes a project from the project array by index', () => {
    projects.deleteProject(0);
    expect(projects.getProjectsArray().length).toBe(0);
  });
});

describe('getActive', () => {
  it('Finds the index of the currently active project', () => {
    projects.createProject('active', [], true);
    projects.createProject('Notactive');
    const activeIndex = projects.getActive();
    const projectsArr = projects.getProjectsArray();
    const active = projectsArr[activeIndex];
    expect(active.name).toBe('active');
  });
  it('Return 0 if no project is currently active', () => {
    const projectsArr = projects.getProjectsArray();
    for (let i = 0; i < projectsArr.length; i += 1) {
      projectsArr[i].active = false;
    }
    const index = projects.getActive();
    expect(index).toBe(0);
  });
});

describe('addTodo', () => {
  it ('Adds a To do object in the list of the project', () => {
    const t = todo.createTodo('title', 'description', '20-01-2021', 1)
    project.addTodo(t);
    expect(project.list.length).toBe(1);
  });
});
