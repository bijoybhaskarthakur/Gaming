import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalSearchComponent } from './Components/global-search/global-search.component';
import { HomeComponent } from './Components/home/home.component';
import { PlayerDetailsComponent } from './Components/player-details/player-details.component';
import { ProfileViewComponent } from './Components/profile-view/profile-view.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { TeamDetailsComponent } from './Components/team-details/team-details.component';
import { TrendingPlayerComponent } from './Components/trending-player/trending-player.component';
import { TrendingTeamsComponent } from './Components/trending-teams/trending-teams.component';
import { AuthGuard } from './Services/authGuard/auth.guard';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'trendingPlayer',component:TrendingPlayerComponent},
  {path:'trendingTeams',component:TrendingTeamsComponent},
  {path:'teamDetails', component:TeamDetailsComponent},
  {path:'playerDetails', component:PlayerDetailsComponent},
  {path:'profile', component:ProfileComponent,canActivate: [AuthGuard]},
  {path:'search',component:GlobalSearchComponent},
  {path:'linkedtree/:id',component:ProfileViewComponent},
  //{path:"**",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
