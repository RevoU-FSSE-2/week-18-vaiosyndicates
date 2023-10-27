const initialState = {
  tokenizer: {
    accessToken: '',
    refreshToken: ''
  }

};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        ...state,
        tokenizer: {
          ...state.tokenizer,
          accessToken: action.value.access.token,
          refreshToken: action.value.refresh.token
        },
      };

    case 'CLEAR_TOKEN':
      return {
        initialState,
      };
      
    default:
      break;
  }
  return state;
};

export default tokenReducer;
