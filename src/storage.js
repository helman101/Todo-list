import * as projects from './project';
import * as todo from './todo';

const storageModule = (() => {
  const saveLocal = () => {
    const projectArray = projects.projectModule.getProjectsArray();
    localStorage.projects = JSON.stringify(projectArray);
  }

  const loadLocal = () => {
    if (localStorage.projects) {
      const projectArray = JSON.parse(localStorage.projects);
      for (let i = 0; i < projectArray.length; i++){
        Object.setPrototypeOf(projectArray[i], projects.Project.prototype);
        const list = projectArray[i].list;
        for (let j = 0; j < list.length; j ++) {
          Object.setPrototypeOf(list[j], todo.Todo.prototype);
        }
      }
      projects.projectModule.setProjectsArray(projectArray);
    }
  }

  return {saveLocal, loadLocal};
})();

export default storageModule;