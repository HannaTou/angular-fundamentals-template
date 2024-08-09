import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})

export class CourseInfoComponent implements OnInit{
  // Use the names for the input `course`.
  @Input() title! : string;
  @Input() description! : string;
  @Input() id!: string;
  @Input() creationDate!: Date;
  @Input() duration!: number;
  @Input() authors!: string[];

  backBtn = "Back";
//  courseId?: string;
  course?: any;

  constructor(
    private route: ActivatedRoute,
    private courseStore: CoursesStoreService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseStore.getCourse(id).subscribe({
        next: (course) => {
          this.course = course;
        },
        error: (error) => {
          console.error('Failed to fetch course:', error);
        }
      });
    } else {
      console.error('No course ID provided');
    }
  }

}
