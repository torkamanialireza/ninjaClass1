const mongoose = require('mongoose');

// var fs = require('fs')

const LyricSchema = mongoose.Schema({
    content:String,
    fadeIn:String,
    fadeOut:String,
    dtime:String},
    {timestamps:true})

mongoose.model('Lyric',LyricSchema);

const LikerSchema = mongoose.Schema({
    name:String,
    comment:String},
    {timestamps:true})

mongoose.model('Liker',LikerSchema);



const MemberSchema = mongoose.Schema({
    songName:String,
    content:String,
    playerCounter:Number, 
    musicImage:String,
    songCover:String,
    },
    {timestamps:true})
mongoose.model('Member',MemberSchema);

const MusicSchema = mongoose.Schema({
    songName:{type:String,required:[true,"whats the name of song?"], minlength:[3,"name of song must be 3 or more characters"]},
    content:{type:String,required:[true,"whats the content of song?"], minlength:[3,"content song be 3 or more characters"]},
    playerCounter:Number,
    followers:Number,
    musicImage:{type:String, bin:Buffer},
    songCover:{type:String, bin:Buffer},
    // musicImage:{data:Buffer, type:String},
    // songCover:{data:Buffer, type:String},
    lyrics:[LyricSchema],
    visitors:[MemberSchema],
    users:[LikerSchema]},
    {timestamps:true})

mongoose.model('Music',MusicSchema);



const VideoSchema = mongoose.Schema({
    videoName:{type:String,required:[true,"whats the name of video?"], minlength:[3,"name of video must be 3 or more characters"]},
    content:{type:String,required:[true,"whats the content of video?"], minlength:[3,"content video be 3 or more characters"]},
    playerCounter:Number,
    videoImage:{type:String, bin:Buffer},
    videoCover:{type:String, bin:Buffer},
    users:[LikerSchema]},
    {timestamps:true})

mongoose.model('Video',VideoSchema);

const UserSchema = mongoose.Schema({
    
    firstName:{type:String,required:[true,"whats the content of fistName?"], minlength:[3,"content firstname be 3 or more characters"]},
    lastName:{type:String,required:[true,"whats the content of lastName?"], minlength:[3,"content lastname be 3 or more characters"]},
    email:{type:String,required:[true,"whats the content of email?"], minlength:[3,"content email be 3 or more characters"]},
    password:{type:String,required:[true,"whats the content of password?"], minlength:[3,"content password be 3 or more characters"]},
    confirmPassword:String,
    // userImage:{type:String, bin:Buffer},
    // artists:[ArtistSchema],
    // favorMusics:[MemberSchema]},
    members:[MemberSchema]},
    {timestamps:true})

mongoose.model('User',UserSchema);

const ArtistSchema = mongoose.Schema({
    artistName:{type:String,required:[true,"whats the name of artist?"], minlength:[3,"name of artist must be 3 or more characters"]},
    artistContent:{type:String,required:[true,"whats the content of artist?"], minlength:[3,"content artist be 3 or more characters"]},
    followers:Number,
    artistFacebook:String,
    artistTwitter:String,
    artistGoogle:String,
    artistImage:{type:String, bin:Buffer},
    artistCover:{type:String, bin:Buffer},
    musics:[MusicSchema],
    members:[MemberSchema],
    videos:[VideoSchema]},
    {timestamps:true})
mongoose.model('Artist',ArtistSchema);

const FooterSchema = mongoose.Schema({
    title:String,
    footerCover:{type:String, bin:Buffer},
    content:String},
    {timestamps:true})
mongoose.model('Footer',FooterSchema);

const MenuSchema = mongoose.Schema({
    name:String,
    iconMenu:{type:String, bin:Buffer},
    link:String},
    {timestamps:true})
mongoose.model('Menu',MenuSchema);


const HeaderSchema = mongoose.Schema({
    title:String,
    headerCover:{type:String, bin:Buffer},
    content:String},
    {timestamps:true})
mongoose.model('Header',HeaderSchema);

const WidgetSchema = mongoose.Schema({
    title:String,
    widgetCover:{type:String, bin:Buffer},
    content:String},
    {timestamps:true})
mongoose.model('Widget',WidgetSchema);

const SiteSchema = mongoose.Schema({
    siteName:{type:String,required:[true,"whats the name of site?"], minlength:[3,"name of site must be 3 or more characters"]},
    siteContent:{type:String,required:[true,"whats the content of site?"], minlength:[3,"content site be 3 or more characters"]},
    sitefollowers:Number,
    siteFacebook:String,
    siteTwitter:String,
    siteGoogle:String,
    siteBg:String,
    siteFontColor:String,
    siteLogo:{type:String, bin:Buffer},
    artistsCover:{type:String, bin:Buffer},
    musicsCover:{type:String, bin:Buffer},
    videosCover:{type:String, bin:Buffer},
    headers:[HeaderSchema],
    footers:[FooterSchema],
    widgets:[WidgetSchema],
    menus:[MenuSchema],
    artists:[ArtistSchema]}, 
    
    {timestamps:true})
mongoose.model('Site',SiteSchema);







// var Person = mongoose.model('Person', yourSchema);

// // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
// Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
//   if (err) return handleError(err);
//   // Prints "Space Ghost is a talk show host".
//   console.log('%s %s is a %s.', person.name.first, person.name.last,
//     person.occupation);
// });

// Build up a query using chaining syntax. Since no callback is passed this will create an instance of Query.
// var query = Person.
//     find({ occupation: /host/ }).
//     where('name.last').equals('Ghost'). // find each Person with a last name matching 'Ghost'
//     where('age').gt(17).lt(66).
//     where('likes').in(['vaporizing', 'talking']).
//     limit(10).
//     sort('-occupation'). // sort by occupation in decreasing order
//     select('name occupation'); // selecting the `name` and `occupation` fields


// // Excute the query at a later time.
// query.exec(function (err, person) {
//     if (err) return handleError(err);
//     console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host
// })