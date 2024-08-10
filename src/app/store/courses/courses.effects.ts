import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as CourseActions from './courses.actions';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesStateFacade } from './courses.facade';
import { Course } from '@app/features/courses/courses.module';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private coursesStoreService: CoursesStoreService,
        private coursesStateFacade: CoursesStateFacade,
        private router: Router
    ) {}

    // Add your code here
    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.requestAllCourses),
        mergeMap(() => this.coursesStoreService.getAll()
          .pipe(
            map(courses => CourseActions.requestAllCoursesSuccess({ courses })),
            catchError(error => of(CourseActions.requestAllCoursesFail({ error })))
          )
        )
      ));
    
      filteredCourses$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.requestFilteredCourses),
        withLatestFrom(this.coursesStateFacade.courses$),
        map(([action, courses]) => courses.filter(course => course.title.includes(action.title))),
        map(courses => CourseActions.requestFilteredCoursesSuccess({ courses }))
      ));
    
      getSpecificCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.requestSingleCourse),
        mergeMap(action => this.coursesStoreService.getCourse(action.id)
          .pipe(
            map(course => CourseActions.requestSingleCourseSuccess({ course })),
            catchError(error => of(CourseActions.requestSingleCourseFail({ error })))
          )
        )
      ));
    
      deleteCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.requestDeleteCourse),
        mergeMap(action => this.coursesService.deleteCourse(action.id)
          .pipe(
            map(() => CourseActions.requestDeleteCourseSuccess()),
            catchError(error => of(CourseActions.requestDeleteCourseFail({ error })))
          )
        )
      ));
    
      editCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.requestEditCourse),
        mergeMap(action => this.coursesStoreService.editCourse(action.id, action.course)
          .pipe(
            map((course: any) => CourseActions.requestEditCourseSuccess({ course })),
            catchError(error => of(CourseActions.requestEditCourseFail({ error })))
          )
        )
      ));
    
      createCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.requestCreateCourse),
        mergeMap(action => this.coursesService.createCourse(action.course)
          .pipe(
            map((course: any) => CourseActions.requestCreateCourseSuccess({ course })),
            catchError(error => of(CourseActions.requestCreateCourseFail({ error })))
          )
        )
      ));
    
      redirectToTheCoursesPage$ = createEffect(() => this.actions$.pipe(
        ofType(
          CourseActions.requestCreateCourseSuccess,
          CourseActions.requestEditCourseSuccess,
          CourseActions.requestSingleCourseFail
        ),
        map(() => this.router.navigate(['/courses']))
      ), { dispatch: false });
}
