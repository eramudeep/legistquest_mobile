import {compose, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import rootSaga from './sagas';
import rootReducer from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //blacklist: ['search','filter'] // navigation will not be persisted

   
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware];
  const store = createStore(
    persistedReducer,
    {},
    compose(applyMiddleware(...middleWares)),
  );
  sagaMiddleware.run(rootSaga);
  let persistor = persistStore(store);
  return {store, persistor};
};
