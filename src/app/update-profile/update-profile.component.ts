import { Component, OnInit } from '@angular/core';
import { CreateUser, DeleteUser, Gender, UpdateUser, User, UserService } from '@app/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'sf-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
	user$: Observable<User>
  constructor(private store: Store<any>, private userService : UserService ) { 
  	this.user$ = this.store.select('user').pipe(map(data => data.user));
  }

  ngOnInit() {
  }
  create(){
    this.store.dispatch(new CreateUser({name: "test", birthdate: "1993-05-09T00:00:00Z", gender: Gender.NON_BINARY, catchPhrase: "on s'boit un godet?", description: "je veux voler les pauvres"}));
    //this.userService.createUser({name: "test", birthdate: "1993-05-09T00:00:00Z", sex: Sex.OTHER, catchPhrase: "on s'boit un godet?", description: "je veux voler les pauvres"}).subscribe(data => console.log(data));
  }
  update(){
    this.store.dispatch(new UpdateUser({name: "juju", birthdate: "1993-05-09T00:00:00Z", gender: Gender.NON_BINARY, catchPhrase: "on s'boit un godet?", description: "je veux voler les pauvres"}));
    //this.userService.updateUser({name: "NIEUW", birthdate: "1993-05-09T00:00:00Z", sex: Sex.OTHER, catchPhrase: "on s'boit un godet?", description: "je veux voler les pauvres"}).subscribe(data => console.log(data));
  }
  // get(){
  //   this.store.dispatch(new GetUser());
  //   //this.userService.getUser().subscribe((data: User) => this.setUser(data));
  // }
  delete(){
    this.store.dispatch(new DeleteUser());
    //this.userService.deleteUser().subscribe(data => console.log(data));
  }


}
