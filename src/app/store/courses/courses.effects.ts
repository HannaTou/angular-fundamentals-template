import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CoursesService } from '@app/services/courses.service';
import * as CoursesActions from './courses.actions';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private router: Router
    ) {}

    // Add your code here
    getAll$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() => this.coursesService.getAll()
        .pipe(
          map((courses: any[]) => CoursesActions.requestAllCoursesSuccess({ courses })),
          catchError(error => of(CoursesActions.requestAllCoursesFail({ error })))
        )
      )
    ));

    filteredCourses$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      withLatestFrom(this.coursesService.getAll()),
      switchMap(([action, courses]) => {
        if (!courses) {
          return of(CoursesActions.requestFilteredCoursesFail({ error: 'No courses available' }));
        }
        const filteredCourses = courses.filter((course: any) => course.title.toLowerCase().includes(action.title.toLowerCase()));
        return of(CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses }));
      }),
      catchError(error => of(CoursesActions.requestFilteredCoursesFail({ error: error.message || 'Unknown error' })))
    ));

  getSpecificCourse$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap(action => this.coursesService.getCourse(action.id)
          .pipe(
              map(course => CoursesActions.requestSingleCourseSuccess({ course })),
              catchError(error => of(CoursesActions.requestSingleCourseFail({ error })))
          )
      )
  ));

  deleteCourse$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap(action => this.coursesService.deleteCourse(action.id)
          .pipe(
              map(() => CoursesActions.requestDeleteCourseSuccess({ id: action.id })),
              catchError(error => of(CoursesActions.requestDeleteCourseFail({ error })))
          )
      )
  ));

  editCourse$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap(action => this.coursesService.editCourse(action.course, action.id)
          .pipe(
              map(() => CoursesActions.requestEditCourseSuccess({ course: action.course })),
              catchError(error => of(CoursesActions.requestEditCourseFail({ error })))
          )
      )
  ));

  createCourse$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap(action => this.coursesService.createCourse(action.course)
          .pipe(
              map(course => CoursesActions.requestCreateCourseSuccess({ course })),
              catchError(error => of(CoursesActions.requestCreateCourseFail({ error })))
          )
      )
  ));

  redirectToTheCoursesPage$ = createEffect(() => this.actions$.pipe(
      ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess,
          CoursesActions.requestSingleCourseFail
      ),
      map(() => this.router.navigate(['/courses']))
  ), { dispatch: false });
}
