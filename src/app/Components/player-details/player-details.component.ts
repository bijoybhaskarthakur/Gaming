import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {
  panelOpenState = false;
  playerId = 15;
  playerDetails :any;
  constructor(private api : ApiService,private common : CommonService,private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.playerId = this._activatedRoute.snapshot.queryParams['id'];
    this.getPlayerDetails();
  }
  getPlayerDetails(){
    let url = this.api.get_player;
  this.common.getWitoutAuthService(`${url}${this.playerId}`).subscribe(res => {
    this.playerDetails = res['data'];
    //this.trendingTeam = res['data'];
   console.log("this.teamDetails",this.playerDetails);
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
