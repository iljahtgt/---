var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');

var bcrypt = require('bcrypt-nodejs');
var db = require('./database');
var conn = mysql.createConnection(db.connection);
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

conn.query('USE ' + db.database);

require('dotenv').config;

module.exports = function (passport) {


    // Register 註冊
    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
            function (req, username, password, done) {
                conn.query("select * from useracc where username = ?", [username], function (err, rows) {
                    if (err)
                        return done(err);
                    if (rows.length) {
                        return done(null, false, req.flash('signupMessage', 'already used'));
                    } else {
                        var newUserMysql = {
                            username: username,
                            password: bcrypt.hashSync(password, null, null),

                        };
                        var insertQuery = "insert into useracc ( username, password) values(?, ?)";
                        conn.query(insertQuery, [newUserMysql.username, newUserMysql.password], function (err, result) {
                            newUserMysql.id = result.insertId;
                            console.log(username, password);
                            return done(null, newUserMysql);
                        });
                    }
                });
            })
    );

    // 登入
    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
            function (req, username, password, done) {
                conn.query('select * from useracc where username = ?', [username], function (err, rows) {
                    if (err)
                        return done(err)
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'No user'));
                    }

                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Wrong passsword'));

                    return done(null, rows[0]);
                });
            })
    );

    // facebook
    passport.use(new FacebookStrategy({
        clientID: process.env.CLIENT_ID_FB,
        clientSecret: process.env.CLIENT_SECRET_FB,
        callbackURL: "http://localhost:3000/auth/facebook/scerets"
    }, function (accessToken, refreshToken, profile, done) {
        // conn.query('select * from facebook where Facebook_ID = ?',[profile.id],function(err,user){
        //     if(err){
        //         return done(err);
        //     }else if(user.length==0){
        //         var user={Facebook_ID:profile.id,First_Name:profile.displayName,FB_Private_Chat_ID:'000001100'};

        //         conn.query('insert into facebook set ?', user, (err, res) => {
        //             if (err) throw err;
        //             console.log('ID:', profile.id);
        //         })
        //     }
        // })
        // var user = { Facebook_ID: profile.id, First_Name: profile.displayName, FB_Private_Char_ID: '000001100' };
        return done(null,profile);
        
    }));


    //google
    
    passport.use(new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/google/callback"
    },
        function (accessToken, refreshToken, profile, done) {
            var user={
                googleId:profile.id,
                displayName:profile.displayName,
                firstName:profile.name.givenName,
                lastName:profile.name.familyName,
                image:profile.photos[0].value,
            }
            console.log(user);
            // try{
            //     var user=User.findOne({googleId:profile.id})

            //     if(user){
            //         done(null,user)
            //     }else{
            //         user=User.create(newUser)
            //         done(null,user)
            //     }
            // }catch(err){
            //     console.error(err)
            // }
            //use the profile info(mainly profile id) to check if the user is registered in ur db 
            return done(null,profile)
        }
    ));


    // 序列化
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // 反序列化
    passport.deserializeUser(function (id, done) {
        conn.query("select * from stuBeat.sbmember where id = ? ", [id], function (err, result) {
            return done(err, result[0]);
        });
        // done(null,user);
        
    });



};