const initialState = {
  profile: {
    id: null,
    name: null,
    email: null,
    isEmailVerified : null,
    role: null,
  },
};

const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SAVE_USER':

      return {
        ...state,
        isLogin: true,
        profile: {
          ...state.profile,
          id: action.value.id,
          name: action.value.name,
          email: action.value.email,
          isEmailVerified: action.value.isEmailVerified,
          role: action.value.role
        },
      };

    case 'CLEAR_PROFILE':
      return {
        initialState
      };
      
    default:
      break;
  }
  return state;
};

export default profileReducer;