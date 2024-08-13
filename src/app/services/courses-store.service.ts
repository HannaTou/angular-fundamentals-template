import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError, map, of, forkJoin } from 'rxjs';
import { CoursesService } from './courses.service';
import { tap, finalize, switchMap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    public isLoading$ = this.isLoading$$.asObservable();

    private courses$$ = new BehaviorSubject<any[]>([]);
    public courses$ = this.courses$$.asObservable();

    authors: string[] = [];

    constructor(
        private coursesService: CoursesService
    ) {}
    
    getAll(): Observable<any> {
        // Add your code here
        this.isLoading$$.next(true);
        return this.coursesService.getAll().pipe(
            switchMap(response => {
                if (!response.successful) {
                    throw new Error('Failed to fetch courses');
                }
                return forkJoin(
                    response.result.map((course: any) => 
                        forkJoin(
                            course.authors.map((authorId: string) => 
                                this.getAuthorById(authorId)
                            )
                        ).pipe(
                            map(authorNames => ({
                                ...course,
                                authors: authorNames
                            }))
                        )
                    )
                );
            }),
            tap((coursesWithAuthors: any) => {
                this.courses$$.next(coursesWithAuthors);
            }),
            catchError(error => {
                console.error('Error fetching courses:', error);
                this.courses$$.next([]);
                return of([]);
            }),
            tap(() => this.isLoading$$.next(false))
        );
    }

    filterCourses(value: string[]): any {
      // Add your code here
      this.isLoading$$.next(true);
      this.coursesService.filterCourses(value).pipe(
          switchMap(response => {
              if (!response.successful) {
                  throw new Error('Failed to fetch filtered courses');
              }
              return forkJoin(
                  response.result.map((course: any) => 
                      forkJoin(
                          course.authors.map((authorId: any) => 
                              this.getAuthorById(authorId)
                          )
                      ).pipe(
                          map(authorNames => ({
                              ...course,
                              authors: authorNames
                          }))
                      )
                  )
              );
          }),
          map((coursesWithAuthors: any) => {
              this.courses$$.next(coursesWithAuthors);
              return coursesWithAuthors;
          }),
          catchError(error => {
              console.error('Error filtering courses:', error);
              this.courses$$.next([]);
              return of([]);
          }),
          finalize(() => this.isLoading$$.next(false))
      ).subscribe()}

    createCourse(course: any): any { // replace 'any' with the required interface
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.createCourse(course).pipe(
            tap(() => {
                this.getAll();
                this.isLoading$$.next(false);
            }),
            catchError(error => {
                console.error('Failed to create course', error);
                this.isLoading$$.next(false);
                return throwError(() => new Error('Failed to create course'));
            })
        ).subscribe();
    }

    getCourse(id: string): Observable<any> {
        // Add your code here
        return this.coursesService.getCourse(id).pipe(
            switchMap(response => {
                if (!response || !response.successful) {
                  throw new Error('Failed to fetch course');
                }
                const course = response.result;
                return forkJoin(
                    course.authors.map((authorId: any) => 
                        this.getAuthorById(authorId)
                    )
                ).pipe(
                  map(authorNames => ({
                    ...course,
                    authors: authorNames
                  }))
                );
              }),
            )
    }

    editCourse(id: string, course: any): Observable<any> { // replace 'any' with the required interface
        // Add your code here
        return this.coursesService.editCourse(id, course);
    }

    deleteCourse(id: string): Observable<any> {
        // Add your code here
        this.isLoading$$.next(true);
        return this.coursesService.deleteCourse(id).pipe(
            tap(() => {
                this.getAll();
                this.isLoading$$.next(false);
            })
          );
    }

    getAllAuthors(): Observable<string[]> {
        // Add your code here
        return this.coursesService.getAllAuthors().pipe(
            catchError(error => {
              console.error('Error fetching authors', error);
              return throwError(() => error);
            }),
            map(response => {
              if (response.successful && response.result) {
                return response.result.map((item: any) => item.id);
              } else {
                return throwError(() => new Error('Unsuccessful response'));
              }
            })
          );
        }

    createAuthor(name: string) {
        // Add your code here
        return this.coursesService.createAuthor(name).subscribe();
    }

    getAuthorById(id: string): Observable<string> {
        // Add your code here
        return this.coursesService.getAuthorById(id).pipe(
            map(response => {
                if (response.successful && response.result) {
                  return response.result.name;
                }
            }
        ));
    }
}
