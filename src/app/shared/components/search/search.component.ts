import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { CoursesStoreService } from '../../../services/courses-store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
  public searchForm!: NgForm;

  searchBtn = "Search";
  searchInput: string[] = [];

  @Input() placeholder?: string;
  @Output() search = new EventEmitter<string>();

  constructor(private coursesStore: CoursesStoreService) {}

  onSubmit(): void {
    this.coursesStore.filterCourses(this.searchInput);
  }
}
