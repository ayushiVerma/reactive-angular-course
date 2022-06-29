import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';


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
    private loadingService:LoadingService,
    private coursesService: CoursesService
    ) {
  }

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses(){
    // this.loadingService.loadingOn();
    const course$ = this.coursesService.loadCousrse().pipe(
      map(c => c.sort(sortCoursesBySeqNo))
      // ,finalize(()=>{
      //   this.loadingService.loadingOff();
      // })
    );

    const loadCousrse$ = this.loadingService.showLoaderUntilCompleted(course$);

    this.beginnerCourses$ = loadCousrse$.pipe(
      map( courses => courses.filter( c => c.category === 'BEGINNER'))
    );

    this.advancedCourses$ = loadCousrse$.pipe(
      map(courses => courses.filter(c => c.category === 'ADVANCED'))
    );
  }
}




