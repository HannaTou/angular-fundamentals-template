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
        return this.http.get('/courses');
    }

    createCourse(course: Observable<any>) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post('/courses', course);
    }

    editCourse(id: string, course: Observable<any>) { // replace 'any' with the required interface
        // Add your code here
        return this.http.put(`/courses/${id}`, course);
    }

    getCourse(id: string) {
        // Add your code here
        return this.http.get(`/courses/${id}`);
    }

    deleteCourse(id: string) {
        // Add your code here
        return this.http.delete(`/courses/${id}`);
    }

    filterCourses(value: string): Observable<Course[]> {
        // Add your code here
        return this.http.get<Course[]>(`/courses?filter=${value}`);
    }

    getAllAuthors() {
        // Add your code here
        return this.http.get('/authors');
    }

    createAuthor(name: string) {
        // Add your code here
        return this.http.post('/authors', { name });
    }

    getAuthorById(id: string) {
        // Add your code here
        return this.http.get(`/authors/${id}`);
    }
}
