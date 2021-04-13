import * as projects from '../src/project';
import storage from '../src/storage';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
}

global.localStorage = new LocalStorageMock();

describe('saveLocal', () => {
  it('save the projects array', () => {
    storage.saveLocal();
    expect(JSON.parse(localStorage.projects)).toEqual(projects.projectModule.getProjectsArray());
  });
});

describe('loadLocal', () => {
  it('load the saved locally project array', () => {
    storage.loadLocal();
    const projectsArr = projects.projectModule.getProjectsArray();
    let projectInstances = true;
    for (let i = 0; i < projectsArr.length; i += 1) {
      if (projectsArr[i].constructor !== projects.Project) {
        projectInstances = false;
      }
    }

    expect(projectInstances).toBe(true);
  });
});