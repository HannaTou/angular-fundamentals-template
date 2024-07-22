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
      newAuthor: this.fb.group({
        author: ['', [Validators.pattern('[ a-zA-Z ]*'), Validators.minLength(2)]],
        authors: this.fb.array([]),
      }),
      duration: ['', [
        Validators.required,
        Validators.min(0)
      ]]
    })
  }
  
  get authors() {
    return this.courseForm.get('newAuthor.authors') as FormArray;
  }

  onSubmitAuthor() {
    const authorName = this.courseForm.get('newAuthor.author')?.value;
    if (authorName) {
      this.authors.push(this.fb.control({value: authorName, disabled: true}));
      this.courseForm.get('newAuthor.author')?.reset();
    }
  }

  getAuthorControl(index: number): FormControl {
    return this.authors.at(index) as FormControl;
  }

  courseForm!: FormGroup;
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  createAuthorBtn = "Create author";
  cancelBtn = "Cancel";
  createCourseBtn = "Create course";
  removeBtn : IconProp = ['fas', 'trash'];

  onSubmitCourse(): void{
    if (this.courseForm.invalid){
      this.courseForm.controls['title'].markAsTouched({onlySelf: true});
      this.courseForm.controls['description'].markAsTouched({onlySelf: true});
      this.courseForm.controls['duration'].markAsTouched({onlySelf: true});
    }
  }
}
