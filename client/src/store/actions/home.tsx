import * as actionTypes from '@/store/action-types';
import { getSliders, getLessons } from '@/api/home'
import { StoreDispatch, StoreGetState } from '@/store';
import { LessonData } from '@/typings';

export default {
  setCurrentCategory(currentCategory: string) {
    return {
      type: actionTypes.SET_CURRENT_CATEGORY,
      payload: currentCategory
    }
  },
  getSliders() {
    return {
      type: actionTypes.GET_SLIDER,
      payload: getSliders()
    }
  },
  getLessons() {
    return function (dispatch: StoreDispatch, getState: StoreGetState) {
      (async function () {
        let { currentCategory, lessons: { hasMore, offset, limit, loading } } = getState().home;
        console.log(" +++++++++++++ " + currentCategory, offset, limit);
        console.log(loading, hasMore);
        if (!loading && hasMore ) {
          dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true});
          let result: LessonData = await getLessons<LessonData>(currentCategory, offset, limit);
          dispatch({
            type: actionTypes.SET_LESSONS,
            payload: result.data
          });
          dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: false});
        }
      })()
    }
  }
}