import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BUDGET_OPTIONS, INTERESTS, LOCATIONS } from '../shared/constants';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  imageData = [
    {
      imgUrl: "../../assets/scenary-1.webp",
      captionTitle: "We Care, So You Can Travel Carefree",
      captionDescription: "Let our experts plan your private, tailor-made and secure tour in 70+ inspiring destinations."
    }
  ]
  placeOptions = LOCATIONS
  interestOptions = INTERESTS;
  travellerOptions = [1,2,3,4,5,6,7].map(option => `${option === 7 ? "6+" : option} travelers`);
  budgetOptions = BUDGET_OPTIONS;
  enquiryForm = new UntypedFormGroup({
    place: new UntypedFormControl([], [Validators.required]),
    interest: new UntypedFormControl([], [Validators.required]),
    travellers: new UntypedFormControl([], [Validators.required]),
    budget: new UntypedFormControl([], [Validators.required])
  });
  saveUrl: string = `${environment.baseUrl}save`;

  constructor(
    public dialog: MatDialog,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EnquiryDialogComponent, {
      data: {formData: this.enquiryForm.value},
      minHeight: '97vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveDetails(result);
      }
    });
  }

  saveDetails(tripData: any) {
    this.http.post(this.saveUrl, tripData).subscribe(res => {
      this.enquiryForm.reset();
    });
  }

}


@Component({
  selector: 'enquiry-dialog',
  templateUrl: 'enquiry-dialog.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryDialogComponent {
  requestDiv = false;
  monthOptions: string[] = [];
  planOptions: string[] = [
    "Still dreaming / researching",
    "Definitely traveling, need destination expertise",
    "I want to book a trip"
  ];
  placeOptions = LOCATIONS
  interestOptions = INTERESTS;
  travellerOptions = [1,2,3,4,5,6,7].map(option => `${option === 7 ? "6+" : option} travelers`);
  budgetOptions = BUDGET_OPTIONS;

  tripForm = new UntypedFormGroup({
    place: new UntypedFormControl([], [Validators.required]),
    interest: new UntypedFormControl([], [Validators.required]),
    travellers: new UntypedFormControl([], [Validators.required]),
    budget: new UntypedFormControl([], [Validators.required]),
    fullName: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    phone: new UntypedFormControl('', [Validators.required, Validators.pattern(/\d+/), Validators.maxLength(12), Validators.minLength(10)]),
    tripDuration: new UntypedFormControl('', [Validators.required, Validators.pattern(/\d+/)]),
    tripMonth: new UntypedFormControl('', [Validators.required]),
    planningStage: new UntypedFormControl('', [Validators.required]),
    specialRequest: new UntypedFormControl('')
  })
  
  constructor(
    public dialogRef: MatDialogRef<EnquiryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    if (data && data.formData && Object.keys(data.formData).length) {
      this.tripForm.patchValue(data.formData);
    }
    this.monthOptions = this.getMonthOptions();
  }

  getMonthOptions(): string[] {
    const date = new Date();
    const currYear = date.getFullYear();
    const currMonth = date.getMonth();
    const monthOptions = [];
  
    for (let i = 0; i < 24; i++) {
      var year = currYear + Math.floor((currMonth + i) / 12);
      var month = (currMonth + i) % 12;
      var monthName = new Date(0, month).toLocaleString('default', { month: 'long' });
      monthOptions.push(monthName + ' ' + year);
    }
    return monthOptions;
  }

  toggleInput(e: any) {
    if (e.value === 'Yes') {
      this.requestDiv = true;
    } else {
      this.requestDiv = false;
    }
  }

  onSubmit() {
    if (this.tripForm.valid) {
      this.dialogRef.close(this.tripForm.value);
      this.snackBar.open('Your Details Have been recorded', 'OK', {
        politeness: 'polite' 
      })
    } else {
      this.snackBar.open('Invalid Details. Please Enter the Valid details and Submit', 'OK', {
        politeness: 'assertive' 
      })
    }
  }
}

