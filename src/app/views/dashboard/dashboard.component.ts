import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from 'src/app/components/equipamentos/dialog-form/dialog-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      minWidth: '400px',      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }

}
