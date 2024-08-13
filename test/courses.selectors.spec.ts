import { createFeatureSelector } from '@ngrx/store';
import { CoursesState, coursesFeatureKey } from '@app/store/courses/courses.reducer';
import {
    isAllCoursesLoadingSelector,
    isSearchingStateSelector,
    isSingleCourseLoadingSelector,
    getAllCourses,
    getCourse,
    getErrorMessage,
} from '@app/store/courses/courses.selectors';

describe('Courses Selectors', () => {
    const coursesState: CoursesState = {
        allCourses: null,
        course: null,
        isAllCoursesLoading: false,
        isSingleCourseLoading: true,
        isSearchState: false,
        errorMessage: 'An error occurred',
    };

    const appState = { [coursesFeatureKey]: coursesState };

    it('should select the courses feature state', () => {
        const selectedState = createFeatureSelector<CoursesState>(coursesFeatureKey)(appState);
        expect(selectedState).toEqual(coursesState);
    });

    it('should select the isAllCoursesLoading state', () => {
        const isLoading = isAllCoursesLoadingSelector(appState);
        expect(isLoading).toBe(false);
    });

    it('should select the isSearchingState state', () => {
        const isSearching = isSearchingStateSelector(appState);
        expect(isSearching).toBe(false);
    });

    it('should select the isSingleCourseLoading state', () => {
        const isSingleCourseLoading = isSingleCourseLoadingSelector(appState);
        expect(isSingleCourseLoading).toBe(true);
    });

    it('should select the allCourses state', () => {
        const allCourses = getAllCourses(appState);
        expect(allCourses).toBeNull();
    });

    it('should select the course state', () => {
        const course = getCourse(appState);
        expect(course).toBeNull();
    });

    it('should select the error message state', () => {
        const errorMessage = getErrorMessage(appState);
        expect(errorMessage).toBe('An error occurred');
    });
});
