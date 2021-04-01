class Project {
  constructor(name, list = [], active = false){
    this.name = name;
    this.list = list;
    this.active = active;
  }
}

Project.prototype.addTodo = function(todo) {
  this.list.push(todo);
}

const projectModule = (() =>  {
  let projectArray = [];

  const createProject = (name, list = []) => {
    let newProject = new Project(name, list);
    projectArray.push(newProject)
    return newProject
  };

  const getProjectsArray = () => {
    return projectArray
  }

  const deleteProject = (index) => {
    return  projectArray.splice(index, 1);
  }

  const getActive = () => {
    for (let i = 0; i < projectArray.length; i++) {
      if (projectArray[i].active) {
        return i;
      }
    }
  }

  const saveLocal = () => {
    localStorage.projects = JSON.stringify(projectArray);
  }

  const loadLocal = () => {
    if (localStorage.projects) {
      projectArray = JSON.parse(localStorage.projects);
      for (let i = 0; i < projectArray.length; i++){
        Object.setPrototypeOf(projectArray[i], Project.prototype);
      }
    }
  }

  return {createProject, getProjectsArray, deleteProject, getActive, saveLocal, loadLocal}
})();

export default projectModule
