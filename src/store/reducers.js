const initialState = {
    population: 1,
    last_id: 1,
    serviced: 0,
    waitingTimeSum: 0,
    people: [1]
};

const rootReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case 'CREATE_HUMAN':
            return {
                ...state,
                population: state.population + 1,
                last_id: state.last_id + 1,
                people: [...state.people, state.last_id + 1]
            };
        case 'KILL_HUMAN':
            const human_index = state.people.indexOf(action.payload);
            let removeByIndex = (array, index) => array.filter((_, i) => i !== index);
            return {
                ...state,
                population: state.population - 1,
                people: removeByIndex(state.people, human_index)
            };
        default:
            return state
    }
};

export default rootReducer