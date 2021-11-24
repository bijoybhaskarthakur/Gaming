import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { CommonService } from 'src/app/Services/common.service';

class Link {
  name?: any;
  value? : any;
}
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  profileData : any;
  id : any;
  linkedTree :any;
  constructor(private route: ActivatedRoute,private common : CommonService,private api : ApiService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProfileData();
  }
  getProfileData(){
    let url = this.api.linkedtree + this.id;
    this.common.getWitoutAuthService(url).subscribe(res=>{
      if(res['success']){
      this.profileData = res['data'];
      //this.linkedTree =this.profileData['linked_tree'];
     
      var result =res['data'].linked_tree;
      let KeyValue = Object.keys(result).map((key) => [key, result[key]]);
      this.linkedTree = [];
     KeyValue.forEach(e=>{
       let link = new Link();
       link.name = e[0];
       link.value = e[1];
       this.linkedTree.push(link);
     })


      }else{

      }
      console.log("res",res);
    });
  }
  getImageUrl(imageUrl){
    if(imageUrl){
    return 'http://159.65.148.113/media/' + imageUrl;
    }
    else{
      return 'assets/images/icons/edit_white.png';
    }
  }
}
