import projectModule from './project'
import pageLoad from './page-load'
import './styles.css';

projectModule.createProject('Today')
pageLoad(projectModule.getProjectsArray());