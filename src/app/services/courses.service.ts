import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CoursesService{

    constructor(private httpClient: HttpClient){

    }

    loadCousrse(): Observable<Course[]>{
        return this.httpClient.get<Course[]>('/api/courses').pipe(
            map(res => res["payload"]),
            shareReplay()
        );
    }

    saveCourse(courseId: string, changes: Partial<Course>) : Observable<any>{
        return this.httpClient.put(`/api/courses/${courseId}`, changes);
    }
}