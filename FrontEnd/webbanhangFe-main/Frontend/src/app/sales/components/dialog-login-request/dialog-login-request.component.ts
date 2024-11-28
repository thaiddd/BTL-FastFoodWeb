import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-login-request',
  templateUrl: './dialog-login-request.component.html',
  styleUrls: ['./dialog-login-request.component.css']
})
export class DialogLoginRequestComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogLoginRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSigup(): void{
    this.router.navigate(['/login'])
    this.dialogRef.close();
  }


}
