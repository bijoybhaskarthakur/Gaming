import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/authGuard/auth.service';
import { CommonService } from 'src/app/Services/common.service';

class ProfileDetails {
  device_id?: any;
  first_name? : any;
  last_name? : any;
  device_type?: any;
  dob? : any;
  email : any;
  email_verified?: any;
  gender? : any;
  id : any;
  is_active : any;
  last_login?: any;
  linked_tree? : any;
  phone_number : any;
  phone_number_verified? : any;
  profile_pic : any;
  status: any;

}

@Component({
  selector: 'app-nab-bar',
  templateUrl: './nab-bar.component.html',
  styleUrls: ['./nab-bar.component.scss']
})
export class NabBarComponent implements OnInit {

  searchValue : any;
  authData : any;
  profileDetails : ProfileDetails = new ProfileDetails();
  constructor(private _router : Router,private toastr : ToastrService,private auth : AuthService,private api: ApiService, private common: CommonService) { }

  ngOnInit(): void {
    //this.authData == localStorage.getItem('authGame');
   
    this.authData  = this.auth.isAuthenticated();
    console.log("this.authData ",this.authData);
    this.getUserDetails();
  }
  searchValueRedirect(){
    console.log("this.searchValue",this.searchValue);
    this._router.navigate(['/search',{ search: this.searchValue }],);
  }
  logOut(){
    localStorage.removeItem("authGame");
    this.toastr.success("logout successfully");
    this.authData = false;
    this.refresh();
    this._router.navigate(['/'],);
    
  }
  refresh(): void {
    window.location.reload();
}
  goToProfile(){
    this._router.navigate(['/profile'],);
  }
  getUserDetails(){
    let url = this.api.get_profile;
    this.common.get(url).subscribe(res => {
      if(res['success']){
    this.profileDetails = res['data'];
    console.log("form nab vab",this.profileDetails);
      }
    }, (err) => {
      //this.loader = false;
    });
  }
  getImageUrl(imageUrl){
    if(imageUrl){
    return 'http://159.65.148.113/media/' + imageUrl;
    }
    else{
      return 'assets/images/home/sample_player.png';
    }
  }
}
