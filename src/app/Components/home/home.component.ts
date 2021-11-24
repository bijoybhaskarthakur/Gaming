import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';
import { CommonService } from 'src/app/Services/common.service';
import { LoginPopupComponent } from '../login-popup/login-popup.component';

interface TrendingPlayer {
  age?: any,
  agg_score?: any,
  approximate_income?: any
  birth_date?: any,
  description?: any,
  downvote_score?: any
  height?: any
  id?: any
  ign?: any,
  location?: any
  name?: any,
  profile_pic?: any
  profile_pic_without_bg?: any
  relationship_status?: any
  role?: any
  upvote_score?: any
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('loginPopup', { static: true }) loginPopup: LoginPopupComponent;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  chartArr = [
    {
      name: 'pubg',
      url: '/assets/images/icons/pubg.png'
    },
    {
      name: 'cod',
      url: '/assets/images/icons/csgo.png'
    },
    {
      name: 'csgo',
      url: '/assets/images/icons/cod.png'
    },
    {
      name: 'extra',
      url: '/assets/images/icons/down.png'
    }
  ];
  templateTypeSelected = this.chartArr[0];
  items = [1, 2, 3, 4, 5, 6, 7, 8];
  //templateTypeSelected : any = "";
  trendingPlayer: any = [];
  trendingTeam: any = [];
  voteDetails: any;
  constructor(private api: ApiService, private common: CommonService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTrendingPLayerData();
    this.getTrendingTeams();
    this.getUserDetails();
    this.getVoteDetails();
  }


  getDataByTemplate(val) {
    console.log(val);
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
      if (this.voteDetails && this.voteDetails[0] && this.voteDetails[0]?.votes_teams[id] && this.voteDetails[0]?.votes_teams[id] == 1) {
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

        if (res['success']) {
          if (type == "team") {
            // if (this.voteDetails && this.voteDetails[0] && this.voteDetails[0]?.votes_teams[id] && this.voteDetails[0]?.votes_teams[id] == 1) {
            //   this.trendingTeam.find(e => e.id == id).upvote_score = this.trendingTeam.find(e => e.id == id).upvote_score - 1;
            // } else {
            //   this.trendingTeam.find(e => e.id == id).upvote_score = this.trendingTeam.find(e => e.id == id).upvote_score + 1;
            // }

            this.getVoteDetails();
            //this.getTrendingPLayerData();
            this.getTrendingTeams();
          } else if (type == "player") {
            // if (this.voteDetails && this.voteDetails[0] && this.voteDetails[0]?.votes_player[id] && this.voteDetails[0]?.votes_player[id] == 1) {
            //   this.trendingPlayer.find(e => e.id == id).upvote_score = this.trendingPlayer.find(e => e.id == id).upvote_score - 1;
            // } else {
            //   this.trendingPlayer.find(e => e.id == id).upvote_score = this.trendingPlayer.find(e => e.id == id).upvote_score + 1;
            // }
            this.getVoteDetails();
            this.getTrendingPLayerData();
           // this.getTrendingTeams();
          }

        } else {
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
      var downVoteCount = "-1";
      if (this.voteDetails && this.voteDetails[0] && this.voteDetails[0]?.votes_player[id] && this.voteDetails[0]?.votes_player[id] == -1) {
        downVoteCount = "0";
      }
      if (this.voteDetails && this.voteDetails[0] && this.voteDetails[0]?.votes_teams[id] && this.voteDetails[0]?.votes_teams[id] == -1) {
        downVoteCount = "0";
      }
      var raw = JSON.stringify({
        "type": type,
        "object_id": id.toString(),
        "vote_count": downVoteCount
      });
      //get data from backend
      let url = this.api.vote;
      this.common.post(raw, url).subscribe(res => {
        if (res['success']) {
          if (type == "team") {
            // if (this.voteDetails && this.voteDetails[0] && this.voteDetails[0]?.votes_teams[id] && this.voteDetails[0]?.votes_teams[id] == -1) {
            //   this.trendingTeam.find(e => e.id == id).downvote_score = this.trendingTeam.find(e => e.id == id).downvote_score - 1;
            // } else {
            //   this.trendingTeam.find(e => e.id == id).downvote_score = this.trendingTeam.find(e => e.id == id).downvote_score + 1;
            // }

            this.getVoteDetails();
            //this.getTrendingPLayerData();
            this.getTrendingTeams();
          } else if (type == "player") {
            // if (this.voteDetails && this.voteDetails[0] && this.voteDetails[0]?.votes_player[id] && this.voteDetails[0]?.votes_player[id] == -1) {
            //   this.trendingPlayer.find(e => e.id == id).downvote_score = this.trendingPlayer.find(e => e.id == id).downvote_score - 1;
            // } else {
            //   this.trendingPlayer.find(e => e.id == id).downvote_score = this.trendingPlayer.find(e => e.id == id).downvote_score + 1;
            // }
            this.getVoteDetails();
            this.getTrendingPLayerData();
           // this.getTrendingTeams();
          }
        } else {
          this.toastr.error(res['message']);
        }
      }, (err) => {
        //this.loader = false;
      });

    }
  }

  getTrendingPLayerData() {

    // this.httpClient.get("assets/json/trandingPLayer.json").subscribe(data => {
    //   console.log(data);
    //   this.trendingPlayer = data;
    //   // this.products = data;
    // })


    //get data from backend
    let url = this.api.trending_players;
    this.common.getWitoutAuthService(url).subscribe(res => {
      console.log("res", res);
      this.trendingPlayer = res['data'];
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
  getTrendingTeams() {
    //get data from backend
    let url = this.api.trending_teams;
    this.common.getWitoutAuthService(url).subscribe(res => {
      console.log("res", res);
      this.trendingTeam = res['data'];
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
  getImageUrl(imageUrl) {
    if (imageUrl) {
      return 'http://159.65.148.113/media/' + imageUrl;
    }
    else {
      return 'assets/images/home/sample_player.png';
    }
  }
  getUserDetails() {
    let url = this.api.get_profile;
    this.common.get(url).subscribe(res => {
      console.log("Profileres", res);

    }, (err) => {
      //this.loader = false;
    });
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
        if (playerVote && playerVote == -1) {
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
        if (teamVote && teamVote == -1) {
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
  loadData() {
    this.getVoteDetails();
    this.refresh();
  }
  refresh(): void {
    window.location.reload();
  }
}
