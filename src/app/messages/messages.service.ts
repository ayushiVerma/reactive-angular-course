import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class MessageService{
    
    private subject = new BehaviorSubject<string[]>([]);

    errors$: Observable<string[]> = this.subject.asObservable();

    showErros(...errors: string[]){
        console.log(errors);
        this.subject.next(errors);
    }
}
