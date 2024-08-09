import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {

  isAdmin?: boolean;

  constructor(
    private userStoreService: UserStoreService,
  ) {}

  ngOnInit(): void {
    this.userStoreService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  @Input() editable! : boolean;
  @Input() title! : string;
  @Input() description! : string;
  @Input() creationDate! : string;
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
