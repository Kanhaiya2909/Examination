import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[
    {
      cid:1,
      title:'Java'
    }
  ];
  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions:'',
    active: true,
    category: {
      cid:'',
    }
  }

  constructor(public _cate: CategoryService,
     private _snake: MatSnackBar,
     private _quiz: QuizService) { }

  ngOnInit(): void {
    this._cate.categories().subscribe(
      (data: any)=>{
        this.categories = data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!','error in loading data!!', 'error');
      }
    );
  }

  addQuiz(){
    if(this.quizData.title.trim() == ''||this.quizData.title == null){
      this._snake.open('Title Required !!','',{
        duration:1000,
      });
      return;
    }

    this._quiz.addQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire('Success','Quiz Is Added','success')
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions:'',
          active: true,
          category: {
            cid:'',
          },
        };
      },
      (error)=>{
        Swal.fire('Error!!','Error While Adding Quiz','error')
        console.log(error);
      }
    )

  }
}
