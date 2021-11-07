import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
  qId: any;
  
  qTitle: any;
  questions = [
    {
      quesId: '',
      content: '',
      image: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: ''
    }
  ];

  constructor(private _route:ActivatedRoute,
    private _snake: MatSnackBar,
    private _question: QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any)=>{
        console.log(data);
        this.questions = data;
      },
      (error)=>{
        console.log(error);
      }
    )
    console.log(this.qId);
    console.log(this.qTitle);
  }

  deleteQuestion(qid: any){
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'DELETE',
      title:'Are You Sure',

    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(qid).subscribe((data)=>{
          this._snake.open('Question Deleted','',{
            duration:200,
          });
          this.questions = this.questions.filter((q)=>q.quesId !=qid);
        },
        (error)=>{
          this._snake.open('Error in Deleting Questions','',{
            duration:1000,
          })
        }
        );
      }
    })
  }

}
