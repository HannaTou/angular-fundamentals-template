import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {

  @Input() editable! : boolean;
  @Input() title! : string;
  @Input() description! : string;
  @Input() creationDate! : Date;
  @Input() duration! : number;
  @Input() authors! : string[];
  
  showCourseBtn = "Show course";
  editBtn : IconProp = ['fas', 'pen'];
  removeBtn : IconProp = ['fas', 'trash'];

  @Output() clickOnShow = new EventEmitter<void>();

  emitShowCourse() {
    this.clickOnShow.emit();
  }
}
