import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CourseCardComponent } from '@app/shared/components';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})

export class CoursesListComponent {
  // Use the names for the input `course`.
  @Input() course! : CourseCardComponent;
  @Input() editable! : boolean;

  @Output() showCourse = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<void>();
  @Output() deleteCourse = new EventEmitter<void>();

  emitShowCourse() {
    this.showCourse.emit();
  }
  emitEditCourse() {
    this.showCourse.emit();
  }
  emitDeleteCourse() {
    this.showCourse.emit();
  }
}