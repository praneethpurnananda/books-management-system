import { AbstractControl } from '@angular/forms';

//publish date Validation

export function publishDateValidation(control: AbstractControl){
  let currDate: Date = new Date();
  currDate.setHours(0,0,0,0);
  if(control && (control.value != null || control.value != undefined)){
    const pdate = control.value;

    if(pdate < currDate){
      return{
        isError: true
      };
    }
  }
  return null;
}
