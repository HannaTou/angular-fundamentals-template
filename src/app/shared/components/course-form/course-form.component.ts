import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CoursesStoreService } from '../../../services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { switchMap, forkJoin, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})

export class CourseFormComponent {

  courseId?: string;
  course?: any;
  isEditMode: boolean = false;

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private coursesStore: CoursesStoreService,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    library.addIconPacks(fas);
    this.courseForm =  this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.pattern('^[ \u0041-\u005A\u0061-\u007A0-9]+$'), Validators.minLength(2)]],        
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      courseAuthorIds: this.fb.array([]),
      duration: ['', [
        Validators.required,
        Validators.min(0)
      ]]
    })
  }
  
  ngOnInit() {
    this.loadAuthors();

    this.route.paramMap.pipe(
      switchMap(params => {
        const courseId = params.get('id');
        if (courseId) {
          this.isEditMode = true;
          return this.coursesStore.getCourse(courseId);
        } else {
          this.isEditMode = false;
          return of(null);
        }
      })
    ).subscribe(course => {
      if (course) {
        this.courseForm.patchValue({
          title: course.title,
          description: course.description,
          duration: course.duration
        });
      } else {
        this.courseForm.reset();
      }
    });
  }

  private loadAuthors() {
    this.coursesStore.getAllAuthors().pipe(
      switchMap(authorIds => {
        if (authorIds.length > 0) {
          return forkJoin(authorIds.map(id => this.coursesStore.getAuthorById(id)));
        } else {
          return [];
        }
      })
    ).subscribe({
      next: (authorNames) => {
        this.authors.clear();
        authorNames.forEach((authorName: string) => {
          this.authors.push(this.fb.control(authorName));
        });
      },
      error: (error) => console.error('Error fetching authors:', error),
      complete: () => console.log('Author loading completed')
    });
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors() {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  get courseAuthorIds() {
    return this.courseForm.get('courseAuthorIds') as FormArray;
  }

  get newAuthorName() {
    return this.courseForm.get('author');
  }

  onSubmitAuthor() {
    if (this.courseForm.get('author')?.invalid){
      this.courseForm.get('author')?.markAsTouched({onlySelf: true});
    } else {
      const newAuthorControl = this.fb.control(this.newAuthorName?.value, [Validators.minLength(2), Validators.pattern('^[ \u0041-\u005A\u0061-\u007A0-9]+$')]);
      this.authors.push(newAuthorControl);
      this.coursesStore.createAuthor(newAuthorControl.value);
      this.newAuthorName?.reset();
    }
  }

  onAddCourseAuthor(index: number){
    const authorControl = this.authors.at(index);
    if (authorControl) {
      this.authors.removeAt(index);
      this.courseAuthors.push(authorControl);
      this.coursesService.getAllAuthors().subscribe({
        next: (response: any) => {
          if (response.successful && Array.isArray(response.result)) {
            response.result.forEach((author: any) => {
              if (author.name === authorControl.value) {
                this.courseAuthorIds.push(this.fb.control(author.id));
             }
            });
          } else {
            console.error('Failed to fetch authors or the response format is incorrect');
          }
        },
        error: (error) => {
          console.error('Error fetching authors:', error);
        }
      });
    }
  }

  onDeleteAuthor(index:number){
    this.authors.removeAt(index);
  }

  onDeleteCourseAuthor(index: number){
    const courseAuthorControl = this.courseAuthors.at(index);
    this.courseAuthors.removeAt(index);
    this.courseAuthorIds.removeAt(index);
    this.authors.push(courseAuthorControl);
  }

  getAuthorControl(index: number): FormControl {
    return this.authors.at(index) as FormControl;
  }

  getCourseAuthorControl(index: number): FormControl {
    return this.courseAuthors.at(index) as FormControl;
  }

  courseForm!: FormGroup;
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  createAuthorBtn = "Create author";
  cancelBtn = "Cancel";
  createCourseBtn = "Create course";
  message = "Author list is empty";
  removeBtn : IconProp = ['fas', 'trash'];
  addBtn : IconProp = ['fas', 'plus'];

  onSubmitCourse(): void{
    if (this.courseForm.invalid){
      this.courseForm.controls['title'].markAsTouched({onlySelf: true});
      this.courseForm.controls['description'].markAsTouched({onlySelf: true});
      this.courseForm.controls['duration'].markAsTouched({onlySelf: true});
    } else if (this.isEditMode && this.courseId) {
      this.coursesStore.editCourse(this.courseId, {
           title: this.courseForm.controls['title'].value,
           description: this.courseForm.controls['description'].value,
           duration: this.courseForm.controls['duration'].value,
           authors: this.courseForm.controls['courseAuthorIds'].value
          }).subscribe(() => {
      });
    } else {
      this.coursesService.createCourse({
           title: this.courseForm.controls['title'].value,
           description: this.courseForm.controls['description'].value,
           duration: this.courseForm.controls['duration'].value,
           authors: this.courseForm.controls['courseAuthorIds'].value
         }).subscribe(() => {
      });
    }
    this.router.navigate(['/courses']);
  }
}
