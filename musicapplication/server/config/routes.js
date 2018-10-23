const musicController = require('./../controllers/musics.js');
const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
const Music = mongoose.model('Music');
const Video = mongoose.model('Video');
const Artist = mongoose.model('Artist');
const User = mongoose.model('User');
const Site = mongoose.model('Site');
const Liker = mongoose.model('Liker');
const path = require('path');

const bcrypt = require('bcrypt-as-promised');

//
const express = require("express");
const session = require('express-session');
const multer = require('multer');
const storage = multer.diskStorage({
    
   
    destination: function(req,file,cb){
        if((file.originalname.indexOf('mp4') > 1) || (file.originalname.indexOf('avi') > 1) || (file.originalname.indexOf('mov') > 1)){
            
            cb(null,('public/dist/public/assets/uploads/videos/'));
            // cb(null,('public/src/assets/uploads/videos/'));
        }else if(file.originalname.indexOf('mp3') > 1){
            
            cb(null,('public/dist/public/assets/uploads/medias/'));
            // cb(null,('public/src/assets/uploads/medias/'));
        }else {
            cb(null,('public/dist/public/assets/uploads/images/'));
            // cb(null,('public/src/assets/uploads/images/'));
        }
       
    },
    filename:function (req,file,cb){
        cb(null, file.originalname);
    }
});


