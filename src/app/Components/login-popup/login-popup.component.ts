import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/Services/api.service';
import { CommonService } from 'src/app/Services/common.service';
@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  active = false;
  saving = false;
  loginValue : any;
  otp : any;
  isSendOtp = false;
  eventTYpe : any = "";
  @Output() loadDataEvent = new EventEmitter<any>();
  constructor(private common : CommonService,private api : ApiService) { }

  ngOnInit(): void {
   
  }
  onOtpChange(otp) {
    this.otp = otp;
    console.log("this.otp",this.otp);
  }
  show(type?: any): void {
  debugger
  this.eventTYpe = type;
  this.modal.show();
        }
  save(){
    this.loginRequest();
  }

  loginRequest(){
    let url = this.api.loginRequest;
    let formdata = JSON.stringify({
      "phone_number": "+91" + this.loginValue
    });
    this.common.postWitoutAuthService(formdata, url).subscribe(res => {
     console.log("res",res);
    this.isSendOtp = true;
      // let check = this.global.responseHandler(res);
      // if (check) {

      //   this.brandLogoValue = this.brandLogoBase64;
      //   this.calculatePercentage();
      //   $("#brandLogo").modal("hide");

      // } else {
      //   this.showTopLeft('error', 'Error', res['message']);
      // }
    }, (err) => {
      //this.loader = false;
    });
  }

  login(){
    let url = this.api.login;
    let formdata = JSON.stringify({
      "phone_number": "+91" + this.loginValue,
		  "otp": this.otp,
		  "device_id": "asdasd"
    });
    this.common.postWitoutAuthService(formdata, url).subscribe(res => {
     console.log("res",res);
    localStorage.setItem('authGame', res['data'].authorization);
    this.modal.hide();
     this.getUserDetails();
      this.loadDataEvent.emit();
    }, (err) => {
      //this.loader = false;
    });
  }

  getUserDetails(){
    let url = this.api.get_profile;
    this.common.get(url).subscribe(res => {
     console.log("Profileres",res);
      
    }, (err) => {
      //this.loader = false;
    });
  }


  close(){

  }
}
