import projectModule from './project';
import todoModule from './todo';
import pageLoad from './page-load';
import storageModule from './storage';
import './reset.css';
import './styles.css';

storageModule.loadLocal();
pageLoad(projectModule.getProjectsArray());