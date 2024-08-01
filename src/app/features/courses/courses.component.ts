import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from './courses.module';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { Router } from '@angular/router';
import { UserStoreService } from '@app/user/services/user-store.service';
import { UserService } from '@app/user/services/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {
  // Use the names for the input `course`.
  courses: Course[] = [];
  courses$: Observable<Course[]>;
  public isAdmin?: boolean;

  constructor(
    private coursesService: CoursesService,
    private coursesStore: CoursesStoreService,
    private router: Router,
    private userStoreService: UserStoreService,
    private userService: UserService,
  ) {
    this.courses$ = this.coursesStore.courses$;
  }

  @Input() course! : CourseInfoComponent;
  @Input() editable! : boolean;

  @Output() showCourse = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<void>();
  @Output() deleteCourse = new EventEmitter<void>();

  emitShowCourse() {
    this.showCourse.emit();
  }

  emitEditCourse() {
    this.editCourse.emit();
  }

  emitDeleteCourse() {
    this.deleteCourse.emit();
  }

  placeholder = "Input text";
  addCourseBtn = "Add new course";

  ngOnInit(): void {
    this.userStoreService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    this.courses = this.coursesService.getCourses();
  }
  
  onSearch(value: string){
    console.log(value);
    this.coursesStore.getAll();
  }

  onAdd() {
    this.router.navigate(['/courses/add']);
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}