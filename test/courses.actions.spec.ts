import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
    requestAllCourses,
    requestAllCoursesFail,
    requestAllCoursesSuccess,
    requestCreateCourse,
    requestCreateCourseFail,
    requestCreateCourseSuccess,
    requestDeleteCourse,
    requestDeleteCourseFail,
    requestDeleteCourseSuccess,
    requestEditCourse,
    requestEditCourseFail,
    requestEditCourseSuccess,
    requestFilteredCourses,
    requestFilteredCoursesFail,
    requestFilteredCoursesSuccess,
    requestSingleCourse,
    requestSingleCourseFail,
    requestSingleCourseSuccess
} from '@app/store/courses/courses.actions';
import { CoursesConstants } from '@app/store/courses/courses.constants';

const MOCK_COURSES = [{
    title: 'New Course',
    description: 'New Course description',
    creationDate: '9/3/2021',
    duration: 120,
    authors: [],
    id: "1"
}] as any[];

describe('Course Actions', () => {
    let store: Store<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            providers: [provideMockStore()]
        });

        store = TestBed.inject(Store);
    });

    it('should create requestAllCourses action', () => {
        const action = requestAllCourses();
        expect(action.type).toEqual(CoursesConstants.REQUEST_ALL_COURSES);
    });

    it('should create requestAllCoursesSuccess action', () => {
        const action = requestAllCoursesSuccess({ courses: MOCK_COURSES });
        expect(action.type).toEqual(CoursesConstants.REQUEST_ALL_COURSES_SUCCESS);
        expect(action.courses).toEqual(MOCK_COURSES);
    });

    it('should create requestAllCoursesFail action', () => {
        const error = 'Error fetching courses';
        const action = requestAllCoursesFail({ error });
        expect(action.type).toEqual(CoursesConstants.REQUEST_ALL_COURSES_FAIL);
        expect(action.error).toEqual(error);
    });

    it('should create requestSingleCourse action', () => {
        const courseId = '1';
        const action = requestSingleCourse({id: courseId});
        expect(action.type).toEqual(CoursesConstants.REQUEST_SINGLE_COURSE);
        expect(action.id).toEqual(courseId);
    });

    it('should create requestSingleCourseSuccess action', () => {
        const action = requestSingleCourseSuccess({ course: MOCK_COURSES[0] });
        expect(action.type).toEqual(CoursesConstants.REQUEST_SINGLE_COURSE_SUCCESS);
        expect(action.course).toEqual(MOCK_COURSES[0]);
    });

    it('should create requestSingleCourseFail action', () => {
        const error = 'Error fetching course';
        const action = requestSingleCourseFail({ error });
        expect(action.type).toEqual(CoursesConstants.REQUEST_SINGLE_COURSE_FAIL);
        expect(action.error).toEqual(error);
    });

    it('should create requestFilteredCourses action', () => {
        const title = 'qwerty';
        const action = requestFilteredCourses({title: title});
        expect(action.type).toEqual(CoursesConstants.REQUEST_FILTERED_COURSES);
        expect(action.title).toEqual(title);
    });

    it('should create requestFilteredCoursesSuccess action', () => {
        const action = requestFilteredCoursesSuccess({ courses: MOCK_COURSES });
        expect(action.type).toEqual(CoursesConstants.REQUEST_FILTERED_COURSES_SUCCESS);
        expect(action.courses).toEqual(MOCK_COURSES);
    });

    it('should create requestDeleteCourse action', () => {
        const courseId = '1';
        const action = requestDeleteCourse({id: courseId});
        expect(action.type).toEqual(CoursesConstants.REQUEST_DELETE_COURSE);
        expect(action.id).toEqual(courseId);
    });

    it('should create requestDeleteCourseSuccess action', () => {
        const courseId = '1';
        const action = requestDeleteCourseSuccess({ id: courseId });
        expect(action.type).toEqual(CoursesConstants.REQUEST_DELETE_COURSE_SUCCESS);
        expect(action.id).toEqual(courseId);
    });

    it('should create requestDeleteCourseFail action', () => {
        const error = 'Error fetching course';
        const action = requestDeleteCourseFail({ error });
        expect(action.type).toEqual(CoursesConstants.REQUEST_DELETE_COURSE_FAIL);
        expect(action.error).toEqual(error);
    });

    it('should create requestEditCourse action', () => {
        const courseId = '1';
        const action = requestEditCourse({id: courseId, course: MOCK_COURSES[0]});
        expect(action.type).toEqual(CoursesConstants.REQUEST_EDIT_COURSE);
        expect(action.id).toEqual(courseId);
        expect(action.course).toEqual(MOCK_COURSES[0]);
    });

    it('should create requestEditCourseSuccess action', () => {
        const action = requestEditCourseSuccess({ course: MOCK_COURSES[0] });
        expect(action.type).toEqual(CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS);
        expect(action.course).toEqual(MOCK_COURSES[0]);
    });

    it('should create requestEditCourseFail action', () => {
        const error = 'Error fetching course';
        const action = requestEditCourseFail({ error });
        expect(action.type).toEqual(CoursesConstants.REQUEST_EDIT_COURSE_FAIL);
        expect(action.error).toEqual(error);
    });

    it('should create requestCreateCourse action', () => {
        const courseId = '1';
        const action = requestCreateCourse({course: MOCK_COURSES[0]});
        expect(action.type).toEqual(CoursesConstants.REQUEST_CREATE_COURSE);
        expect(action.course).toEqual(MOCK_COURSES[0]);
    });

    it('should create requestCreateCourseSuccess action', () => {
        const action = requestCreateCourseSuccess({ course: MOCK_COURSES[0] });
        expect(action.type).toEqual(CoursesConstants.REQUEST_CREATE_COURSE_SUCCESS);
        expect(action.course).toEqual(MOCK_COURSES[0]);
    });

    it('should create requestCreateCourseFail action', () => {
        const error = 'Error fetching course';
        const action = requestCreateCourseFail({ error });
        expect(action.type).toEqual(CoursesConstants.REQUEST_CREATE_COURSE_FAIL);
        expect(action.error).toEqual(error);
    });
});


