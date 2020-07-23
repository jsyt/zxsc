import home from './home';
import mine from './mine';
import profile from './profile';
import { ReducersMapObject, Reducer, AnyAction } from 'redux';
import history from '@/history';
import { connectRouter } from 'connected-react-router';
import produce from 'immer';
import { combineReducers } from 'redux-immer';

let reducers: ReducersMapObject = {
  home, 
  mine,
  profile,
  router: connectRouter(history)
 }

const rootReducer: Reducer<RootState, AnyAction> = combineReducers<RootState>(produce, reducers)

export type RootState = {
  [Key in keyof typeof reducers]: ReturnType<typeof reducers[Key]>
}
export default rootReducer;

