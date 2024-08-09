// Add your code here
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.reducer';
import { coursesFeatureKey } from './courses.reducer';

export const selectCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

// Selector to check if all courses are loading
export const isAllCoursesLoadingSelector = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.isAllCoursesLoading
  );
  
  // Selector to check if the state is a search result
  export const isSearchingStateSelector = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.isSearchState
  );
  
  // Selector to check if a single course is loading
  export const isSingleCourseLoadingSelector = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.isSingleCourseLoading
  );
  
  // Selector to get all courses
  export const getAllCourses = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.allCourses
  );
  
  // Selector to get the current course
  export const getCourse = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.course
  );
  
  // Selector to get the error message
  export const getErrorMessage = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.errorMessage
  );