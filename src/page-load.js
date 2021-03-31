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

  const submit = document.createElement('input');
  submit.type = 'submit';
  submit.value = 'Submit';

  form.appendChild(nameLabel);
  form.appendChild(name);
  form.appendChild(submit);

  return form;
}

const pageLoad = (projects) => {
  let container = document.querySelector('#container');
  const form = projectForm();
  const projectButton = showButton(form, 'Project');
  container.appendChild(projectButton);
  container.appendChild(form);
  let array = projects;
  for (let i = 0; i < array.length; i++){
    let newDiv = document.createElement('div');
    newDiv.textContent = array[i].name;
    newDiv.style = 'height: 50px; width: 50px'
    container.appendChild(newDiv);
  }
}

export default pageLoad