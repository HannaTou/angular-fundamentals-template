import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { CoursesEffects } from '@app/store/courses/courses.effects';
import * as CoursesActions from '@app/store/courses/courses.actions';
import { CoursesService } from '@app/services/courses.service';
import { Router } from '@angular/router';
//import { StoreService } from '@app/services/store.service';

const MOCK_COURSES = [{
    title: 'New Course',
    description: 'New Course description',
    creationDate: '9/3/2021',
    duration: 120,
    authors: [],
    id: "1"
}] as any[];

describe('CoursesEffects', () => {
    let actions$: Observable<any>;
    let effects: CoursesEffects;
    let coursesService: jest.Mocked<CoursesService>;
    let router: jest.Mocked<Router>;

    beforeEach(() => {
        coursesService = {
            getAll: jest.fn(),
            filterCourses: jest.fn(),
            getCourse: jest.fn(),
            deleteCourse: jest.fn(),
            editCourse: jest.fn(),
            createCourse: jest.fn(),
        } as any;

        router = {
            navigate: jest.fn(),
        } as any;

        TestBed.configureTestingModule({
            providers: [
                CoursesEffects,
                provideMockActions(() => actions$),
                { provide: CoursesService, useValue: coursesService },
                { provide: Router, useValue: router },
            ],
        });

        effects = TestBed.inject(CoursesEffects);
    });

    describe('getAll$', () => {
        it('should return requestAllCoursesSuccess action on success', () => {
            const courses = [{ id: 1, title: 'Course 1' }] as any;
            const action = CoursesActions.requestAllCourses();
            const completion = CoursesActions.requestAllCoursesSuccess({ courses });

            actions$ = of(action);
            coursesService.getAll.mockReturnValue(of(courses));

            effects.getAll$.subscribe((result) => {
                expect(result).toEqual(completion);
            });
        });

        it('should return requestAllCoursesFail action on failure', () => {
            const error = 'An error occurred';
            const action = CoursesActions.requestAllCourses();
            const completion = CoursesActions.requestAllCoursesFail({ error });

            actions$ = of(action);
            coursesService.getAll.mockReturnValue(throwError(error));

            effects.getAll$.subscribe((result) => {
                expect(result).toEqual(completion);
            });
        });
    });

    describe('filteredCourses$', () => {
        it('should return requestFilteredCoursesSuccess action on success', () => {
            const title = 'Course Title';
            const courses = [{ id: 1, title: 'Course 1' }];
            const action = CoursesActions.requestFilteredCourses({ title });
            const completion = CoursesActions.requestFilteredCoursesSuccess({ courses });

            actions$ = of(action);
            coursesService.filterCourses.mockReturnValue(of(courses));

            effects.filteredCourses$.subscribe((result) => {
                expect(result).toEqual(completion);
            });
        });

        it('should return requestFilteredCoursesFail action on failure', () => {
            const title = 'Course Title';
            const error = 'An error occurred';
            const action = CoursesActions.requestFilteredCourses({ title });
            const completion = CoursesActions.requestFilteredCoursesFail({ error });

            actions$ = of(action);
            coursesService.filterCourses.mockReturnValue(throwError(error));

            effects.filteredCourses$.subscribe((result) => {
                expect(result).toEqual(completion);
            });
        });
    });

    describe('getSpecificCourse$', () => {
        it('should return requestSingleCourseSuccess action on success', () => {
            const id = '1';
            const course = { id: 1, title: 'Course 1' } as any;
            const action = CoursesActions.requestSingleCourse({ id });
            const completion = CoursesActions.requestSingleCourseSuccess({ course });

            actions$ = of(action);
            coursesService.getCourse.mockReturnValue(of(course));

            effects.getSpecificCourse$.subscribe((result) => {
                expect(result).toEqual(completion);
            });
        });

        it('should return requestSingleCourseFail action on failure', () => {
            const id = '1';
            const error = 'An error occurred';
            const action = CoursesActions.requestSingleCourse({ id });
            const completion = CoursesActions.requestSingleCourseFail({ error });

            actions$ = of(action);
            coursesService.getCourse.mockReturnValue(throwError(error));

            effects.getSpecificCourse$.subscribe((result) => {
                expect(result).toEqual(completion);
            });
        });
    });

    describe('deleteCourse$', () => {
        it('should return requestAllCourses action on success', () => {
            const id = '1';
            const action = CoursesActions.requestDeleteCourse({ id });
            const completion = CoursesActions.requestAllCourses();

            actions$ = of(action);
            coursesService.deleteCourse.mockReturnValue(of());

            effects.deleteCourse$.subscribe((result) => {
                expect(result).toEqual(completion);
            });
        });

        it('should return requestDeleteCourseFail action on failure', () => {
            const id = '1';
            const error = 'An error occurred';
            const action = CoursesActions.requestDeleteCourse({ id });
            const completion = CoursesActions.requestDeleteCourseFail({ error });

            actions$ = of(action);
            coursesService.deleteCourse.mockReturnValue(throwError(error));

            effects.deleteCourse$.subscribe((result) => {
                expect(result).toEqual(completion);
            });
        });
    });

    describe('editCourse$', () => {
        it('should return requestEditCourseSuccess action on success', () => {
            const id = '1';
            const course = { id: 1, title: 'Course 1' };
            const action = CoursesActions.requestEditCourse({ id, course });
            const completion = CoursesActions.requestEditCourseSuccess({ course });

            actions$ = of(action);
            coursesService.editCourse.mockReturnValue(of());

            effects.editCourse$.subscribe((result) => {
                expect(result).toEqual(completion);
            });
        });

        it('should return requestEditCourseFail action on failure', () => {
            const id = '1';
            const course = { id: 1, title: 'Course 1' };
            const error = 'An error occurred';
            const action = CoursesActions.requestEditCourse({ id, course });
            const completion = CoursesActions.requestEditCourseFail({ error });

            actions$ = of(action);
            coursesService.editCourse.mockReturnValue(throwError(error));

            effects.editCourse$.subscribe((result) => {
                expect(result).toEqual(completion);
            });
        });
    });

    describe('createCourse$', () => {
        it('should return requestCreateCourseSuccess action on success', () => {
            const course = { id: 1, title: 'Course 1' };
            const action = CoursesActions.requestCreateCourse({ course });
            const completion = CoursesActions.requestCreateCourseSuccess({ course });

            actions$ = of(action);
            coursesService.createCourse.mockReturnValue(of());

            effects.createCourse$.subscribe((result) => {
                expect(result).toEqual(completion);
            });
        });

        it('should return requestCreateCourseFail action on failure', () => {
            const course = { id: 1, title: 'Course 1' };
            const error = 'An error occurred';
            const action = CoursesActions.requestCreateCourse({ course });
            const completion = CoursesActions.requestCreateCourseFail({ error });

            actions$ = of(action);
            coursesService.createCourse.mockReturnValue(throwError(error));

            effects.createCourse$.subscribe((result) => {
                expect(result).toEqual(completion);
            });
        });
    });

    describe('redirectToTheCoursesPage$', () => {
        it('should navigate to /courses when requestCreateCourseSuccess action is dispatched', () => {
            const action = CoursesActions.requestCreateCourseSuccess({ course: {} });

            actions$ = of(action);

            effects.redirectToTheCoursesPage$.subscribe(() => {
                expect(router.navigate).toHaveBeenCalledWith(['/courses']);
            });
        });

        it('should navigate to /courses when requestEditCourseSuccess action is dispatched', () => {
            const action = CoursesActions.requestEditCourseSuccess({ course: {} });

            actions$ = of(action);

            effects.redirectToTheCoursesPage$.subscribe(() => {
                expect(router.navigate).toHaveBeenCalledWith(['/courses']);
            });
        });

        it('should navigate to /courses when requestSingleCourseFail action is dispatched', () => {
            const action = CoursesActions.requestSingleCourseFail({ error: 'An error occurred' });

            actions$ = of(action);

            effects.redirectToTheCoursesPage$.subscribe(() => {
                expect(router.navigate).toHaveBeenCalledWith(['/courses']);
            });
        });
    });
});
