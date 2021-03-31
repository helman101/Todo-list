import projectModule from './project'
import pageLoad from './page-load'

projectModule.createProject('Today')
pageLoad(projectModule.getProjectsArray());