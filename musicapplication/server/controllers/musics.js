const mongoose = require('mongoose');
const Music = mongoose.model('Music');
const Video = mongoose.model('Video');
const Liker = mongoose.model('Liker');
const Lyric = mongoose.model('Lyric');
const Header = mongoose.model('Header');
const Footer = mongoose.model('Footer');
const Widget = mongoose.model('Widget');
const Menu = mongoose.model('Menu');
const Artist = mongoose.model('Artist');
const Site = mongoose.model('Site');
const Member = mongoose.model('Member');
const User = mongoose.model('User');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcrypt-as-promised');
const session = require('express-session');

module.exports = {
    singleUser: (req,res)=>{
        User.findOne({firstName: req.body.firstName}, (err,user)=>{
            if(err){
                res.json(err);
            }else {
                res.json(user)
            }
        })   
    },

    getsingleUser:(req,res)=> {

        User.findOne({_id: req.params.user_id}, (err,user)=>{
            if(err){
                res.json(err);
            }else {
                res.json(user)
            }
        })  


    },
    register : function(req, res) {
        
        console.log("registerin****")
        var hashed_password;
        bcrypt.hash(req.body.password, 10)
        .then(hashed_password => {
            console.log(hashed_password, "hashed password")
            const user = new User({
                
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                password : hashed_password,
                confirmPassword : hashed_password,
    
            });

            if(!req.body.password) {
                // console.log("pasword nadareh");
                res.json(err);
            }
            if(!req.body.email) {
                // console.log("pasword nadareh");
                res.json(err);
            }else {
                user.save(function(err){
                    if(err){
                        console.log(err);
                        res.json(err);
                    }
                    console.log('user created');
                   
                    // res.redirect('/welcome');
                    res.json(user);
                });
            }	 
        })
        .catch(error => {
	 
        });
    },
    checkLogin(word, term) {
        if(bcrypt.compareSync(word,bcrypt.hashSync(term))) {
            console.log("they are matched in html");
            return "red";
            
          }else {
            return "blue";
           
          }

    },
    login: function(req, res){
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
                    res.json(user);
                    bcrypt.compare(req.body.password, user.password)
                    .then( result => {


                        
                        // result.user = user;
                        // result.email = user.email;
                    req.session.email = user.email;
                    req.session.user = user;
                    // req.session.email = result.user ;
                    // req.session.user = result.email;
                    // req.session.success = true;
                    app.use(session({
                        secret: 'keyboard cat',
                        resave: true,
                        saveUninitialized: true,
                        cookie: { maxAge: 6000000000 }
                    }))
                   
                    
                    res.redirect('api/dashboard');  
                    console.log(req.session, "username e session");
                    })
                    // .catch( error => {
                    // console.log("they are not matched");
                    // })
                }
            })
        }
    },

    
    allusers:function(req, res) {
        User.find({}, (err,users)=>{
            if(err){
                res.json(err);
            }else {
                res.json(users)
            }
        })  

    },
    removerSite: function(req,res){
        
        Site.remove({_id: req.params.id}, (err,data)=>{
            if(err){
                res.json(err);
            }else {
                res.json(data);
            }
        })
    },
    removerUser: function(req,res){
        
        User.remove({_id: req.params.id}, (err,data)=>{
            if(err){
                res.json(err);
            }else {
                res.json(data);
            }
        })
    },
    addFooter: function(req, res) {
        console.log(req);
        Footer.create(req.body, (err, footer)=> {
            if (err){
                res.json(err);
            }else {
                
                res.json(footer);
            }    
        }) 

    },
    allfooters: (req,res)=>{
        Footer.find({}, (err,footers)=>{
            if(err){
                res.json(err);
            }else {
                res.json(footers)
            }
        })   
    },
    allMembers: (req,res)=>{
        Member.find({}, (err,members)=>{
            if(err){
                res.json(err);
            }else {
                res.json(members)
            }
        })   
    },

    allsites: (req,res)=>{
        console.log(req.session.email,"theme function3 id");
        // console.log(session,"theme function3 name");
        Site.find({}, (err,sites)=>{
            if(err){
                res.json(err);
            }else {
                res.json(sites)
            }
        })   
    },
    allartists: (req,res)=>{
        Artist.find({}, (err,artists)=>{
            if(err){
                res.json(err);
            }else {
                res.json(artists)
            }
        })   
    },
   
    singleSite: (req,res)=>{
        console.log(req.session.id,"theme function");
        Site.findOne({_id: req.params.id}, (err,site)=>{
            if(err){
                res.json(err);
            }else {
                res.json(site)
                console.log(req.session.id,"theme function");
            }
        })   
    },
    singleArtist: (req,res)=>{
        Artist.findOne({_id: req.params.id}, (err,artist)=>{
            if(err){
                res.json(err);
            }else {
                res.json(artist)
            }
        })   
    },
    editSite: function(req,res){
        console.log("GOT THE DATA");
        console.log(req.body);
        
        Site.update({_id:req.params.site_id}, req.body, (err,data)=>{
            if(err){
                res.json(err);
            }else {
                res.json(data);
            }  
        })

    },
    editArtist: function(req,res){
        console.log("GOT THE DATA");
        console.log(req.body);
        
        Artist.update({_id:req.params.id}, req.body, (err,data)=>{
            if(err){
                res.json(err);
            }else {
                res.json(data);
            }  
        })

    },
    removeArtist: function(req,res){
        
        Artist.remove({_id: req.params.id}, (err,data)=>{
            if(err){
                res.json(err);
            }else {
                res.json(data);
            }
        })
    },
    addtoSite: function(req, res,fields) {
        console.log(req.session.id,"theme function");
        console.log("you add artist to site");     
        console.log(req.files);
        const site = new Site({
            _id: new mongoose.Types.ObjectId(),
            
            siteName: req.body.siteName,
            siteContent:req.body.siteContent,
            siteFacebook:req.body.siteFacebook,
            siteTwitter:req.body.siteTwitter,
            siteGoogle:req.body.siteGoogle,
            siteBg:req.body.siteBg,
            siteFontColor: req.boy.siteFontColor,
            siteLogo:req.files.siteLogo[0].originalname,
            artistsCover:req.files.artistsCover[0].originalname,
            musicsCover:req.files.musicsCover[0].originalname,
            videosCover:req.files.videosCover[0].originalname,
            
        });
        site.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created Site successfully',
                createdSite: {
                    siteName: result.siteName,
                    siteContent:result.siteContent,
                    siteFacebook:result.siteFacebook,
                    siteTwitter:result.siteTwitter,
                    siteGoogle:result.siteGoogle,
                    siteLogo:result.siteLogo,
                    siteBg:result.siteBg,
                    siteFontColor:result.siteFontColor,
                    artistsCover:result.artistsCover,
                    musicsCover:result.musicsCover,
                    videosCover:result.videosCover,
                    
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:8000/sites/${result._id}`
                    }
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

        
        
        Site.update({_id: req.params.id}, {$push: {artists: artist}},(err,data)=>{
            if (err){
                console.log("couldnt update music and artist it");
                res.json(err);
            }else {
                res.json(data);
            }
        })
       
    
    },
    
    addtoArtist: function(req, res,fields) {
        console.log("you add music to artist");    
        console.log(req.files);
        const music = new Music({
            _id: new mongoose.Types.ObjectId(),
            songName: req.body.songName,
            content:req.body.content,
            playerCounter:req.body.playerCounter,
            musicImage:req.files.musicImage[0].originalname,
            songCover:req.files.songCover[0].originalname,
        });
        music.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created Music successfully',
                createdMusic: {
                    songName: result.songName,
                    content:result.content,
                    playerCounter:result.playerCounter,
                    musicImage:result.musicImage,
                    songCover:result.songCover,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:8000/artists/${req.params.id}/musics/${result._id}`
                    }
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

        
        
        Artist.update({_id: req.params.id}, {$push: {musics: music}},(err,data)=>{
            if (err){
                console.log("couldnt update music and artist it");
                res.json(err);
            }else {
                res.json(data);
            }
        })
       
    
    },
    // addNewFavorForUser: function(req, res,fields) {
    //     console.log("you add favorite to user");
    //     console.log(req.files);
    //     const member = new Member({
    //         _id: new mongoose.Types.ObjectId(),
           
    //         playerCounter:req.body.playerCounter,
         
            
    //     });
    //     member.save().then(result => {
    //         console.log(result);
    //         res.status(201).json({
    //             message: 'Created member successfully',
    //             createdFavoriteOfUSer: {
                    
    //                 playerCounter:result.playerCounter,
                    
                    
    //                 _id: result._id,
    //                 request: {
    //                     type: 'GET',
    //                     url: `http://localhost:8000/api/members/${result._id}`
    //                 }
    //             }
    //         });
    //     }).catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //             error: err
    //         });
    //     });

        
        
    //     User.update({_id: req.params.id}, {$push: {favorMusics: member}},(err,data)=>{
    //         if (err){
    //             console.log("couldnt update favor and artist it");
    //             res.json(err);
    //         }else {
    //             res.json(data);
    //         }
    //     })
       
    
    // },

    addNewFavor: function(req, res,fields) {
        console.log("you add favorite to artist");
        console.log(req.files);
        const member = new Member({
            _id: new mongoose.Types.ObjectId(),
           
            playerCounter:req.body.playerCounter,
         
            
        });
        member.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created member successfully',
                createdFavorite: {
                    
                    playerCounter:result.playerCounter,
                    
                    
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:8000/api/members/${result._id}`
                    }
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

        
        //old one with music
        // Music.update({_id: req.params.id}, {$push: {visitors: member}},(err,data)=>{
        //     if (err){
        //         console.log("couldnt update video and artist it");
        //         res.json(err);
        //     }else {
        //         res.json(data);
        //     }
        // })
        //new one with user
        User.update({_id: req.params.id}, {$push: {favorMusics: member}},(err,data)=>{
            if (err){
                console.log("couldnt update favor and artist it");
                res.json(err);
            }else {
                res.json(data);
            }
        })
       
    
    },

    addVideotoArtist: function(req, res,fields) {
        console.log("you add video to artist");
        console.log(req.files);
        const video = new Video({
            _id: new mongoose.Types.ObjectId(),
            // thumbnail:req.body.thumbnail,
            videoName: req.body.videoName,
            // artist:req.body.artist,
            content:req.body.content,
            // playerCounter:req.body.playerCounter,
            facebook:req.body.facebook,
            twitter:req.body.twitter,
            videoImage:req.files.videoImage[0].originalname,
            videoCover:req.files.videoCover[0].originalname,
            google:req.body.google
        });
        video.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created Video successfully',
                createdVideo: {
                    // thumbnail:result.thumbnail,
                    videoName: result.videoName,
                    // artist:result.artist,
                    content:result.content,
                    // playerCounter:result.playerCounter,
                    facebook:result.facebook,
                    twitter:result.twitter,
                    videoImage:result.videoImage,
                    videoCover:result.videoCover,
                    google:result.google,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:8000/videos/${result._id}`
                    }
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

        
        
        Artist.update({_id: req.params.id}, {$push: {videos: video}},(err,data)=>{
            if (err){
                console.log("couldnt update video and artist it");
                res.json(err);
            }else {
                res.json(data);
            }
        })
       
    
    },

    allfavorites: (req,res)=>{
        Member.find({}, (err,members)=>{
            if(err){
                res.json(err);
            }else {
                res.json(members)
            }
        })   
    },
    allmusics: (req,res)=>{
        Music.find({}, (err,musics)=>{
            if(err){
                res.json(err);
            }else {
                res.json(musics)
            }
        })   
    },
    alllikers: (req,res)=>{
        Liker.find({}, (err,likers)=>{
            if(err){
                res.json(err);
            }else {
                res.json(likers)
            }
        })   
    },
    singleMusic: (req,res)=>{
        Artist.findOne({_id: req.params.artist_id}, (err,artist)=>{
            if(err){
                res.json(err);
            }else {
                Music.findOne({_id: req.params.id}, (err,music)=>{
                    if(err){
                        res.json(err);
                    }else {
                        res.json(music)
                    }
                }) 
            }
              
    })
},

