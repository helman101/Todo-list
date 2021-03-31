class Project {
  constructor(name, list = []){
    this.name = name;
    this.list = list;
  }
}

const projectModule = (() =>  {
  const projectArray = [];

  const createProject = (name, list = []) => {
    let newProject = new Project(name, list);
    projectArray.push(newProject)
    return newProject
  };

  const getProjectsArray = () => {
    return projectArray
  }

  return {createProject, getProjectsArray}
})();

export default projectModule