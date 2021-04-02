import projectModule from './project';
import todoModule from './todo';
import pageLoad from './page-load';
import storageModule from './storage';
import './reset.css';
import './styles.css';

if (!localStorage.projects) {
  projectModule.createProject('Example', [todoModule.createTodo('New Todo', 'You can create Todos', '12-10-2021', 1)])
} else {
  storageModule.loadLocal();
}

pageLoad(projectModule.getProjectsArray());