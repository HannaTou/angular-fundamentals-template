import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoursesService } from './courses.service';
import { Course } from '../features/courses/courses.module';

@Injectable({
    providedIn: 'root'
})

export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    public isLoading$ = this.isLoading$$.asObservable();

    private courses$$ = new BehaviorSubject<any[]>([]);
    public courses$ = this.courses$$.asObservable();

    constructor(private coursesService: CoursesService) {}
    
    getAll(){
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.getAll().pipe(
            tap((courses: any) => {
                this.courses$$.next(courses);
                this.isLoading$$.next(false);
            })
          ).subscribe();
    }

    createCourse(course: Observable<Course>) { // replace 'any' with the required interface
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.createCourse(course).pipe(
            tap(() => {
                this.getAll();
                this.isLoading$$.next(false);
            })
          ).subscribe();
    }

    getCourse(id: string) {
        // Add your code here
        return this.coursesService.getCourse(id);
    }

    editCourse(id: string, course: Observable<Course>) { // replace 'any' with the required interface
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.editCourse(id, course).pipe(
            tap(() => {
                this.getAll();
                this.isLoading$$.next(false);
            })
          ).subscribe();
    }

    deleteCourse(id: string) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.deleteCourse(id).pipe(
            tap(() => {
                this.getAll();
                this.isLoading$$.next(false);
            })
          ).subscribe();
    }

    filterCourses(value: string[]) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.filterCourses(value).pipe(
            tap((courses: any) => {
                this.courses$$.next(courses);
                this.isLoading$$.next(false);
            })
          ).subscribe();
    }

    getAllAuthors() {
        // Add your code here
        return this.coursesService.getAllAuthors();
    }

    createAuthor(name: string) {
        // Add your code here
        return this.coursesService.createAuthor(name);
    }

    getAuthorById(id: string) {
        // Add your code here
        return this.coursesService.getAuthorById(id);
    }

    searchCourses(value: string[]): void {
        this.isLoading$$.next(true);
        this.coursesService.filterCourses(value).pipe(
          tap((courses: Course[]) => {
            this.courses$$.next(courses);
            this.isLoading$$.next(false);
          })
        ).subscribe();
      }
}
