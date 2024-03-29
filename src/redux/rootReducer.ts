// import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// import attendanceSystem from '../redux/slices/attendanceSystem'

// const createNoopStorage = () => ({
//   getItem(_key: string) {
//     return Promise.resolve(null);
//   },
//   setItem(_key: string, value: any) {
//     return Promise.resolve(value);
//   },
//   removeItem(_key: string) {
//     return Promise.resolve();
//   },
// });

// const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// const rootPersistConfig = {
//   key: 'root',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: [],
// };

// const productPersistConfig = {
//   key: 'product',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['sortBy', 'checkout'],
// };

// const rootReducer = combineReducers({
//   attendanceSystem: persistReducer(productPersistConfig, attendanceSystem),
// });

// export { rootPersistConfig, rootReducer };
