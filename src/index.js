import projectModule from './project';
import todoModule from './todo';
import pageLoad from './page-load';
import './styles.css';

projectModule.createProject('Today');
pageLoad(projectModule.getProjectsArray());