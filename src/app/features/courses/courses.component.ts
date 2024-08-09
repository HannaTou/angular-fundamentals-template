import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from './courses.module';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { Router } from '@angular/router';
import { UserStoreService } from '@app/user/services/user-store.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {
  // Use the names for the input `course`.
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  public isAdmin?: boolean;
  private subscription?: Subscription;

  constructor(
    private coursesService: CoursesService,
    private coursesStore: CoursesStoreService,
    private router: Router,
    private userStoreService: UserStoreService,
  ) {
    this.courses$ = this.coursesStore.courses$;
    this.isLoading$ = this.coursesStore.isLoading$;
  }

  @Input() course! : CourseInfoComponent;
  @Input() editable! : boolean;

  placeholder = "Input text";
  addCourseBtn = "Add new course";
  showCourseBtn = "Show course";
  editBtn : IconProp = ['fas', 'pen'];
  removeBtn : IconProp = ['fas', 'trash'];

  ngOnInit(): void {
    this.userStoreService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    this.coursesStore.getAll().subscribe();
  }
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSearch(value: string): void {
    this.coursesStore.filterCourses([value]);
  }

  onAddCourse() {
    this.router.navigate(['/courses/add']);
  }

  onEditCourse(id: string) {
    this.router.navigate([`/courses/edit/${id}`]);
  }

  onShowCourse(id: string) {
    this.router.navigate([`/courses/${id}`]);
  }

}