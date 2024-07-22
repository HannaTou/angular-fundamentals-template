import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})

export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.courseForm =  this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.pattern('^[ \u0041-\u005A\u0061-\u007A0-9]+$'), Validators.minLength(2)]],        
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      duration: ['', [
        Validators.required,
        Validators.min(0)
      ]]
    })
  }
  
  get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors() {
    return this.courseForm.get('courseAuthors') as FormArray;
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
      this.newAuthorName?.reset();
    }
  }

  onAddAuthor(index: number){
    const authorControl = this.authors.at(index);
    this.authors.removeAt(index);
    this.courseAuthors.push(authorControl);
  }

  onDeleteAuthor(index:number){
    this.authors.removeAt(index);
  }

  onDeleteCourseAuthor(index: number){
    const courseAuthorControl = this.courseAuthors.at(index);
    this.courseAuthors.removeAt(index);
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
    }
  }
}
