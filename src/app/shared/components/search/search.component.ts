import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms'; 

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
  searchInput = '';

  @Input() placeholder?: string;
  @Output() search = new EventEmitter<string>();

  onSubmit(value: any) {
    this.search.emit(value);
  }
}
