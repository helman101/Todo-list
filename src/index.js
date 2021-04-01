import projectModule from './project';
import todoModule from './todo';
import pageLoad from './page-load';
import './styles.css';

// let todo = todoModule.createTodo('dasd', 'asd', 'asd', 'asd');
// let todoTwo = todoModule.createTodo('macarena', 'asd', 'asd', 'asd');
// let project = projectModule.createProject('Today');
// let projectTwo = projectModule.createProject('Monday');
// project.addTodo(todo);
// projectTwo.addTodo(todoTwo);
projectModule.loadLocal();
pageLoad(projectModule.getProjectsArray());