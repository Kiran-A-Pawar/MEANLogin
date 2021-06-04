import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Emplist } from '../../services/emp.list';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(){
    this.refreshContactList();

  }

  refreshContactList() {
    this.authService.getEmp().subscribe((res) => {
      this.authService.employee = res as Emplist[];
    });
  }

}
