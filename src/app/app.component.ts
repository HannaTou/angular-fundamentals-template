import { Component } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'courses-app';
  username = "Harry Potter";
  logoutLoginBtn = this.username ? "Logout" : "Login";

  infoTitle = "Your List is empty";
  infoText = "Please use 'Add New Course' button to add your first course";
  addNewBtn = "Add new course";

  editableVal = true;
  showCourseBtn = "Show course";
  editBtn : IconProp = ['fas', 'pen'];
  removeBtn : IconProp = ['fas', 'trash'];
  courseTitle = "Angular";
  courseDesc = "Angular is a popular open-source web application framework developed by Google. It is used for building single-page applications (SPAs), which are web applications or websites that interact with the user by dynamically rewriting the current web page with new data from the web server, instead of loading entire new pages. Angular uses TypeScript, a statically typed superset of JavaScript, which introduces powerful features like type checking, object-oriented programming principles, and decorators.";
  courseCreation = new Date('2022-11-15');
  courseDuration = 270;
  courseAuthors = ["Dave Haisenberg", "Tony Ja"];

  courseId = "AA515";
  
  loginBtn = "Login";
  displayCourse() {
  
  };
}
