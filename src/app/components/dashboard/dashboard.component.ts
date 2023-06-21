import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public user: any = [];
  constructor(private auth: AuthService,private api:ApiService,private userStore:UserStoreService) { }
  public fullname:string="";
  public role:string="";

  ngOnInit(): void {
    this.api.getUsers().subscribe({
      next: (res) => {
        //console.log(res);
        this.user=res;
      },
      error: (err) => {
        alert(err)
      }
    });

    this.userStore.getFullNameFromStore().subscribe(res=>{
      this.fullname=res;
      
      });

      this.userStore.getRoleFromStore().subscribe(res=>{
        this.role=res;
        
        });

// this.userStore.fullname.subscribe(res=>{
// this.fullname=res;

// })

    // this.userStore.getFullNameFromStore()
    // .subscribe(val=>{
    //   const fullNameFromToken = this.auth.getfullNameFromToken();
    //   this.fullname = val || fullNameFromToken
    //   console.log(this.fullname);
    //   console.log(this.auth.getfullNameFromToken());
    // });

  }
  logout(){
    this.auth.signOut();
  }
}
