
import * as CoursesActions from '@app/store/courses/courses.actions';
import { initialState, reducer } from '@app/store/courses/courses.reducer';

const MOCK_COURSES = [{
    title: 'New Course',
    description: 'New Course description',
    creationDate: '9/3/2021',
    duration: 120,
    authors: [],
    id: "1"
}] as any[];

describe('Courses Reducer', () => {
    it('should set isAllCoursesLoading to true on requestAllCourses', () => {
        const action = CoursesActions.requestAllCourses();
        const state = reducer(initialState, action);
        expect(state.isAllCoursesLoading).toBe(true);
    });

    it('should set allCourses and isAllCoursesLoading to false on requestAllCoursesSuccess', () => {
        const action = CoursesActions.requestAllCoursesSuccess({ courses: MOCK_COURSES });
        const state = reducer(initialState, action);
        expect(state.allCourses).toEqual(MOCK_COURSES);
        expect(state.isAllCoursesLoading).toBe(false);
    });

    it('should set isAllCoursesLoading and errorMessage on requestAllCoursesFail', () => {
        const error = 'Error fetching all courses';
        const action = CoursesActions.requestAllCoursesFail({ error });
        const state = reducer(initialState, action);
        expect(state.isAllCoursesLoading).toBe(false);
        expect(state.errorMessage).toEqual(error);
    });

    it('should set isSingleCourseLoading to true on requestSingleCourse', () => {
        const action = CoursesActions.requestSingleCourse({ id: '123' });
        const state = reducer(initialState, action);
        expect(state.isSingleCourseLoading).toBe(true);
    });

    it('should set course and isSingleCourseLoading to false on requestSingleCourseSuccess', () => {
        const action = CoursesActions.requestSingleCourseSuccess({ course: MOCK_COURSES[0] });
        const state = reducer(initialState, action);
        expect(state.course).toEqual(MOCK_COURSES[0]);
        expect(state.isSingleCourseLoading).toBe(false);
    });

    it('should set isSingleCourseLoading and errorMessage on requestSingleCourseFail', () => {
        const error = 'Error fetching single course';
        const action = CoursesActions.requestSingleCourseFail({ error });
        const state = reducer(initialState, action);
        expect(state.isSingleCourseLoading).toBe(false);
        expect(state.errorMessage).toEqual(error);
    });

    it('should set isAllCoursesLoading to true on requestFilteredCourses', () => {
        const action = CoursesActions.requestFilteredCourses({ title: 'Filter' });
        const state = reducer(initialState, action);
        expect(state.isAllCoursesLoading).toBe(true);
    });

    it('should set allCourses and isAllCoursesLoading to false on requestFilteredCoursesSuccess', () => {
        const action = CoursesActions.requestFilteredCoursesSuccess({ courses: MOCK_COURSES });
        const state = reducer(initialState, action);
        expect(state.allCourses).toEqual(MOCK_COURSES);
        expect(state.isAllCoursesLoading).toBe(false);
    });

    it('should set isAllCoursesLoading and errorMessage on requestFilteredCoursesFail', () => {
        const error = 'Error fetching filtered courses';
        const action = CoursesActions.requestFilteredCoursesFail({ error });
        const state = reducer(initialState, action);
        expect(state.isAllCoursesLoading).toBe(false);
        expect(state.errorMessage).toEqual(error);
    });

    it('should clear errorMessage on requestDeleteCourse', () => {
        const action = CoursesActions.requestDeleteCourse({ id: '123' });
        const state = reducer({ ...initialState, errorMessage: 'Error deleting course' }, action);
        expect(state.errorMessage).toEqual('');
    });

    it('should not modify the state on requestDeleteCourseSuccess', () => {
        const action = CoursesActions.requestDeleteCourseSuccess({ id: '123' });
        const state = reducer(initialState, action);
        expect(state).toEqual(initialState);
    });

    it('should set errorMessage on requestDeleteCourseFail', () => {
        const error = 'Error deleting course';
        const action = CoursesActions.requestDeleteCourseFail({ error });
        const state = reducer(initialState, action);
        expect(state.errorMessage).toEqual(error);
    });

    it('should clear errorMessage on requestEditCourse', () => {
        const action = CoursesActions.requestEditCourse({id: '1', course: MOCK_COURSES[0]});
        const state = reducer({ ...initialState, errorMessage: 'Error editing course' }, action);
        expect(state.errorMessage).toEqual('');
    });

    it('should update course on requestEditCourseSuccess', () => {
        const action = CoursesActions.requestEditCourseSuccess({ course: MOCK_COURSES[0] });
        const state = reducer(initialState, action);
        expect(state.course).toEqual(MOCK_COURSES[0]);
    });

    it('should set errorMessage on requestEditCourseFail', () => {
      const error = 'Error editing course';
      const action = CoursesActions.requestEditCourseFail({ error });
      const state = reducer(initialState, action);
      expect(state.errorMessage).toEqual(error);
    });

    it('should clear errorMessage on requestCreateCourse', () => {
      const action = CoursesActions.requestCreateCourse({course: MOCK_COURSES[0]});
      const state = reducer({ ...initialState, errorMessage: 'Error creating course' }, action);
      expect(state.errorMessage).toEqual('');
    });

    it('should set errorMessage on requestCreateCourseFail', () => {
      const error = 'Error creating course';
      const action = CoursesActions.requestCreateCourseFail({ error });
      const state = reducer(initialState, action);
      expect(state.errorMessage).toEqual(error);
    });

    it('should return the current state by default', () => {
      const action = { type: 'Unknown Action' };
      const state = reducer(initialState, action);
      expect(state).toBe(initialState);
    });
});
