import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // beginnerCourses: Course[];

  // advancedCourses: Course[];

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    private http: HttpClient,
   
    private coursesService: CoursesService
    ) {
  }

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses(){
    const course$ = this.coursesService.loadCousrse().pipe(
      map(c => c.sort(sortCoursesBySeqNo))
    );

    this.beginnerCourses$ = course$.pipe(
      map( courses => courses.filter( c => c.category === 'BEGINNER'))
    );

    this.advancedCourses$ = course$.pipe(
      map(courses => courses.filter(c => c.category === 'ADVANCED'))
    );
  }
}




