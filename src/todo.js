class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

Todo.prototype.edit = function(title, description, dueDate, priority){
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

const todoModule = (() => {
  const createTodo = (title, description, dueDate, priority) => {
    const newTodo = new Todo(title, description, dueDate, priority);
    return newTodo;
  };

  const deleteTodo = (list, index) => {
    return  list.splice(index, 1);
  }

  return {createTodo, deleteTodo};
})();

export default todoModule;
export {todoModule, Todo};