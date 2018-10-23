import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddsiteComponent} from './addsite/addsite.component';
import {MainComponent} from './main/main.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {MusicComponent} from './music/music.component';
import {SingleMusicComponent} from './single-music/single-music.component';
import {AddmusicComponent} from './addmusic/addmusic.component';
import {ArtistsComponent} from './artists/artists.component';
import {ArtistComponent} from './artist/artist.component';
import {FavpagesComponent} from './favpages/favpages.component';
import {AdduserComponent} from './adduser/adduser.component';
import { MusicsCollectionComponent } from './musics-collection/musics-collection.component';
import { EditMusicComponent } from './edit-music/edit-music.component';
import { WidgetPageComponent } from './widget-page/widget-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { HeaderPageComponent } from './header-page/header-page.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { AddlyricComponent } from './addlyric/addlyric.component';
import { JqueryComponent } from './jquery/jquery.component';

const routes: Routes = [
  {path: 'main', component:MainComponent},
  {path: 'main/users', component:AdduserComponent},
  {path: 'favorites', component:FavpagesComponent},
  {path: 'main/admin', component:AddsiteComponent},
  {path: 'main/admin/widgets', component:WidgetPageComponent},
  {path: 'main/admin/menus', component:MenuPageComponent},
  {path: 'main/admin/headers', component:HeaderPageComponent},
  {path: 'main/admin/footers', component:FooterPageComponent},
  {path: 'artists', component:ArtistsComponent},
  {path: 'artists/new', component:AddComponent},
  {path: 'artists/:id', component:ArtistComponent},
  {path: 'artists/:id/musics', component:MusicComponent},
  {path: 'musics', component:MusicsCollectionComponent},
  {path: 'artists/:id/musics/new', component:AddmusicComponent},
  {path: 'artists/:artist_id/musics/:id', component:SingleMusicComponent},
  {path: 'artists/:artist_id/musics/:id/edit', component:EditMusicComponent},
  {path: 'artists/:artist_id/musics/:id/edit/lyrics', component:AddlyricComponent},
  {path: 'artists/:id/edit', component:EditComponent},
  {path: 'slideShowAnim', component:JqueryComponent},

  {path: '', pathMatch: 'full', redirectTo: '/main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
