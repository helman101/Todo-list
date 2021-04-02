class Project {
  constructor(name, list = [], active = false) {
    this.name = name;
    this.list = list;
    this.active = active;
  }
}

Project.prototype.addTodo = function (todo) {
  this.list.push(todo);
};

const projectModule = (() => {
  let projectArray = [];

  const createProject = (name, list = []) => {
    const newProject = new Project(name, list);
    projectArray.push(newProject);
    return newProject;
  };

  const setProjectsArray = (arr) => {
    projectArray = arr;
  };

  const getProjectsArray = () => projectArray;

  const deleteProject = (index) => projectArray.splice(index, 1);

  const getActive = () => {
    for (let i = 0; i < projectArray.length; i += 1) {
      if (projectArray[i].active) {
        return i;
      }
    }
    return 0;
  };

  return {
    createProject, getProjectsArray, deleteProject, getActive, setProjectsArray,
  };
})();

export default projectModule;
export { projectModule, Project };
