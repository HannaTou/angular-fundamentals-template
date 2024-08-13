import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import * as CourseActions from './courses.actions';
import {
  isAllCoursesLoadingSelector,
  isSingleCourseLoadingSelector,
  isSearchingStateSelector,
  getAllCourses,
  getFilteredCourses,
  getCourse,
  getErrorMessage
} from './courses.selectors';
import { Course } from '@app/features/courses/courses.module';

@Injectable({
    providedIn: 'root'
})

export class CoursesStateFacade {
    // Add your code here
    isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(isAllCoursesLoadingSelector));
    isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(isSingleCourseLoadingSelector));
    isSearchingState$: Observable<boolean> = this.store.pipe(select(isSearchingStateSelector));
    allCourses$: Observable<any[] | null> = this.store.pipe(select(getAllCourses));
    courses$: Observable<any[] | null> = this.store.pipe(select(getFilteredCourses));
    course$: Observable<any | null> = this.store.pipe(select(getCourse));
    errorMessage$: Observable<string | null> = this.store.pipe(select(getErrorMessage));
  
    constructor(private store: Store) {}
  
    // Methods to dispatch actions
    getAllCourses(): void {
      this.store.dispatch(CourseActions.requestAllCourses());
    }
  
    getSingleCourse(id: string): void {
      this.store.dispatch(CourseActions.requestSingleCourse({ id }));
    }
  
    getFilteredCourses(title: string): void {
      this.store.dispatch(CourseActions.requestFilteredCourses({ title }));
    }
  
    editCourse(body: any, id: string): void {
      this.store.dispatch(CourseActions.requestEditCourse({ course: body, id }));
    }
  
    createCourse(body: any): void {
      this.store.dispatch(CourseActions.requestCreateCourse({ course: body }));
    }
  
    deleteCourse(id: string): void {
      this.store.dispatch(CourseActions.requestDeleteCourse({ id }));
    }
}
