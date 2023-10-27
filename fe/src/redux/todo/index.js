const initialState = {
  todo: [],
};


const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      state.todo.push(action.value);

      return {
        ...state,
        todo: state.todo,
      };


    case 'CLEAR_TODO':
      return {
        ...state,
        todo: [],
      }
  
    default:
      break;
  }
  return state;
};

export default todoReducer;