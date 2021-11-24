import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';
import { CommonService } from 'src/app/Services/common.service';

class Link {
  id: any;
  name: any;
  value? : any;
}
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
  user_name : any;
}
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  is_active : boolean = true;
  links: Link[] = [];
  link: Link = new Link;
  linkSubmitted = false;
  profileDetails : ProfileDetails = new ProfileDetails();
  logo: File[] = [];
  profileSubmitted : boolean = false;
  constructor(private api: ApiService, private common: CommonService,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }
  checkTepmlateStatus(is_active_value){
    debugger
    this.is_active = !is_active_value;
  }
  pp(){
    debugger
  }
  addLink(){
    this.link = new Link();
    $("#link").modal("show");
  }
  linkSubmit(value){
    this.links.push(this.link);
    this.setLinkTree();
    $("#link").modal("hide");
  }

  deleteLink(index){
    this.links.splice(index, 1);
    this.setLinkTree();
  }
  setLinkTree(){
    debugger
    let linkObj = {};
    this.links.forEach(e=>{
      linkObj[e.name] = e.value;
    })

    var raw = JSON.stringify({"linked_tree":linkObj});
    let url = this.api.set_linked_tree;
    this.common.post(raw,url).subscribe(res => {
      if(res['success']){
     this.getUserDetails();
      }else{
        console.log("res",res);
      }
    }, (err) => {
      console.log("err",err);
    });
  }
  getUserDetails(){
    let url = this.api.get_profile;
    this.common.get(url).subscribe(res => {
    this.profileDetails = res['data'];
    console.log(" this.profileDetail 345678", this.profileDetails);
     var result =res['data'].linked_tree;
     let KeyValue = Object.keys(result).map((key) => [key, result[key]]);
     this.links = [];
    KeyValue.forEach(e=>{
      let link = new Link();
      link.name = e[0];
      link.value = e[1];
      this.links.push(link);
    })
    console.log("step 3",this.links);


      
    }, (err) => {
      //this.loader = false;
    });
  }
  editLink(value){
    this.link = value;
    $("#link").modal("show");
  }
  logoUpload(event) {
    this.logo = [];
    this.logo.push(...event.addedFiles);
  }

  logoRemove(event) {
    this.logo = [];
  }
  profileSubmit(value){
    debugger
    let url = this.api.set_profile;
    var formdata = new FormData();
    //formdata.append("profile_pic", this.logo[0] || '');
    if(this.logo[0]){
    formdata.append("profile_pic", this.logo[0], this.logo[0]?.name);
    }
    formdata.append("first_name", this.profileDetails.first_name);
    formdata.append("last_name", this.profileDetails.last_name);
   // formdata.append("user_name", "mdSahil123");


    this.common.post2(formdata,url).subscribe(res => {
      if(res['success']){
        this.setUserName(this.profileDetails.first_name,this.profileDetails.last_name);
        this.getUserDetails();
        $("#profile").modal("hide");
      }else{
        this.toastr.error(res['message']);
      }
    }, (err) => {
      console.log("err",err);
    });
  }
  setUserName(firstName,lastName){
    let randomNumber = Math.floor(Math.random() * 9999999999);
    let userName = firstName + lastName + randomNumber;
    userName = userName.replace(/\s/g, "");
    let url = this.api.set_user_name;
    // let formdata = {
    //   "user_name" : userName
    // }
    var formdata = new FormData();
    formdata.append("user_name",userName);
    this.common.post2(formdata,url).subscribe(res => {
      if(res['success']){
      }else{
        this.toastr.error(res['message']);
      }
    }, (err) => {
      console.log("err",err);
    });
  }
  editProfileDetails(){
    $("#profile").modal("show");
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
