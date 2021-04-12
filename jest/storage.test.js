import * as projects from '../src/project';
import * as todo from '../src/todo';
import storage from '../src/storage'

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
};

global.localStorage = new LocalStorageMock;

let project;

beforeAll(() => {
  project = projects.projectModule.createProject('example');
});

describe('saveLocal', () => {
  it('save the projects array', () => {
    storage.saveLocal();
    expect(JSON.parse(localStorage.projects)).toEqual(projects.projectModule.getProjectsArray());
  })
})

describe('loadLocal', () => {
  it('load the saved locally project array', () => {
    storage.loadLocal();
    let projectsArr = projects.projectModule.getProjectsArray();
    let projectInstances = true;
    for(let i = 0; i < projectsArr.length; i+=1){
      if(projectsArr[i].constructor !== projects.Project){
        projectInstances = false;
      }
    }
    
    expect(projectInstances).toBe(true);

  })
})