const redux = require('redux')

const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKES_RESTOCKED = 'CAKES_RESTOCKED'

const orderCake = () => {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

const restockCake = (qty = 1) => {
    return {
        type: CAKES_RESTOCKED,
        payload: qty
    }
}

const initialState = {
    numOfCakes: 10
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case CAKES_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state
    }
}

const store = createStore(reducer)
console.log('Initial State: ', store.getState())

const unsubscribe = store.subscribe(() => console.log('Store changed', store.getState()))

const actions = bindActionCreators({ orderCake, restockCake }, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(5)

unsubscribe()   
