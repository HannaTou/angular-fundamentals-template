import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../features/courses/courses.module';

@Injectable({
    providedIn: 'root'
})

export class CoursesService {
    private baseUrl = 'http://localhost:4000';
    private url?: string;
    constructor(private http: HttpClient) {}

//    getCourses(): Course[]{
//        return [];
//    };

    getAll(): Observable<any> {
        // Add your code here
        return this.http.get<Course[]>('http://localhost:4000/courses/all');
    }

    filterCourses(value: string[]): Observable<any> {
        // Add your code here
        this.url = this.baseUrl + "/courses/filter" + (value? ("?title=" + value) : "");
        return this.http.get<Course[]>(this.url);
    }

    createCourse(course: any) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post('http://localhost:4000/courses/add', course);
    }

    editCourse(id: string, course: any) { // replace 'any' with the required interface
        // Add your code here
        return this.http.put(`http://localhost:4000/courses/${id}`, course);
    }

    getCourse(id: string): Observable<any> {
        // Add your code here
        return this.http.get<any>(`http://localhost:4000/courses/${id}`);
    }

    deleteCourse(id: string) {
        // Add your code here
        return this.http.delete(`http://localhost:4000/courses/${id}`);
    }

    getAllAuthors(): Observable<any>{
        // Add your code here
        return this.http.get('http://localhost:4000/authors/all');
    }

    createAuthor(name: string) {
        // Add your code here
        return this.http.post('http://localhost:4000/authors/add', name);
    }

    getAuthorById(id: string): Observable<any> {
        // Add your code here
        return this.http.get(`http://localhost:4000/authors/${id}`);
    }
}
