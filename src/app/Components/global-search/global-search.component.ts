import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent implements OnInit {

  items = [];
  pageOfItems: Array<any>;
  searchData :  any = [];
  allValue : any[];
  searchKey : any;
  searchType : any = "all";
  constructor(private api : ApiService,private common : CommonService,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    //this.getSearchData();
    //this.searchKey = "a";
   
  }

  ngAfterViewInit(){
    this.route
      .paramMap
      .subscribe(params => {
        this.searchKey = params['params'].search;
        this.searchhValue();
      });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

getSearchData() {
  let url = this.api.trending_players;
  this.common.getWitoutAuthService(url).subscribe(res => {
    this.searchData = res['data'];
   console.log("res",res);

  }, (err) => {
    //this.loader = false;
  });
}
searchhValue(){
  if(this.searchKey){
  let url = this.api.global_sarch;
  this.common.getWitoutAuthService(url + '?keyword=' + this.searchKey).subscribe(res => {
    this.searchData = res['data'];
    this.allValue = res['data'];
  }, (err) => {
    //this.loader = false;
  });
}
}
getImageUrl(imageUrl){
  if(imageUrl){
  return 'http://159.65.148.113/media/' + imageUrl;
  }
  else{
    return 'assets/images/home/sample_player.png';
  }
}
selectSearchType(){
  if(this.searchType  == "all"){
    this.searchData = this.allValue;
  }else{
    debugger
    this.searchData = this.allValue.filter(item => item.type === this.searchType);
  // this.searchData.filter(e=>
  //   {
  //     console.log("e",e.type);
  //     e.type == this.searchType
  //   }
  //   );
  console.log("this.searchData",this.searchData);
  }
  console.log("searchType",this.searchType);
}

}
