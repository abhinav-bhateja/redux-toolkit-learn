const redux = require('redux')

const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combinedReducer = redux.combineReducers

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKES_RESTOCKED = 'CAKES_RESTOCKED'

const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

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

const orderIceCream = () => {
    return {
        type: ICECREAM_ORDERED,
        payload: 1
    }
}

const restockIceCream = (qty = 1) => {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

const cakeReducer = (state = initialCakeState, action) => {
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

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state
    }
}

const rootReducer = combinedReducer({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer)
console.log('Initial State: ', store.getState())

const unsubscribe = store.subscribe(() => console.log('Store changed', store.getState()))

const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(5)

actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(5)

unsubscribe()   
