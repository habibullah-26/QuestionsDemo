import { Injectable } from '@angular/core';
import { QuestionItem } from '../modals/QuestionItem';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  portionsList:any = [];
  locationsArray:any = [];

   lahoreQuestion: QuestionItem[] = [];
  multanQuestion: QuestionItem[] = [];
  kaistanQuestion: QuestionItem[] = [];
  muennstarQuestion: QuestionItem[] = [];
  rubiQuestion: QuestionItem[] = [];

  allQuestions:any = [];

  constructor() { }

  getLocationList(){
    this.locationsArray.push({id:0, name:"Lahore"});
    this.locationsArray.push({id:1, name:"Multan"});
    this.locationsArray.push({id:2, name:"Kaistan"});
    this.locationsArray.push({id:3, name:"Münster"});
    this.locationsArray.push({id:4, name:"Rubi"});
  return this.locationsArray;
  }

  getPortionsList(){
    this.portionsList.push({portionId:0, portionName:"Lahore"});
    this.portionsList.push({portionId:1, portionName:"Multan"});
    this.portionsList.push({portionId:2, portionName:"Kaisten"});
    this.portionsList.push({portionId:3, portionName:"Muenster"});
    this.portionsList.push({portionId:4, portionName:"Rubi"});
    return this.portionsList;
  }

  composeQuestionsList(){
    this.lahoreQuestion.push({id:1, name:"Lahore is the second large City of Pakistan?",status:false});
    this.lahoreQuestion.push({id:2, name:"Lahore is located in province of Punjab?",status:false});
    this.lahoreQuestion.push({id:3, name:"Lahore is beautiful city ? ",status:false});

    this.multanQuestion.push({id:1, name:"Multan is the 5th large City of Pakistan?",status:false});
    this.multanQuestion.push({id:2, name:"Multan is located in center of Pakistan? ",status:false});
    this.multanQuestion.push({id:3, name:"Multan is a old city ?",status:false});

    this.kaistanQuestion.push({id:1, name:"Kaisten is the City of Pakistan?",status:false});
    this.kaistanQuestion.push({id:2, name:"Kaisten is located in province of Punjab? ",status:false});
    this.kaistanQuestion.push({id:3, name:"Kaisten is beautiful city?",status:false});

    this.muennstarQuestion.push({id:1, name:"Münster is a city in western Germany.?",status:false});
    this.muennstarQuestion.push({id:2, name:"Münster is located in province of Punjab? ",status:false});
    this.muennstarQuestion.push({id:3, name:"In 2004, Münster won an honourable distinction?",status:false});

    this.rubiQuestion.push({id:1, name:"Rubi is the 10th large City of Pakistan?",status:false});
    this.rubiQuestion.push({id:2, name:"Rubi is located in province of Punjab? ",status:false});
    this.rubiQuestion.push({id:3, name:"Rubi is Girl name? ",status:false});
  }

  generateAllQuestions(){
    this.composeQuestionsList();
    this.allQuestions.push({locaitonId: 0, questions:this.lahoreQuestion});
    this.allQuestions.push({locaitonId: 1, questions:this.multanQuestion});
    this.allQuestions.push({locaitonId: 2, questions:this.kaistanQuestion});
    this.allQuestions.push({locaitonId: 3, questions:this.muennstarQuestion});
    this.allQuestions.push({locaitonId: 4, questions:this.rubiQuestion});
    return this.allQuestions;
  }


}
