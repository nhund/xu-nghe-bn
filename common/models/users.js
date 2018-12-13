'use strict';
var app = require('../../server/server');
const SALT_WORK_FACTOR = 10;
var bcrypt = require('bcryptjs');

/**
 * Built-in User model.
 * Extends LoopBack [PersistedModel](#persistedmodel-new-persistedmodel).
 * Def
 * @property {String} password Hidden from remote clients.
 * @class Users
 * 
 */
module.exports = function (Users) {

    Users.observe('before save', function check(ctx, next) {
        console.log('ctx', ctx)
        if (ctx.instance) {
            console.log('ctx.instance', ctx.instance)
        } else {
        }
        next();
    })

    Users.add = function (fullName, username, password, email, avatar, phone, cb) {
        Users.checkExsitUser(email, phone, username).
            then(function (result) {
                if (result) {
                    console.log('result the user esxited ')
                    cb(null, 201, 'fail', 'the user existed');
                } else {
                    let infoUser = {}
                    infoUser['fullName'] = fullName;
                    infoUser['username'] = username;
                    infoUser['password'] = Users.hashPassword(password);
                    infoUser['email']    = email;
                    infoUser['avatar']   = avatar;
                    infoUser['phone']    = phone;
                    infoUser['created_at'] = Math.floor(Date.now() / 1000);
                    return Users.create(infoUser);
                }
            }).then(user => {
                var tokenData = {};
                return new Promise(function (resolve, reject) {
                    tokenData.ttl = Math.min('234234', '2342345');
                    tokenData.userId = user.id;
                    app.models.AccessToken.create(tokenData, user, function (err, accessTokenData) {
                        if (err) reject(null);
                        else {
                            resolve(accessTokenData);
                        }
                    });
                }).then(function (token) {
                    user.access_token = token.id;
                    cb(null, 200, 'successful', user);
                })
            }).catch(err => {
                cb(null, 201, 'failed', err);
            });
    };

    Users.checkUsername = function (usrname) {
        return new Promise(function (resolve, reject) {
            if (!usrname) {
                resolve(null)
            }
            Users.findOne({ where: { username: username } },
                function (err, user) {
                    if (err) {
                        reject({ err });
                    } else {
                        resolve(user);
                    }
                })
        });
    };

    Users.checkPhone = function (phone) {
        return new Promise(function (resolve, reject) {
            Users.findOne({ where: { phone: phone } },
                function (err, user) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(user)
                    }
                });
        });
    };

    Users.checkExsitUser = function (email, phone, username) {
        return new Promise(function (resolve, reject) {
            Users.findOne({ where: { or: [{ email: email }, { phone: phone }, { username: username }] } })
                .then(function (user) {
                    if (user === null || user === []) {
                        resolve();
                    } else {
                        reject({ message: 'the user esxited' });
                    }
                }).catch(function (err) {
                    if (err) {
                        // TODO
                    }
                })
        });
    };

    Users.hashPassword = function (plain) {
        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        return bcrypt.hashSync(plain, salt);
    };

    Users.encodePassword = function (plain, password,  cb) {
        if (password && plain) {
            bcrypt.compare(plain, password, function (err, isMatch) {
                if (err) return cb(err);
                cb(null, isMatch);
            });
        } else {
            cb(null, false);
        }
        return cb.promise;
    };

    Users.createAccessToken = function (ttl, options, cb) {
        if (cb === undefined && typeof options === 'function') {
            cb = options;
            options = undefined;
        }

        let tokenData = {}
        if(!ttl){tokenData  
        } else{tokenData = ttl;}

        tokenData.type = 3;
        tokenData.ttl = 86400;
        return app.models.AccessToken.create(tokenData, options, cb);
    };

    Users.login = function (username, password, cb) {

        var defaultError = new Error('the fail');
            defaultError.statusCode = 401;
            defaultError.code = 'LOGIN_FAILED';

        if(username == null){
            cb(null, 201, 'the field username required', 'the field username required');
        }
        if(password == null){
            cb(null, 201, 'the field password required', 'the field password required');
        }
        this.findOne({where:{or:[{username: username}, {email: username}]}}, function(err, user){
            if (err) {
                cb(null, 201, 'the field password errr', err);
            } else if (user) {
                Users.encodePassword(password, user.password, function (err, isMatch) {
                    if (err) {
                        cb(null, 201, 'the password not match', err);
                    } else if (isMatch) {
                        let tokenData = {};
                        tokenData.userId = user.id;
                        Users.createAccessToken(tokenData, user)
                            .then(function(result){
                                cb(null, 200, 'the  login successful', result);
                            }).catch((err)=>{
                                cb(null, 201, 'the login failed', err );
                            })
                    }else{
                        cb(null, 201, 'the password not match', 'the password not match');
                    }
                })
            }
        })  
    };

    Users.remoteMethod(
        'add',
        {
            http: { verb: 'post' },
            accepts: [
                { arg: 'fullName', type: 'string', required: true },
                { arg: 'username', type: 'string', required: true },
                { arg: 'password', type: 'string', required: true },
                { arg: 'email', type: 'string' },
                { arg: 'avatar', type: 'string' },
                { arg: 'phone', type: 'string' }
            ],
            returns: [
                { arg: 'response_code', type: 'number' },
                { arg: 'message', type: 'string' },
                { arg: 'data', type: 'object' }
            ]
        }
    )

    Users.remoteMethod(
        'login', {
            http :{verb: 'post'},
            accepts : [
                { arg: 'username', type: 'string', required: true },
                { arg: 'password', type: 'string', required: true },
            ],
            returns :[
                {arg:'response_code', type :'number'},
                {arg:'message', type :'string'},
                {arg:'data', type:'object'}
            ]
        }
    )
};
