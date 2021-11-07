import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  category = {
    title:'',
    description:'',
  };

  constructor(private _category: CategoryService,
    private _snake: MatSnackBar) { }

  ngOnInit(): void {
  }


  formSubmit(){
    if(this.category.title.trim()==''|| this.category.title== null){
      this._snake.open("Title Required!!",'',{
        duration:500,
        verticalPosition:'top',
      });
      return;
    }

    this._category.addCategory(this.category).subscribe((data: any)=>{
      this.category.title='';
      this.category.description='';
      Swal.fire('Success!!','Category added Successfully','success');
      
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error!!','Server Error!!','error');
    });


  }

}
