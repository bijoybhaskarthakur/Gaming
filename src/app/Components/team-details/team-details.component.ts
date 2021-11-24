import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {
  panelOpenState = false;
  teamId = 0;
  teamDetails :any;
  sampleUserPlaceholderImages : any = "assets/images/icons/user_placeholder.png";
  constructor(private api : ApiService,private common : CommonService,private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.teamId = this._activatedRoute.snapshot.queryParams['id'];
    this.getTeamDetails();
  }

  getTeamDetails(){
    let url = this.api.get_team;
  this.common.getWitoutAuthService(`${url}${this.teamId}`).subscribe(res => {
    this.teamDetails = res['data'];
    //this.trendingTeam = res['data'];
   console.log("this.teamDetails",this.teamDetails);
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

  getImageUrl(imageUrl){
    if(imageUrl){
    return 'http://159.65.148.113/media/' + imageUrl;
    }
    else{
      return 'assets/images/home/sample_player.png';
    }
  }

}
