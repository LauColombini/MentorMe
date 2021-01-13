const initialState = {
  skills: [],
  skillsToTeach: [],
  skillsToLearn: [],
  mentors: [{ objectives: [{ name: "Ver video de React", _id: "1", isCompleted: true }, { name: "practicar Props", _id: "2", isCompleted: true }, { name: "setear estado local", _id: "3", isCompleted: false }] }]
}

function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return action.payload
    case "ME_LOGIN":
      return action.payload
    case "LOGOUT":
      return initialState
    case "GET_MENTORS":
      return { ...state, mentors: action.payload }
    case "GET_MENTEES":
      return { ...state, mentees: action.payload }
    case "UPDATE_SKILLS_TO_LEARN":
      return { ...state, skillsToLearn: action.payload }
    case "UPDATE_SKILLS_TO_TEACH":
      return { ...state, skillsToTeach: action.payload }
    default:
      return state
  }
}
export default currentUserReducer
