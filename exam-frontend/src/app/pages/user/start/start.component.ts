import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid: any;
  questions: any[];
  isSubmit = false;
  filter_source_type: null;

  timer: any;

  marksGot: string | number;
  correctAnswers: string | number;
  attempted: number;
  // givenAnswer = '';

  constructor(
    private locationSt:LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    this.loadQuestions();
  }
  loadQuestions() {
     this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data:any)=>{
      this.questions = data;
      this.timer = this.questions.length*2*60;

      // this.questions.forEach((q: any)=>{
      //   q['givenAnswer'] = '';
      // });

      console.log(this.questions);
      this.startTimer();

     },(error)=>{
       Swal.fire('Error','Something Went Wrong!!','error');
     })
  }

  preventBackButton(){
    history.pushState(null,'null' , location.href);
    
    this.locationSt.onPopState(()=>{
      history.pushState(null, 'null', location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title:'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e)=>{
      if(e.isConfirmed){
        this.isSubmit = true;
        this.evalQuiz();
      }
    })
    // this.questions.forEach((q: any)=>{
    //   if(q.givenAnswer == q.answer){
    //     this.correctAnswers++;
    //     let markSingle = this.questions[0].quiz.maxMarks/this.questions.length;
    //     this.marksGot +=markSingle;
    //   }
    //   if(q.givenAnswer.trim() != ''){
    //     this.attempted++;
    //   }
      
    // })

    console.log("Correct Answer: "+ this.correctAnswers);
      console.log('Marks Got '+ this.marksGot);
  }

  startTimer(){
    let t = window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;

      }
    }, 1000);
  }

  getFormattedtime(){
    let mm= Math.floor(this.timer/60);
    let ss = this.timer-mm*60;
    return `${mm} : ${ss}`;
  }

  evalQuiz(){
    
    this._question.evalQuiz(this.questions).subscribe(
      (data: any)=>{
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
      },(error)=>{
        console.log(error);
      }
    )
  }
  printPage(){
    window.print();
  }
  
  

}
