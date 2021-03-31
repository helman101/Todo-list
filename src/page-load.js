const pageLoad = (projects) => {
  let array = projects;
  for (let i = 0; i < array.length; i++){
    let newDiv = document.createElement('div');
    let container = document.querySelector('#container');
    newDiv.textContent = array[i].name;
    newDiv.style = 'height: 50px; width: 50px'
    container.appendChild(newDiv);
  }
}

export default pageLoad