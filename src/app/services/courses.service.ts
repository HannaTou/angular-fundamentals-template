import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../features/courses/courses.module';

const TOKEN = 'SESSION_TOKEN';
@Injectable({
    providedIn: 'root'
})

export class CoursesService {
    private baseUrl = 'http://localhost:4000';
    private filterUrl?: string;
    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        // Add your code here
        return this.http.get<Course[]>(`${this.baseUrl}/courses/all`);
    }

    filterCourses(value: string[]): Observable<any> {
        // Add your code here
        this.filterUrl = this.baseUrl + "/courses/filter" + (value? ("?title=" + value) : "");
        return this.http.get<Course[]>(this.filterUrl);
    }

    createCourse(course: any) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post(`${this.baseUrl}/courses/add`, course);
    }

    editCourse(id: string, course: any) { // replace 'any' with the required interface
        // Add your code here
        return this.http.put(`${this.baseUrl}/courses/${id}`, course);
    }

    getCourse(id: string): Observable<any> {
        // Add your code here
        return this.http.get<any>(`${this.baseUrl}/courses/${id}`);
    }

    deleteCourse(id: string) {
        // Add your code here
        return this.http.delete(`${this.baseUrl}/courses/${id}`);
    }

    getAllAuthors(): Observable<any>{
        // Add your code here
        return this.http.get(`${this.baseUrl}/authors/all`);
    }

    createAuthor(name: string) {
        // Add your code here
        return this.http.post(`${this.baseUrl}/authors/add`, {name: `${name}`});
    }

    getAuthorById(id: string): Observable<any> {
        // Add your code here
        return this.http.get(`${this.baseUrl}/authors/${id}`);
    }
}
