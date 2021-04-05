import project from './project';
import todo from './todo';
import pageLoad from './page-load';
import storageModule from './storage';
import './reset.css';
import './styles.css';

if (!localStorage.projects) {
  project.createProject('Example', [todo.createTodo('New Todo', 'You can create Todos', '12-10-2021', 1)]);
} else {
  storageModule.loadLocal();
}

pageLoad(project.getProjectsArray());