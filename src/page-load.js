import projectModule from './project'

const showButton = (object, content) => {
  const btn = document.createElement('button');
  btn.textContent = content;
  btn.addEventListener('click', show.bind(this, object));
  return btn;
}

const show = (object) => {
  object.classList.toggle('hidden');
}

const projectForm = () => {
  const form = document.createElement('form');
  form.classList.add('hidden');
  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'name');
  nameLabel.textContent = 'Name';

  const name = document.createElement('input');
  name.setAttribute('id', 'name');
  name.type = 'text';

  const submit = document.createElement('button');
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    projectModule.createProject(name.value);
    loadProjects(projectModule.getProjectsArray());
    form.reset();
  });
  submit.textContent = 'Submit';

  form.appendChild(nameLabel);
  form.appendChild(name);
  form.appendChild(submit);

  return form;
}

const loadProjects = (projects) => {
  let container = document.querySelector('#projects');
  container.innerHTML = '';
  for (let i = 0; i < projects.length; i++){
    let newDiv = document.createElement('div');
    newDiv.textContent = projects[i].name;
    container.appendChild(newDiv);
  }
}

const pageLoad = (projects) => {
  let container = document.querySelector('#container');
  let projectDiv = document.createElement('div');
  projectDiv.setAttribute('id', 'projects');
  container.appendChild(projectDiv)
  const form = projectForm();
  const projectButton = showButton(form, 'Project');
  loadProjects(projects);
  container.appendChild(projectButton);
  container.appendChild(form);
}

export default pageLoad