import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
  
})


export class HttpService {
  // formdata =new FormData();
  
  constructor(private _http: HttpClient) { }

  // getMusics(id: string){
  //   return this._http.get('/api/musics');

  // }

 
  getSites(){

    return this._http.get(`/api/sites`);
  }
  getUsers(){

    return this._http.get(`/api/users`);
  }

  getMusics(){

    return this._http.get(`/api/musics`);
  }

  getfavorites(){

    return this._http.get(`/api/members`);
  }
  getArtists(){

    return this._http.get(`/api/artists`);
  }
  getMusicsById(id: string){

    return this._http.get(`/api/artists/${id}/musics`);
  }

  removeArtist(id: string){
    console.log("we want delete this artist : ",id);
    return this._http.delete(`/api/artists/${id}`);
  }

  removeMusicfromArtist(music,artist_id){
    console.log("waitifn for code for remove music from artist",artist_id,music);
    return this._http.delete(`/api/artists/${artist_id}/musics/${music._id}`);
  }

  removeFavorMusicFromArtist(favor,artist_id) {
    return this._http.delete(`api/artists/${artist_id}/favor/${favor._id}`);
  }
  getSingleSite(id: string){
    console.log("we select site");
    return this._http.get(`/api/sites/${id}`);

  }

  getSingleArtist(id: string){
    console.log("we select artist");
    return this._http.get(`/api/artists/${id}`);

  }
  getAllMusicsfArtist(id: string){
    console.log("we select musics of artist");
    return this._http.get(`/api/artists/${id}/musics`);

  }

  getSingleUser(user_id:string){
    console.log("we select musicsid  of artistid ");
    return this._http.get(`/api/users/${user_id}`);

  }
  getSingleMusic(artist_id:string,id: string){
    console.log("we select musicsid  of artistid ");
    return this._http.get(`/api/artists/${artist_id}/musics/${id}`);

  }
  // /api/sites/:site_id/headers/:id'
  getSingleHeader(site_id:string,id: string){
    console.log("we select musicsid  of artistid ");
    return this._http.get(`/api/sites/${site_id}/headers/${id}`);

  }

  // addMusic(formdata){
    
  //   return this._http.post('/api/musics/new',formdata);

  // }
  checkUser(word,term){
    console.log("we wanta checka users details ",word, term);
    return this._http.post('/api/users/check/', word, term);
    
  }

  registerUser(newUser){
    return this._http.post('/api/users/register', newUser);
  }

  loginUser(requestUser){
    console.log("logine service")
    return this._http.post('/api/users/login', requestUser);
  }

  removeUser(id: string){
    console.log("we want delete this user : ",id);
    return this._http.delete(`/api/users/${id}`);
  }
  addSite(newSite){
    return this._http.post('/api/sites/new', newSite);
  }

  addArtist(newArtist){
    return this._http.post('/api/artists/new', newArtist);
  }

  addMusicToArtist(id: string,newMusic: any){
    console.log("in mikhad add beshe be artist", newMusic);
    return this._http.post(`/api/artists/${id}/add/music`, newMusic);
    
  }
  
  // addMusicFavoriteToArtist(id: string, newFavor: any){
  //   console.log("in mikhad add beshe be favorite", newFavor);
  //   return this._http.post(`/api/musics/${id}/add/fav`, newFavor);
    
  // }
  

  getfuncUser(user_id:string) {
    return this._http.get(`/api/users/${user_id}/`);
  }
 
  editSite(site_id:string, newData){
    console.log("we edit this site:::");
    return this._http.put(`/api/sites/${site_id}/edit`, newData);
  }

  editUser(usere_id:string,newData){
    console.log("we edit this user:::");
    return this._http.put(`/api/users/${usere_id}/edit`, newData);
  }
  removeFavoritefromMusic(liker: any,music_id){
    console.log("waitifn for code for remove reviewer from music");
    // /api/restaurants/:restaurant_id/review/:id
    return this._http.delete(`/api/musics/${music_id}/likers/${liker._id}`);
  }


  editArtist(id:string, newData){
    console.log("we edit this artist:::");
    // return this._http.get(`/api/restaurants/${edited._id}`,edited);
    return this._http.put(`/api/artists/${id}/edit`, newData);
  }

  removeLyricFromlyrics(artist_id:string,music_id:string,lyric_id:string){
    return this._http.delete(`/api/artists/${artist_id}/musics/${music_id}/lyrics/${lyric_id}`);
  }
  addFavorM(id:string, newFavorm:any){
    console.log("we add for favortiyte object");
    return this._http.post(`/api/musics/${id}/add/favor`, newFavorm);
    // return this._http.post(`/api/users/${id}/add/favor`, newFavorm);
  }
  editMusic(artist_id:string,id:string,editMusic){
    console.log("we edit this:::");
    // return this._http.get(`/api/restaurants/${edited._id}`,edited);
    return this._http.put(`/api/artists/${artist_id}/musics/${id}/edit`,editMusic);
    
  }
  editFinalMethod(edited:any){
    // put('/api/restaurants/:id/edit'
    console.log("we wanna edit here from api");
    return this._http.put(`/api/musics/${edited._id}/edit`,edited);

  }

  removefromRelationFavMusic(favor:any, music_id){
    return this._http.delete(`/api/musics/${music_id}/removerel/${favor._id}`)
  }
  

  addCommentToMusic(comment:any, artist_id:string,music_id:string) {
    
    return this._http.post(`/api/artists/${artist_id}/musics/${music_id}/user`, comment)
  }
  

  getUserFromDashboard(){
    return this._http.get('/api/dashboard');
  }

  logout(){
    return this._http.get('/api/users/logout');
  }

  addheaderToSite(site_id:string, header:any){

    return this._http.post(`/api/sites/${site_id}/addheader`, header);

  }
  addfooterToSite(site_id:string, footer:any){

    return this._http.post(`/api/sites/${site_id}/addfooter`, footer);

  }

  addwidgetToSite(site_id:string, widget:any){

    return this._http.post(`/api/sites/${site_id}/addwidget`, widget);

  }

  addmenuToSite(site_id:string, menu:any){

    return this._http.post(`/api/sites/${site_id}/addmenu`, menu);

  }


  getAllHeadersBySiteId(site_id:string){
    return this._http.get(`/api/sites/${site_id}/headers`);

  }

  getAllMenusBysiteId(site_id:string){
    return this._http.get(`/api/sites/${site_id}/menus`);
  }
  

  getAllFootersBySiteId(site_id:string){
    return this._http.get(`/api/sites/${site_id}/footers`);

  }
  
  getAllWidgetsBySiteId(site_id:string){
    return this._http.get(`/api/sites/${site_id}/widgets`);

  }
  
  addLyric(artist_id:string, music_id:string, lyric:any){
    return this._http.post(`/api/artists/${artist_id}/musics/${music_id}/addlyric`, lyric);
  }

  
}
