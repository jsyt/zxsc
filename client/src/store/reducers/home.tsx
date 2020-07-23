

import { AnyAction } from 'redux';
import * as actionTypes from '@/store/action-types';
import { Slider, Lesson } from '@/typings';




export interface Lessons {
  loading: boolean;
  list: Lesson[];
  hasMore: boolean;
  offset: number;
  limit: number;
}
export interface HomeState {
  currentCategory: string;
  sliders: Slider[];
  lessons: Lessons;
}

const initialState: HomeState = {
  currentCategory: 'all',
  sliders: [],
  lessons: {
    loading: false,
    list: [],
    hasMore: true,
    offset: 0,
    limit: 5
  }
}

export default function (state: HomeState = initialState, action: AnyAction): HomeState {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload };
    case actionTypes.GET_SLIDER:
      return { ...state, sliders: action.payload.data };
    case actionTypes.SET_LESSONS_LOADING:
      state.lessons.loading = action.payload;
      return state;
    case actionTypes.SET_LESSONS:
      console.log("state.lessons.offset: ----" + JSON.stringify(state.lessons));
      console.log(JSON.stringify(action.payload));
      state.lessons.loading = true;
      state.lessons.list = [...state.lessons.list, ...action.payload.list];
      state.lessons.hasMore = action.payload.hasMore;
      console.log("state.lessons.offset: " + state.lessons.offset);
      console.log("action.payload.limit: " + action.payload.limit);
      console.log("state.lessons.limit: " + state.lessons.limit);
      console.log("action.payload.offset: "+ action.payload.offset);
      state.lessons.offset = Number(state.lessons.offset) + Number(state.lessons.limit)
      return state;
    default:
      return state;
  }
}