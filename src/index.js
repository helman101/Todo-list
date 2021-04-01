import projectModule from './project';
import todoModule from './todo';
import pageLoad from './page-load';
import './reset.css';
import './styles.css';

projectModule.loadLocal();
pageLoad(projectModule.getProjectsArray());