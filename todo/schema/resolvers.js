const resolvers = {
    Query: {
      todos: (_, __, { dataSources }) => dataSources.todoAPI.getAllTodos(),
    },
    Mutation: {
      addTodo: (_, { text }, { dataSources }) =>
        dataSources.todoAPI.addTodo({ text }),
      updateTodo: (_, { id, done }, { dataSources }) =>
        dataSources.todoAPI.updateTodo({ id, done }),
      deleteTodo: (_, { id }, { dataSources }) =>
        dataSources.todoAPI.deleteTodo({ id }),
    },
  };