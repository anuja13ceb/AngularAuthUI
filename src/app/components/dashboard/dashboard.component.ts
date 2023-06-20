import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public user: any = [];
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUsers().subscribe({
      next: (res) => {
        console.log(res);
        this.user=res;
      },
      error: (err) => {
        alert(err)
      }
    });
  }
}
