class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

const todoModule = (() => {
  const createTodo = (title, description, dueDate, priority) => {
    const newTodo = new Todo(title, description, dueDate, priority);
    return newTodo;
  };

  return {createTodo};
})();

export default todoModule;