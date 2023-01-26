import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as bootstrap from "bootstrap"; 
import { FormGroup, FormBuilder,Validator, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { QuestionItem } from 'src/app/modals/QuestionItem';

import { ProductItem } from 'src/app/modals/ProductItem';
import { DatastoreService } from 'src/app/services/datastore.service';
// import * as $ from 'jquery';
// declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  portionsList:any =[];
  productsList:any = [];
  openDialog1 = false;
  questionList:QuestionItem[] = [];
  allQuestions:any = [];

  productItem!: ProductItem;
  locationsArray:any =[];
  addNewItem = false;
  previousSelectLocat:any = 0;

  //Stepper Form builder
  firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    desCtrl:['',Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    radioGroupQuestions: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    locationSelector1:[-1,Validators.required]
  })

   constructor(public dialog: MatDialog,private _formBuilder: FormBuilder, private dataService: DatastoreService) { }

  public  ngOnInit() {
      this.locationsArray = this.dataService.getLocationList();
      this.portionsList = this.dataService.getPortionsList();
      this.allQuestions = this.dataService.generateAllQuestions();
  }

  onCardItemClick(itemId:any,product:any){
    this.previousSelectLocat = itemId;
    this.addNewItem = false;
    this.productItem = product;
    this.questionList = this.getQuestionList();
    console.log("Questions : ",this.questionList);
    this.firstFormGroup.controls.nameCtrl.setValue(product.name);
    this.firstFormGroup.controls.desCtrl.setValue(product.description);
    this.thirdFormGroup.controls.locationSelector1.setValue(this.locationsArray.find((res:any)=>(res.id == product.locationId)).name);
  }


  getQuestionList(){
    if(this.productItem){
      if(this.productItem.status == 0){
        return this.productItem.lahoreQuestions;
      }else if(this.productItem.status == 1){
        return this.productItem.multanQuestions;
      }else if(this.productItem.status == 2){
        return this.productItem.kaistanQuestions;
      }else if(this.productItem.status == 3){
        return this.productItem.munsterQuestions;
      }else if(this.productItem.status == 4){
        return this.productItem.rubiQuestions;
      }else {
        return [];
      }
    }

    return [];

  }

  onDialogOpen(itemId:any){
    this.addNewItem = true;
    this.previousSelectLocat = itemId;
    this.updateQuestionList(itemId);
  }

  updateQuestionList(itemId:any){
    var questionsList1 = this.allQuestions.find((res:any)=>(res.locaitonId == itemId));
    this.questionList = questionsList1.questions;
  }

  onSaveItem(stepper:MatStepper){

    const pName = this.firstFormGroup.value.nameCtrl;
    const desName = this.firstFormGroup.value.desCtrl;
    const locationId = this.thirdFormGroup.value.locationSelector1;

    if(this.addNewItem){
      var newObject = {id:(this.productsList.length)+1, name:pName,description:desName,lahoreQuestions:[],multanQuestions:[],kaistanQuestions:[],rubiQuestions:[],munsterQuestions:[],status: locationId,locationName:this.getLocationName(locationId), locationId:locationId};
      var objectWithQuestions = this.addSelectedQuestionsList(newObject,this.previousSelectLocat);
      this.productsList.push(objectWithQuestions);
    }else{
      this.productItem.name = pName!;
      this.productItem.description = desName!;
      this.productItem.locationId = locationId!;
      this.productItem.locationName = this.getLocationName(locationId);
      this.productItem.status = locationId!;

      //var newObject = {id:(this.productsList.length)+1, name:pName,description:desName,lahoreQuestions:[],multanQuestions:[],kaistanQuestions:[],rubiQuestions:[],munsterQuestions:[],status: locationId,locationName:this.getLocationName(locationId), locationId:locationId};
      var objectWithQuestions = this.addSelectedQuestionsList(this.productItem,this.previousSelectLocat);
      const productIndex = this.productsList.findIndex((res:any)=>(res.id == this.productItem.id));
      this.productsList[productIndex]= objectWithQuestions;
    }
    stepper.reset();
  }

  getLocationName(locationID:any){
    const newLoc = this.locationsArray.find((res:any)=>(res.id == locationID));
    if(newLoc){
      return newLoc.name;
    }
    return '';
  }

  addSelectedQuestionsList(proObj:any, previousLocId:any){

    if(previousLocId == 0){
      proObj.lahoreQuestions = this.questionList;
    }else if(previousLocId == 1){
      proObj.multanQuestions = this.questionList;
    }else if(previousLocId == 2){
      proObj.kaistanQuestions = this.questionList;
    }else if(previousLocId == 3){
      proObj.munsterQuestions = this.questionList;
    }else if(previousLocId == 4){
      proObj.rubiQuestions = this.questionList;
    }

    return proObj;

  }

  onLocationChange(event:any){
    console.log("on change called",event.target.value);
  }
  onRadioButtonGroupChange(question:any,$event:any){
    var indexOfQuestions  = this.questionList.findIndex((res:any)=>(res.id == question.id));
    question.status = $event.value == 'yes'? true : false;
    this.questionList[indexOfQuestions] = question;
  }

  checkRadioButton(status:number){
    if(status == 1){
      return true;
    }
    return false;
  }
  
}


