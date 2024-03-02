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
  documentType: any;
  issuedAddress: any;
  zone: any;
  district: any;
  municipality: any;

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

  fileToUpload!: File;
  file_name: string = '';

  fileToUploadB!: File;
  file_nameB: string = '';

  onFileChange(event: Event) {
    this.prepareUpload(event);
  }

  onFileChangeB(event: Event) {
    this.prepareUploadB(event);
  }

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

    this.documentType = [
      { title: 'Citizenship', code: 'C' },
    ];

    this.issuedAddress = [
      { title: 'Dolakha', code: 'D' },
      { title: 'Kathmandu', code: 'K' },
      { title: 'Lalitpur', code: 'L' },
      { title: 'Bhaktapur', code: 'B' },
      { title: 'Pokhara', code: 'P' }
    ];

    this.zone = [
      { title: 'Bagmati', code: 'B' },
      { title: 'Gandaki', code: 'G' },
      { title: 'Lumbini', code: 'L' },
      { title: 'Karnali', code: 'K' },
      { title: 'Sudurpashchim', code: 'S' }
    ];

    this.district = [
      { title: 'Dolakha', code: 'D' },
      { title: 'Kathmandu', code: 'K' },
      { title: 'Lalitpur', code: 'L' },
      { title: 'Bhaktapur', code: 'B' },
      { title: 'Pokhara', code: 'P' }
    ];

    this.municipality = [
      { title: 'Damak Municipality', code: 'D' },
      { title: 'Biratnagar Metropolitan City', code: 'B' },
      { title: 'Dharan Sub-Metropolitan City', code: 'D' },
      { title: 'Itahari Sub-Metropolitan City', code: 'I' },
      { title: 'Biratchowk Rural Municipality', code: 'B' }
    ];
  }

  handleSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    } else {
    }
  }

  prepareUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileToUpload = input.files[0];
      this.file_name = this.fileToUpload.name;
      const originalContentType = this.fileToUpload.type;
      const contentType = originalContentType.split('/')[0];

      // Check if the file is an image or video
      if (contentType === 'image' || contentType === 'video') {
        console.log(contentType);

        if (contentType === 'image') {
          const reader = new FileReader();
          reader.onload = (e) => {
            // @ts-ignore
            this.imagePreview = e.target?.result;
          };
          reader.readAsDataURL(this.fileToUpload);
        }
      } else {
        console.log('Invalid file type. Only image and video files are allowed.');
        this.resetFileInput(); // Reset the input field or handle the error as appropriate.
      }
    }
  }

  resetFileInput() {
    this.file_name = '';
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.fileToUpload = files[0];
      this.file_name = this.fileToUpload.name;
    }
  }


  prepareUploadB(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileToUploadB = input.files[0];
      this.file_nameB = this.fileToUploadB.name;
      const originalContentType = this.fileToUploadB.type;
      const contentType = originalContentType.split('/')[0];

      // Check if the file is an image or video
      if (contentType === 'image' || contentType === 'video') {
        console.log(contentType);

        if (contentType === 'image') {
          const reader = new FileReader();
          reader.onload = (e) => {
            // @ts-ignore
            this.imagePreview = e.target?.result;
          };
          reader.readAsDataURL(this.fileToUploadB);
        }
      } else {
        console.log('Invalid file type. Only image and video files are allowed.');
        this.resetFileInputB(); // Reset the input field or handle the error as appropriate.
      }
    }
  }

  resetFileInputB() {
    this.file_nameB = '';
  }

  onDragOverB(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeaveB(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDropB(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.fileToUploadB = files[0];
      this.file_nameB = this.fileToUploadB.name;
    }
  }
}
