import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../features/courses/courses.module';

@Injectable({
    providedIn: 'root'
})

export class CoursesService {
    constructor(private http: HttpClient) {}

    getCourses(): Course[]{
        return [];
    };

    getAll() {
        // Add your code here
        return this.http.get('http://localhost:4000/courses/all');
    }

    createCourse(course: Observable<any>) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post('http://localhost:4000/courses/add', course);
    }

    editCourse(id: string, course: Observable<any>) { // replace 'any' with the required interface
        // Add your code here
        return this.http.put(`http://localhost:4000/courses/${id}`, course);
    }

    getCourse(id: string) {
        // Add your code here
        return this.http.get(`http://localhost:4000/courses/${id}`);
    }

    deleteCourse(id: string) {
        // Add your code here
        return this.http.delete(`http://localhost:4000/courses/${id}`);
    }

    filterCourses(value: string): Observable<any> {
        // Add your code here
        return this.http.get(`http://localhost:4000/courses/filter?value=${value}`);
    }

    getAllAuthors() {
        // Add your code here
        return this.http.get('http://localhost:4000/authors/all');
    }

    createAuthor(name: string) {
        // Add your code here
        return this.http.post('http://localhost:4000/authors/add', { name });
    }

    getAuthorById(id: string) {
        // Add your code here
        return this.http.get(`http://localhost:4000/authors/${id}`);
    }
}
