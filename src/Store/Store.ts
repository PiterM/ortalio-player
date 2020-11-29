import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { StoreState } from './StoreState';
import { Store, createStore, applyMiddleware } from 'redux';
import rootReducer from './RootReducer';
import rootSagas from './RootSagas';

export const getStore = (): Store<StoreState> => {
    let store: Store<StoreState>;
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = composeWithDevTools({ name: 'ortalio-player' });

    // if (process.env.NODE_ENV  !== EnvironmentMode.Development) {
    //     store = createStore(
    //         rootReducer,
    //         applyMiddleware(sagaMiddleware)
    //     );
    // }
    store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(sagaMiddleware)
        )
    ); 

    sagaMiddleware.run(rootSagas);
    return store;
}

export default getStore;
