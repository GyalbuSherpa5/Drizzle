import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../admin/service/admin.service";
import {MessageService} from "../../shared/components/MessageService";

@Component({
  selector: 'app-user-kyc',
  templateUrl: './user-kyc.component.html',
  styleUrls: ['./user-kyc.component.scss']
})
export class UserKycComponent {

  date: Date | undefined;
  occupations: any;

  genderOptions: any[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
    // Add more options as needed
  ];

  myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    gender: ['', Validators.required],
    birthDate: [new FormControl<Date | null>(null)],
    parentName: [''],
    grandParentName: [''],
    spouseName: [''],
    occupation: ['', Validators.required],
    panNo: [''],
    landLineNumber: [''],
    zoneP: [''],
    districtP: [''],
    municipalityP: [''],
    zoneC: [''],
    districtC: [''],
    municipalityC: [''],
    documentType: ['', Validators.required],
    citizenNumber: ['', Validators.required],
    issuedAddress: ['', Validators.required],
    dateOfIssue: ['', Validators.required],
    citizenFront: ['', Validators.required],
    citizenBack: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.occupations = [
      { title: 'Software Engineer', code: 'SE' },
      { title: 'Doctor', code: 'DOC' },
      { title: 'Teacher', code: 'TCH' },
      { title: 'Accountant', code: 'ACC' },
      { title: 'Chef', code: 'CHF' }
    ];
  }

  handleSubmit() {

  }
}
