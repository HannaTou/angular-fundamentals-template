import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { CoursesState, initialState } from '@app/store/courses/courses.reducer';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import {
    getAllCourses, getCourse, getErrorMessage,
    isAllCoursesLoadingSelector, isSearchingStateSelector,
    isSingleCourseLoadingSelector
} from '@app/store/courses/courses.selectors';
import * as CoursesActions from '@app/store/courses/courses.actions';

const MOCK_COURSES = [{
    title: 'New Course',
    description: 'New Course description',
    creationDate: '9/3/2021',
    duration: 120,
    authors: [],
    id: "1"
}] as any[];

describe('CoursesStateFacade', () => {
    let store: MockStore<CoursesState>;
    let facade: CoursesStateFacade;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CoursesStateFacade, provideMockStore({ initialState })],
        });

        store = TestBed.inject(Store) as MockStore<CoursesState>;
        facade = TestBed.inject(CoursesStateFacade);
    });

    describe('selectors', () => {
        it('should select isAllCoursesLoading', () => {
            const isAllCoursesLoading = true;
            store.overrideSelector(isAllCoursesLoadingSelector, isAllCoursesLoading);

            facade.isAllCoursesLoading$.subscribe((result) => {
                expect(result).toEqual(isAllCoursesLoading);
            });
        });

        it('should select isSingleCourseLoading', () => {
            const isSingleCourseLoading = true;
            store.overrideSelector(isSingleCourseLoadingSelector, isSingleCourseLoading);

            facade.isSingleCourseLoading$.subscribe((result) => {
                expect(result).toEqual(isSingleCourseLoading);
            });
        });

        it('should select isSearchingState', () => {
            const isSearchingState = true;
            store.overrideSelector(isSearchingStateSelector, isSearchingState);

            facade.isSearchingState$.subscribe((result) => {
                expect(result).toEqual(isSearchingState);
            });
        });

        it('should select courses', () => {
            store.overrideSelector(getAllCourses, MOCK_COURSES);

            facade.courses$.subscribe((result) => {
                expect(result).toEqual(MOCK_COURSES);
            });
        });

        it('should select allCourses', () => {
            store.overrideSelector(getAllCourses, MOCK_COURSES);

            facade.allCourses$.subscribe((result) => {
                expect(result).toEqual(MOCK_COURSES);
            });
        });

        it('should select course', () => {
            const course = { id: 1, title: 'Course 1' };
            store.overrideSelector(getCourse, course);

            facade.course$.subscribe((result) => {
                expect(result).toEqual(course);
            });
        });

        it('should select errorMessage', () => {
            const errorMessage = 'An error occurred';
            store.overrideSelector(getErrorMessage, errorMessage);

            facade.errorMessage$.subscribe((result) => {
                expect(result).toEqual(errorMessage);
            });
        });
    });

    describe('methods', () => {
        it('should dispatch requestAllCourses action when calling getAllCourses', () => {
            const action = CoursesActions.requestAllCourses;
            const dispatchSpy = jest.spyOn(store, 'dispatch');

            facade.getAllCourses();

            expect(dispatchSpy).toHaveBeenCalledWith(action());
        });

        it('should dispatch requestSingleCourse action with the provided id when calling getSingleCourse', () => {
            const id = '1';
            const action = CoursesActions.requestSingleCourse({ id });
            const dispatchSpy = jest.spyOn(store, 'dispatch');

            facade.getSingleCourse(id);

            expect(dispatchSpy).toHaveBeenCalledWith(action);
        });

        it('should dispatch requestFilteredCourses action with the provided searchValue when calling getFilteredCourses', () => {
            const searchValue = 'Course Title';
            const action = CoursesActions.requestFilteredCourses({ title: searchValue });
            const dispatchSpy = jest.spyOn(store, 'dispatch');

            facade.getFilteredCourses(searchValue);

            expect(dispatchSpy).toHaveBeenCalledWith(action);
        });

        it('should dispatch requestEditCourse action with the provided body and id when calling editCourse', () => {
            const id = '1';
            const action = CoursesActions.requestEditCourse({ id, course: MOCK_COURSES[0] });
            const dispatchSpy = jest.spyOn(store, 'dispatch');

            facade.editCourse(MOCK_COURSES[0], id);

            expect(dispatchSpy).toHaveBeenCalledWith(action);
        });

        it('should dispatch requestCreateCourse action with the provided body when calling createCourse', () => {
            const action = CoursesActions.requestCreateCourse({ course: MOCK_COURSES[0] });
            const dispatchSpy = jest.spyOn(store, 'dispatch');

            facade.createCourse(MOCK_COURSES[0]);

            expect(dispatchSpy).toHaveBeenCalledWith(action);
        });

        it('should dispatch requestDeleteCourse action with the provided id when calling deleteCourse', () => {
            const id = '1';
            const action = CoursesActions.requestDeleteCourse({ id });
            const dispatchSpy = jest.spyOn(store, 'dispatch');

            facade.deleteCourse(id);

            expect(dispatchSpy).toHaveBeenCalledWith(action);
        });
    });
});