const upload = multer({storage:storage});
module.exports = (app) => {
    // app.get('/main/admin',function(req,res,next){
        
        
    // });
    // app.post('/api/users/login', function(req, res, next) {
       
    //     req.session.id = user.id
      
    //     req.check('email', 'email is required').isEmail();
    //     req.check('password', 'password must be added');
      
    //     const errors = req.validationErrors();
    //     if(errors){
    //        req.session.errors = errors;
    //        res.redirect('main/user');
    //     }
    //     else{
    //        req.session.success = true;
        //    res.redirect('/');
    //     }
        
    //  });

    // app.post('/api/users/login', function(req,res){
        
    //     User.findOne({email: req.body.email}, (err,user)=>{
    //         if(err){
    //             res.json(err);
    //         }else {
    //             req.session.user = user;
    //             req.session.email =  user.email;
                
    //             app.use(session({
    //                 secret: 'keyboard cat',
    //                 resave: true,
    //                 saveUninitialized: true,
    //                 cookie: { maxAge: 6000000000 }
    //               }))
                
    //             res.redirect('api/dashboard');            
    //         }
    //         console.log(req.session, "username e session");
    //     })   
    // })

    app.get('/api/users/logout', function(req,res){
        req.session.destroy((err)=>{
            if(err) {
                req.json(err);
            }else {
                res.status(200).send({});
            }
            
        })
    })
    app.post('/api/users/login', function(req,res){
        console.log("user paida shod");
       

        //1. query db by email
        if(!req.body.password || !req.body.email) {
            console.log("password email nadareh");
            
        }else {
            User.findOne({email: req.body.email}, (err,user)=>{
                
                // if(err || !req.body.password){
                    if(err) {
                    res.json(err);
                }else {         
                    
                    bcrypt.compare(req.body.password, user.password)
                    .then( result => {
                        req.session.user = user;
                        req.session.email = user.email;
                        
                        // req.session.email = result.user ;
                        // req.session.user = result.email;
                        // req.session.success = true;
                        app.use(session({
                            secret: 'keyboard cat',
                            resave: true,
                            saveUninitialized: true,
                            cookie: { maxAge: 6000000000 }
                        }))
                        res.redirect('/api/dashboard'); 
                        console.log(req.session, "username e session");
                        
                        // result.user = user;
                        // result.email = user.email;
                    
                    })
                    
                   
                    
                     
                    
                    .catch( error => {
                    console.log("they are not matched");
                    })
                }
            })
        }






    })

    app.get('/api/dashboard', function(req, res, err) {
        if(!req.session.user) {
            console.log("sesison voojood nadard");
            res.json(err)
        }else {

            res.json(req.session.user);
        }
    })
    app.get('/api/users', musicController.allusers);
    app.get('/api/users/check', musicController.checkLogin);
    app.delete('/api/sites/:id', musicController.removerSite);
    app.delete('/api/users/:id', musicController.removerUser);
    app.post('/api/users/register', musicController.register);
    // app.post('/api/users/login', musicController.login);
    app.post('/api/footers/new', musicController.addFooter);
    app.get('/api/footers', musicController.allfooters);
    app.get('/api/members', musicController.allMembers);
    app.get('/api/sites', musicController.allsites);
    app.get('/api/users/:user_id', musicController.getsingleUser);
    app.get('/api/artists', musicController.allartists); 
    app.get('/api/musics', musicController.allmusics);
    app.get('/api/artists/:id/musics/:id/users', musicController.alllikers);
    // const array = ['musicImage', 'songCover'];
    app.post('/api/artists/:id/musics/new',
        upload.fields([{
            name: 'musicImage', maxCount: 1 
          }, {
            name: 'songCover', maxCount: 1
          }]),(req,res,next)=>{
        console.log(req.files);
        const music = new Music({
            _id: new mongoose.Types.ObjectId(),
            // thumbnail:req.body.thumbnail,
            songName: req.body.songName,
            // artist:req.body.artist,
            content:req.body.content,
            // playerCounter:req.body.playerCounter,
            facebook:req.body.facebook,
            twitter:req.body.twitter,
            musicImage:req.files.musicImage[0].originalname,
            songCover:req.files.songCover[0].originalname,
            
        });


        


        music.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created Music successfully',
                createdMusic: {
                    // thumbnail:result.thumbnail,
                    songName: result.songName,
                    // artist:result.artist,
                    content:result.content,
                    playerCounter:result.playerCounter,
                    facebook:result.facebook,
                    twitter:result.twitter,
                    musicImage:result.musicImage,
                    songCover:result.songCover,
                    google:result.google,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:8000/musics/${result._id}`
                    }
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


    });

    app.post('/api/sites/new',
        upload.fields([{
            name: 'siteLogo', maxCount: 1 
          }, 
          {
            name: 'artistsCover', maxCount: 1 
          }, 
          {
            name: 'musicsCover', maxCount: 1 
          }, 


          {
            name: 'videosCover', maxCount: 1
          }]),(req,res,next)=>{
        console.log(req.files);
        console.log(req.session.id,"theme function2");
        const site = new Site({
            _id: new mongoose.Types.ObjectId(),
            siteName: req.body.siteName,
            siteContent:req.body.siteContent,
            sitefollowers:req.body.sitefollowers,
            siteFacebook:req.body.siteFacebook,
            siteTwitter:req.body.siteTwitter,
            siteGoogle:req.body.siteGoogle,
            siteLogo:req.files.siteLogo[0].originalname,
            artistsCover:req.files.artistsCover[0].originalname,
            musicsCover:req.files.musicsCover[0].originalname,
            videosCover:req.files.videosCover[0].originalname,

           
        });
        site.save().then(resulta => {
            console.log(resulta);
            res.status(201).json({
                message: 'site created successfully',
                createdSite: {
                    
                    siteName: resulta.siteName,
                    siteContent:resulta.siteContent,
                    sitefollowers:resulta.sitefollowers,
                    siteFacebook:resulta.siteFacebook,
                    siteTwitter:resulta.siteTwitter,
                    siteGoogle:resulta.siteGoogle,
                    siteLogo:resulta.siteLogo,
                    artistsCover:resulta.artistsCover,
                    musicsCover:resulta.musicsCover,
                    videosCover:resulta.videosCover,
                    _id: resulta._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:8000/sites/${resulta._id}`
                    }
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


    });


    app.post('/api/artists/new',
        upload.fields([{
            name: 'artistImage', maxCount: 1 
          }, {
            name: 'artistCover', maxCount: 1
          }]),(req,res,next)=>{
        console.log(req.files);
        const artist = new Artist({
            _id: new mongoose.Types.ObjectId(),
            artistName: req.body.artistName,
            artistContent:req.body.artistContent,
            followers:req.body.followers,
            artistFacebook:req.body.artistFacebook,
            artistTwitter:req.body.artistTwitter,
            artistGoogle:req.body.artistGoogle,
            artistImage:req.files.artistImage[0].originalname,
            artistCover:req.files.artistCover[0].originalname,
           
        });
        artist.save().then(resulta => {
            console.log(resulta);
            res.status(201).json({
                message: 'artist created successfully',
                createdArtist: {
                    
                    artistName: resulta.artistName,
                    artistContent:resulta.artistContent,
                    followers:resulta.followers,
                    artistFacebook:resulta.artistFacebook,
                    artistTwitter:resulta.artistTwitter,
                    artistGoogle:resulta.artistGoogle,
                    artistImage:resulta.artistImage,
                    artistCover:resulta.artistCover,
                    _id: resulta._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:8000/artists/${resulta._id}`
                    }
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


    });
    app.get('/api/sites/:id', musicController.singleSite);
    app.get('/api/artists/:id', musicController.singleArtist);
    app.post('/api/artists/:id/add/music',upload.fields([{
        name: 'musicImage', maxCount: 1 
      }, {
        name: 'songCover', maxCount: 1
      }]) ,musicController.addtoArtist);
    app.post('/api/artists/:id/add/video',upload.fields([{
    name: 'videoImage', maxCount: 1 
    }, {
    name: 'videoCover', maxCount: 1
    }]) ,musicController.addVideotoArtist);

    app.post('/api/musics/:id/add/favor',upload.fields([{
        name: 'favorImage', maxCount: 1 
        }, {
        name: 'favorCover', maxCount: 1
        }]) ,musicController.addNewFavor);

    // app.post('/api/user/:id/add/favor',upload.fields([{
    //     name: 'favorImage', maxCount: 1 
    //     }, {
    //     name: 'favorCover', maxCount: 1
    //     }]) ,musicController.addNewFavor);
    app.get('/api/artists/:artist_id/musics/:id', musicController.singleMusic);
    app.put('/api/artists/:id/edit', musicController.editArtist);
    app.put('/api/artists/:artist_id/musics/:id/edit', musicController.editMusic);
    app.put('/api/sites/:site_id/edit', musicController.editSite);
    app.put('/api/users/:usere_id/edit', musicController.editUserNewVersion);
    app.get('/api/users/:user_id/', musicController.singleUSerafterLogin);
    // app.post('/api/artists/:id/add/fav', musicController.addmusictoFavorite);
    // app.post('/api/restaurants/:id/review', restaurantController.addtoRestaurant);
    //keep it post you can put it also
    //addlyric

    app.post('/api/artists/:artist_id/musics/:music_id/addlyric', musicController.addLyric);

    ///comments
    app.post('/api/artists/:artist_id/musics/:music_id/user', musicController.addCommenttoMusic);
    app.get('/api/:id/user', musicController.singleLiker);
    app.delete('/api/artists/:artist_id/favor/:id', musicController.removefavorfromArtist);
    app.delete('/api/artists/:artist_id/musics/:id', musicController.removefromArtist);
    app.delete('/api/artists/:artist_id/musics/:music_id/lyrics/:lyric_id', musicController.removeLyric);

    app.delete('/api/musics/:music_id/user/:id', musicController.removefromMusic);
    app.delete('/api/artists/:artist_id/musics/:id', musicController.removeMusic);
    app.delete('/api/artists/:id', musicController.removeArtist);
    app.post('/api/sites/:site_id/addheader',upload.fields([{
        name: 'headerCover', maxCount: 1 
        }]),musicController.addheadertoSite);
    app.get('/api/sites/:site_id/headers/:id', musicController.getsingleHeader);
    app.get('/api/sites/:site_id/headers',musicController.allHeader);
    //footer
    app.post('/api/sites/:site_id/addfooter',upload.fields([{
        name: 'footerCover', maxCount: 1 
        }]),musicController.addfootertoSite);
    app.get('/api/sites/:site_id/footers/:id', musicController.getsingleFooter);
    app.get('/api/sites/:site_id/footers',musicController.allFooter);

    //widget

    app.post('/api/sites/:site_id/addwidget',upload.fields([{
        name: 'widgetCover', maxCount: 1 
        }]),musicController.addwidgettoSite);
    app.get('/api/sites/:site_id/widgets/:id', musicController.getsingleWidget);
    app.get('/api/sites/:site_id/widgets',musicController.allWidget);

    //Menu

    app.post('/api/sites/:site_id/addmenu',upload.fields([{
        name: 'iconMenu', maxCount: 1 
        }]),musicController.addmenutoSite);
    app.get('/api/sites/:site_id/menus/:id', musicController.getsingleMenu);
    app.get('/api/sites/:site_id/menus',musicController.allMenu);

    //removeing routes
    app.delete('/api/musics/:music_id/removerel/:fav_id', musicController.removefromFavMusic);
    app.all('*', (req,res)=> {
        console.log("got here");
        res.sendFile(path.resolve('./public/dist/public/index.html'));
    })

}