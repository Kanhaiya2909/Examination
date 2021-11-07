import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit {
  categories: any;
  

  constructor(private _cat: CategoryService, private _snake: MatSnackBar) { }

  ngOnInit(): void {
    this._cat.categories().subscribe((data: any)=>{
      this.categories = data;
    },
    (error)=>{
      this._snake.open('Error','',{
        duration:500,
      });
    }
    )
  }

}
