const initialState = {
    population: 1,
    last_id: 1,
    serviced: 0,
    maxQueueLength: 0,
    processingTime: 0,
    selectedHuman: null,
    people: [1]
};

const rootReducer = (state = initialState, action) => {
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
        case 'SELECT_HUMAN':
            return {
                ...state,
                selectedHuman: action.payload
            };
        case 'SERVICE':
            return {
                ...state,
                serviced: state.serviced + 1
            };
        case 'UPDATE_MAX_QUEUE_LENGTH':
            if (action.payload > state.maxQueueLength) {
                return {
                    ...state,
                    maxQueueLength: action.payload
                };
            } else {
                return state;
            }
        case 'ADD_PROCESSING_TIME':
            return {
                ...state,
                processingTime: state.processingTime + action.payload
            };
        default:
            return state
    }
};

export default rootReducer