editUser: function(req,res){

    User.findOne({email: req.session.email}, (err,user)=>{
        if(err){
            res.json(err);
        }else {
    
            User.update(req.body, (err,data)=>{
                if(err){
                    res.json(err);
                }else {

                    res.json(data);
                }  
            })

        }
    })
        
    

},
editUserNewVersion: function(req,res){

    User.findOne({_id: req.params.usere_id}, (err,user)=>{
        if(err){
            res.json(err);
        }else {
    
            user.update(req.body, (err,data)=>{
                if(err){
                    res.json(err);
                }else {

                    res.json(data);
                }  
            })

        }
    })
        
    

},
singleUSerafterLogin: (req,res)=>{
   
    User.findOne({_id: req.params.user_id}, (err,user)=>{
        if(err){
            res.json(err);
        }else {
            res.json(user)
        }
    })   
},
    editMusic: function(req,res){
        Artist.findOne({_id: req.params.artist_id}, (err,artist)=>{
            if(err){
                res.json(err);
            }else {
                Music.update({_id:req.params.id}, req.body, (err,data)=>{
                    if(err){
                        res.json(err);
                    }else {

                        res.json(data);
                    }  
                })
            }
        })

    },
    removeMusic: function(req,res){
        Artist.findOne({_id: req.params.artist_id}, (err,artist)=>{
            if(err){
                res.json(err);
            }else {
                Music.remove({_id: req.params.id}, (err,data)=>{
                    if(err){
                        res.json(err);
                    }else {
                        res.json(data);
                    }
                })
            }
        })
    },
    //return to oj we use name of model
    

    singleLiker: (req,res)=>{
        Music.findOne({_id: req.params.id}, (err,liker)=>{
            if(err){
                res.json(err);
            }else {
                res.json(liker)
            }
        })   
    },

    
    addtoMusic: function(req, res) {
        console.log("you add like to music");
        Liker.create(req.body,(err,liker)=>{

            if (err){
                console.log("music validation has found error");
                res.json(err);
            }else {

                Music.update({_id: req.params.id}, {$push: {users: liker}},(err,data)=>{
                    if (err){
                        console.log("couldnt update liker it");
                        res.json(err);
                    }else {
                        res.json(data);
                    }
                })
               
            }    
        })
       
    },

    addCommenttoMusic: function(req, res) {
        console.log("you add like to music");
        Artist.findOne({_id: req.params.artist_id}, (err,artist)=>{
            if (err){
            console.log("couldnt update liker it");
            // res.json(err);
            }else {
            // res.json(artist);
                Music.findOne({_id: req.params.music_id}, (err,music)=>{
                    Liker.create(req.body,(err,comment)=>{

                        if (err){
                            console.log("music validation has found error");
                            res.json(err);
                        }else {
            
                            Music.update({_id: req.params.music_id}, {$push: {users: comment}},(err,data)=>{
                                if (err){
                                    console.log("couldnt update comment it");
                                    res.json(err);
                                }else {
                                    res.json(data);
                                }
                            })

                            

                            
                        
                        }    
                    })


                })
                
            }
        })    
    },
    removefromMusic: function(req,res){
        

        Music.update({_id: req.params.music_id}, {$pull: {users: {_id: req.params.id}}}, (err,data)=>{
            if (err){
                res.json(err);
            }else {

                res.json(data);
            }    
        })
    },
    removefromArtist: function(req,res){
          
        Artist.update({_id: req.params.artist_id}, {$pull: {musics: {_id: req.params.id}}}, (err,data)=>{
            if (err){
                res.json(err);
            }else {

                res.json(data);
            }    
        })
    },

    removefavorfromArtist: function(req,res){
          
        Artist.update({_id: req.params.artist_id}, {$pull: {members: {_id: req.params.id}}}, (err,data)=>{
            if (err){
                res.json(err);
            }else {

                res.json(data);
            }    
        })
    },
    // addmusictoFavorite

    removefromFavMusic: function(req,res){
        
        Music.update({_id: req.params.music_id}, {$pull: {visitors: {_id: req.params.fav_id}}}, (err,data)=>{
            if (err){
                res.json(err);
            }else {

                res.json(data);
            }    
        })
    },

    addheadertoSite: function(req,res, fileds){
                const header = new Header({
                _id: new mongoose.Types.ObjectId(),
                title:req.body.title,
                content:req.body.content,
                headerCover:req.files.headerCover[0].originalname,


                });

                header.save().then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'Created header to site successfully',
                        createdHeader: {
                            title: result.title,
                            content:result.content,
                            headerCover:result.headerCover,
                            _id: result._id,
                            request: {
                                type: 'GET',
                                
                                url: `http://localhost:8000/api/sites/${req.params.site_id}/headers/${result._id}`
                            }
                        }

                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });

                    
                }); 
                Site.update({_id: req.params.site_id}, {$push: { headers: header}}, (err,data)=>{
                    if(err){
                        res.json(err);
                    }else {
                        res.json(data);
                    }
                })
    },


    getsingleHeader:(req,res)=>{
        Site.findOne({_id: req.params.site_id}, (err,site)=>{
            if(err){
                res.json(err);
            }else {
                Header.findOne({_id: req.params.id}, (err,header)=>{
                    if(err){
                        res.json(err);
                    }else {
                        res.json(header)
                    }
                }) 
            }
              
    })


    },

    allHeader:(req,res)=>{

        Site.findOne({_id: req.params.site_id}, (err,site)=>{

            Header.find({}, (err,headers)=>{

                if(err){
                    res.json(err);
                }else {
                    res.json(headers);
                }

            })
        })

    },


    //fo footer

    addfootertoSite: function(req,res, fileds){
        const footer = new Footer({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title,
        content:req.body.content,
        footerCover:req.files.footerCover[0].originalname,


        });

        footer.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created footer to site successfully',
                createdFooter: {
                    title: result.title,
                    content:result.content,
                    footerCover:result.footerCover,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        
                        url: `http://localhost:8000/api/sites/${req.params.site_id}/footers/${result._id}`
                    }
                }

            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

            
        }); 
        Site.update({_id: req.params.site_id}, {$push: { footers: footer}}, (err,data)=>{
            if(err){
                res.json(err);
            }else {
                res.json(data);
            }
        })
},


