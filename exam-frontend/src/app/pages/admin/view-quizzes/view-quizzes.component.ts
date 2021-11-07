import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [

    {
      qId:1,
      title:'title',
      description: 'description',
      maxMarks: '1',
      numberOfQuestions: '1',
      active: '',
      category: {
        title: 'title',
      },
    },
  ]

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any)=>{
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!','Error in loading data!!','error');
      }
    )
  }

  deleteQuiz(qId: any){
    Swal.fire({
      icon: 'question',
      title: 'Are You Sure?',
      confirmButtonText:'DELETE',
      showCancelButton:true,

    }).then((result)=>{
      if(result.isConfirmed){
        
    this._quiz.deleteQuiz(qId).subscribe((data)=>{
      this.quizzes = this.quizzes.filter((quiz)=>quiz.qId != qId);
      Swal.fire('Successfully Deleted','Quiz Deleted','success');
    },(error)=>{
      Swal.fire('Error','Error In Deleting Quiz','error');
    });
      }
    })
  }

}
