import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,
    private router: Router,
    private snake: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    emailId: '',
    phone: '',
  }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username==''|| this.user.username==null){
      // alert('User Is Required');
      this.snake.open('Username is required!!','',{
        duration:500,
      });
      return;
    }
    if(this.user.password==''|| this.user.password==null){
      // alert('User Is Required');
      this.snake.open('Password is required!!','',{
        duration:500,
      });
      return;
    }
    if(this.user.firstName==''|| this.user.firstName==null){
      // alert('User Is Required');
      this.snake.open('First Name is required!!','',{
        duration:500,
      });
      return;
    }
    if(this.user.emailId==''|| this.user.emailId==null){
      // alert('User Is Required');
      this.snake.open('Email address is required!!','',{
        duration:500,
      });
      return;
    }
    if(this.user.phone==''|| this.user.phone==null){
      // alert('User Is Required');
      this.snake.open('Enter Valid Contact Number','',{
        duration:500,
      });
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data)=>{
          console.log(data);
          // alert('Success');
          Swal.fire('Successfully Registered!!','Thank You!!','success');
          this.router.navigate(['user-dashboard/0']);
      },
      (error)=>{
          console.log(error);
          // alert('Something went wrong!!');
          this.snake.open('Username must be unique!!','',{
            duration: 10000,
          });
      }
    )
  }

}