getsingleFooter:(req,res)=>{
Site.findOne({_id: req.params.site_id}, (err,site)=>{
    if(err){
        res.json(err);
    }else {
        Footer.findOne({_id: req.params.id}, (err,footer)=>{
            if(err){
                res.json(err);
            }else {
                res.json(footer)
            }
        }) 
    }
      
})


},

allFooter:(req,res)=>{

Site.findOne({_id: req.params.site_id}, (err,site)=>{

    Footer.find({}, (err,footers)=>{

        if(err){
            res.json(err);
        }else {
            res.json(footers);
        }

    })
})

},
    //for Widget

    addwidgettoSite: function(req,res, fileds){
        const widget = new Widget({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title,
        content:req.body.content,
        widgetCover:req.files.widgetCover[0].originalname,


        });

        widget.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created footer to site successfully',
                createdHWidget: {
                    title: result.title,
                    content:result.content,
                    widgetCover:result.widgetCover,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        
                        url: `http://localhost:8000/api/sites/${req.params.site_id}/widgets/${result._id}`
                    }
                }

            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

            
        }); 
        Site.update({_id: req.params.site_id}, {$push: { widgets: widget}}, (err,data)=>{
            if(err){
                res.json(err);
            }else {
                res.json(data);
            }
        })
},


getsingleWidget:(req,res)=>{
Site.findOne({_id: req.params.site_id}, (err,site)=>{
    if(err){
        res.json(err);
    }else {
        Footer.findOne({_id: req.params.id}, (err,widget)=>{
            if(err){
                res.json(err);
            }else {
                res.json(widget)
            }
        }) 
    }
      
})


},

