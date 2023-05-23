import {combineReducers, legacy_createStore as createStore} from "redux"; 
import synthReducer from "./synthReducer";



let reducers = combineReducers({
    synth: synthReducer
})

let store = createStore(reducers)


export default store