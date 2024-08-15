import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { reducer, CoursesState, coursesReducer } from './courses.reducer';
import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';
import { Observable } from 'rxjs';
import { InitialState } from '@ngrx/store/src/models';

@Injectable({
  providedIn: 'root'
})

export class CoursesStateFacade {
  // Observable properties
  isAllCoursesLoading$: Observable<boolean> = this.prStore.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector));
  isSingleCourseLoading$: Observable<boolean> = this.prStore.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector));
  isSearchingState$: Observable<boolean> = this.prStore.pipe(select(CoursesSelectors.isSearchingStateSelector));
  courses$: Observable<any[] | null | undefined> = this.prStore.pipe(select(CoursesSelectors.getAllCourses));
  allCourses$: Observable<any[] | null | undefined> = this.prStore.pipe(select(CoursesSelectors.getAllCourses));
  course$: Observable<any | undefined> = this.prStore.pipe(select(CoursesSelectors.getCourse));
  errorMessage$: Observable<string | null> = this.prStore.pipe(select(CoursesSelectors.getErrorMessage));

  constructor(private prStore: Store<CoursesState>) {}

  // Methods to dispatch actions
  getAllCourses() {
    this.prStore.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string) {
    this.prStore.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string) {
    this.prStore.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
  }

  editCourse(course: any, id: string) {
    this.prStore.dispatch(CoursesActions.requestEditCourse({ course, id }));
  }

  createCourse(course: any) {
    this.prStore.dispatch(CoursesActions.requestCreateCourse({ course }));
  }

  deleteCourse(id: string) {
    this.prStore.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}
