import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MusicComponent } from './music/music.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { JqueryComponent } from './jquery/jquery.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { FooterComponent } from './footer/footer.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '../../node_modules/@angular/forms';
import { ArtistComponent } from './artist/artist.component';
import { ArtistsComponent } from './artists/artists.component';
import { AddsiteComponent } from './addsite/addsite.component';
import { AddmusicComponent } from './addmusic/addmusic.component';
import { FavpagesComponent } from './favpages/favpages.component';
import { SingleMusicComponent } from './single-music/single-music.component';
import { AdduserComponent } from './adduser/adduser.component';
import { MusicsCollectionComponent } from './musics-collection/musics-collection.component';
import { EditMusicComponent } from './edit-music/edit-music.component';
import { WidgetPageComponent } from './widget-page/widget-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { HeaderPageComponent } from './header-page/header-page.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { StreamAnimationComponent } from './stream-animation/stream-animation.component';
import { AddlyricComponent } from './addlyric/addlyric.component';
import { NaviComponent } from './navi/navi.component';




@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MusicComponent,
    AddComponent,
    EditComponent,
    JqueryComponent,
    AudioPlayerComponent,
    FooterComponent,
    ArtistComponent,
    ArtistsComponent,
    AddsiteComponent,
    AddmusicComponent,
    FavpagesComponent,
    SingleMusicComponent,
    AdduserComponent,
    MusicsCollectionComponent,
    EditMusicComponent,
    WidgetPageComponent,
    MenuPageComponent,
    HeaderPageComponent,
    FooterPageComponent,
    StreamAnimationComponent,
    AddlyricComponent,
    NaviComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterializeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],

  
  bootstrap: [AppComponent]
})
export class AppModule { }
