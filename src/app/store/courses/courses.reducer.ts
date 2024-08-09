import { Action, createReducer, on } from '@ngrx/store';
import { Course } from '@app/features/courses/courses.module';
import * as CoursesActions from './courses.actions';
import { CoursesConstants } from './courses.constants';

// Add your code here

export interface CoursesState {
    // Add your code here
    allCourses: Course[];
    course: Course | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string | null;
}

export const initialState: CoursesState = {
    // Add your code here
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null
};

export const coursesReducer = createReducer(
    // Add your code here
    initialState,
    // Handle request all courses
    on(CoursesActions.requestAllCourses, (state) => ({
      ...state,
      isAllCoursesLoading: true,
      errorMessage: null
    })),
    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
      ...state,
      allCourses: courses,
      isAllCoursesLoading: false
    })),
    on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
      ...state,
      isAllCoursesLoading: false,
      errorMessage: error
    })),
  
    // Handle request single course
    on(CoursesActions.requestSingleCourse, state => ({
      ...state,
      isSingleCourseLoading: true,
      errorMessage: null
    })),
    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
      ...state,
      course: course,
      isSingleCourseLoading: false
    })),
    on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
      ...state,
      isSingleCourseLoading: false,
      errorMessage: error
    })),
  
    // Handle request filtered courses
    on(CoursesActions.requestFilteredCourses, state => ({
      ...state,
      isAllCoursesLoading: true,
      errorMessage: null
    })),
    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
      ...state,
      allCourses: courses,
      isAllCoursesLoading: false
    })),
    on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
      ...state,
      isAllCoursesLoading: false,
      errorMessage: error
    })),
  
    // Handle delete course
    on(CoursesActions.requestDeleteCourse, state => ({
      ...state,
      errorMessage: null
    })),
    on(CoursesActions.requestDeleteCourseSuccess, state => ({
      ...state,
      allCourses: state.allCourses.filter(course => course.id)
    })),
    on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
      ...state,
      errorMessage: error
    })),
  
    // Handle edit course
    on(CoursesActions.requestEditCourse, state => ({
      ...state,
      errorMessage: null
    })),
    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
      ...state,
      allCourses: state.allCourses.map(c => c.id === course.id ? course : c),
      course: course
    })),
    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
      ...state,
      errorMessage: error
    })),
  
    // Handle create course
    on(CoursesActions.requestCreateCourse, state => ({
      ...state,
      errorMessage: null
    })),
    on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
      ...state,
      allCourses: [...state.allCourses, course]
    })),
    on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
      ...state,
      errorMessage: error
    }))
)

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);

export const coursesFeatureKey = 'courses';