allWidget:(req,res)=>{

Site.findOne({_id: req.params.site_id}, (err,site)=>{

    Widget.find({}, (err,widgets)=>{

        if(err){
            res.json(err);
        }else {
            res.json(widgets);
        }

    })
})

},

    //for Menu

    addmenutoSite: function(req,res, fileds){
        const menu = new Menu({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        link:req.body.link,
        iconMenu:req.files.iconMenu[0].originalname,


        });

        menu.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created menu to site successfully',
                createdMenu: {
                    name: result.name,
                    link:result.link,
                    iconMenu:result.iconMenu,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        
                        url: `http://localhost:8000/api/sites/${req.params.site_id}/menus/${result._id}`
                    }
                }

            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

            
        }); 
        Site.update({_id: req.params.site_id}, {$push: { menus: menu}}, (err,data)=>{
            if(err){
                res.json(err);
            }else {
                res.json(data);
            }
        })
},


getsingleMenu:(req,res)=>{
Site.findOne({_id: req.params.site_id}, (err,site)=>{
    if(err){
        res.json(err);
    }else {
        Menu.findOne({_id: req.params.id}, (err,menu)=>{
            if(err){
                res.json(err);
            }else {
                res.json(menu)
            }
        }) 
    }
      
})


},

allMenu:(req,res)=>{

Site.findOne({_id: req.params.site_id}, (err,site)=>{

    Menu.find({}, (err,menus)=>{

        if(err){
            res.json(err);
        }else {
            res.json(menus);
        }

    })
})

},


addLyric:(req,res)=>{

    Artist.findOne({_id: req.params.artist_id}, (err,artist)=>{

        Music.findOne({_id: req.params.music_id}, (err,music)=>{

            Lyric.create(req.body,(err,lyric)=>{

                if (err){
                    console.log("music validation has found error");
                    res.json(err);
                }else {
                    Music.update({_id: req.params.music_id}, {$push: { lyrics: lyric}}, (err,data)=>{
                        if(err){
                            res.json(err);
                        }else {
                            res.json(data);
                        }
                    })
                }
            })
        })
    })
},


removeLyric:(req,res)=> {
    Artist.findOne({_id: req.params.artist_id}, (err,artist)=>{

            Music.update({_id: req.params.music_id}, {$pull: {lyrics: {_id: req.params.lyric_id}}}, (err,data)=>{

                if(err){
                    res.json(err);
                }else {
                    res.json(data);
                }
            })

    })

}

}
    

    

    

   

    
   
    



    
    