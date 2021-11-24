import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';
import { CommonService } from 'src/app/Services/common.service';
import { LoginPopupComponent } from '../login-popup/login-popup.component';

@Component({
  selector: 'app-trending-player',
  templateUrl: './trending-player.component.html',
  styleUrls: ['./trending-player.component.scss']
})
export class TrendingPlayerComponent implements OnInit {
  @ViewChild('loginPopup', { static: true }) loginPopup: LoginPopupComponent;
  items = [];
  pageOfItems: Array<any>;
  trendingPlayer :  any = [];
  trendingTeam: any = [];
  voteDetails: any;
  constructor(private httpClient: HttpClient,private api : ApiService,private common : CommonService,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    this.getTrendingPLayerData();
    this.getVoteDetails();
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

getTrendingPLayerData() {

  let url = this.api.trending_players;
  this.common.getWitoutAuthService(url).subscribe(res => {
    this.trendingPlayer = res['data'];
   console.log("res",res);
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
upVote(type, id) {
  debugger
  let auth = localStorage.getItem('authGame');
  if (!auth) {
    this.loginPopup.show("Home");
  } else {


    var upVoteCount = "1";
      if (this.voteDetails && this.voteDetails[0] && this.voteDetails[0]?.votes_player[id] && this.voteDetails[0]?.votes_player[id] == 1) {
        upVoteCount = "0";
      }

    var raw = JSON.stringify({
      "type": type,
      "object_id": id.toString(),
      "vote_count": upVoteCount
    });
    //get data from backend
    let url = this.api.vote;
    this.common.post(raw, url).subscribe(res => {
      console.log("vote", res);
      
      if(res['success']){
        if(type == "team"){
        //  this.trendingTeam.find(e=>e.id == id).upvote_score  = this.trendingTeam.find(e=>e.id == id).upvote_score + 1;
          this.getVoteDetails();
          this.getTrendingPLayerData();
        }else if(type == "player"){
         // this.trendingPlayer.find(e=>e.id == id).upvote_score  = this.trendingPlayer.find(e=>e.id == id).upvote_score + 1;
          this.getVoteDetails();
          this.getTrendingPLayerData();
        }
       
      }else{
        this.toastr.error(res['message']);
      }
      //this.trendingPlayer = res['data'];
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
}

downVote(type, id) {
  debugger
  let auth = localStorage.getItem('authGame');
  if (!auth) {
    this.loginPopup.show("Home");
  } else {

    var upVoteCount = "-1";
    if (this.voteDetails && this.voteDetails[0] && this.voteDetails[0]?.votes_player[id] && this.voteDetails[0]?.votes_player[id] == -1) {
      upVoteCount = "0";
    }
    var raw = JSON.stringify({
      "type": type,
      "object_id": id.toString(),
      "vote_count": upVoteCount
    });
    //get data from backend
    let url = this.api.vote;
    this.common.post(raw, url).subscribe(res => {
      if(res['success']){
        if(type == "team"){
          //this.trendingTeam.find(e=>e.id == id).downvote_score  = this.trendingTeam.find(e=>e.id == id).downvote_score + 1;
          this.getVoteDetails();
          this.getTrendingPLayerData();
        }else if(type == "player"){
          //this.trendingPlayer.find(e=>e.id == id).downvote_score  = this.trendingPlayer.find(e=>e.id == id).downvote_score + 1;
          this.getVoteDetails();
          this.getTrendingPLayerData();
        }
      }else{
        this.toastr.error(res['message']);
      }
    }, (err) => {
      //this.loader = false;
    });

  }
}
getVoteDetails() {
  debugger
  let getVoteUrl = this.api.get_voting_data;
  this.common.get(getVoteUrl).subscribe(res => {
    console.log("vote data", res);
    this.voteDetails = res['data'];
  }, (err) => {
    //this.loader = false;
  });
}
getUpVoteClass(type, id) {
  if (type == "player") {
    if (this.voteDetails && this.voteDetails[0]) {
      let playerVote = this.voteDetails[0]?.votes_player[id];
      if (playerVote && playerVote == 1) {
        return "upVoteActive";
      } else {
        return "upVote";
      }
    } else {
      return "downVote";
    }
  } else if (type == "team") {
    if (this.voteDetails && this.voteDetails[0]) {
      let teamVote = this.voteDetails[0]?.votes_teams[id];
      if (teamVote && teamVote == 1) {
        return "upVoteActive";
      } else {
        return "upVote";
      }
    } else {
      return "upVote";
    }
  }
  //return "";
}
getDownVoteClass(type, id) {
  if (type == "player") {
    if (this.voteDetails && this.voteDetails[0]) {
      let playerVote = this.voteDetails[0]?.votes_player[id];
      if (playerVote &&  playerVote == -1) {
        return "downVoteActive";
      } else {
        return "downVote";
      }
    } else {
      return "downVote";
    }
  } else if (type == "team") {
    if (this.voteDetails && this.voteDetails[0]) {
      let teamVote = this.voteDetails[0]?.votes_teams[id];
      if (teamVote &&  teamVote == -1) {
        return "downVoteActive";
      } else {
        return "downVote";
      }
    } else {
      return "downVote";
    }
  }
  //return "";
}
loadData(){
  this.getVoteDetails();
  this.refresh();
}
refresh(): void {
  window.location.reload();
}
}
