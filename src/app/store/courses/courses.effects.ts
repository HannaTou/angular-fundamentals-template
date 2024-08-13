import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as CoursesActions from './courses.actions';
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
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() => this.coursesStoreService.getAll()
        .pipe(
          map(courses => CoursesActions.requestAllCoursesSuccess({ courses })),
          catchError(error => of(CoursesActions.requestAllCoursesFail({ error })))
        )
      )
    ));
    
    filteredCourses$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      withLatestFrom(this.coursesStateFacade.allCourses$),
       map(([action, courses]) => 
        courses?.filter(course => course.title.toLowerCase().includes(action.title.toLowerCase()))
      ),
      map(filteredCourses => CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses ? filteredCourses : [] })),
      catchError(error => of(CoursesActions.requestFilteredCoursesFail({ error })))
    ));
    
    getSpecificCourse$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap(action => this.coursesStoreService.getCourse(action.id)
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
          map(() => CoursesActions.requestDeleteCourseSuccess(action)),
          catchError(error => of(CoursesActions.requestDeleteCourseFail({ error })))
        )
      )
    ));
    
    editCourse$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap(action => this.coursesStoreService.editCourse(action.id, action.course)
        .pipe(
          map((course: any) => CoursesActions.requestEditCourseSuccess({ course })),
          catchError(error => of(CoursesActions.requestEditCourseFail({ error })))
        )
      )
    ));
    
    createCourse$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap((action: ReturnType<typeof CoursesActions.requestCreateCourse>) =>
        this.coursesStoreService.createCourse(action.course).pipe(
          map((course: any): Action => {
            return CoursesActions.requestCreateCourseSuccess({ course }) as Action;
          }),
          catchError((error: any): Observable<Action> => {
            return of(CoursesActions.requestCreateCourseFail({ error }) as Action);
          })
        )
      ),
      catchError((error: any): Observable<Action> => {
        return of(CoursesActions.requestCreateCourseFail({ error }) as Action);
      })
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
