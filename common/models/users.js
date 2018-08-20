'use strict';
var app = require('../../server/server');

module.exports = function(Users) {

    Users.observe('before save', function check(ctx, next){
        console.log('ctx', ctx)
        if (ctx.instance) {
            console.log('ctx.instance', ctx.instance)
          } else {
          }
          next();
    })

    Users.addUser = function(fullName,username, password, email, avatar, phone, cb){
        let infoUser = {}
        infoUser['fullName'] = fullName;
        infoUser['username'] = username;
        infoUser['password'] = password;
        infoUser['email']  = email;
        infoUser['avatar'] = avatar;
        infoUser['phone']  = phone;
        infoUser['created_at']  = Math.floor(Date.now() / 1000);;

        Users.create(infoUser).then(result => {
            var tokenData = {};
            return new Promise(function (resolve, reject) {
                tokenData.ttl = Math.min('234234', '2342345');
                app.models.AccessToken.create(tokenData, result, function (err, accessTokenData) {
                    if (err) reject(null);
                    else {
                        resolve(accessTokenData);
                    }
                });
            }).then(function(token){
                result.access_token = token.id;
                cb(null, 200, 'successful', result);
            })
        }).catch(err => {
            cb(null, 201, 'failed', err);
          });
      ;
    }

    Users.add = function(fullName,username, password, email, avatar, phone, cb){
        let infoUser = {}
        infoUser['fullName'] = fullName;
        infoUser['username'] = username;
        infoUser['password'] = password;
        infoUser['email']  = email;
        infoUser['avatar'] = avatar;
        infoUser['phone']  = phone;
        infoUser['created_at']  = Math.floor(Date.now() / 1000);;

        Users.create(infoUser).then(result => {
            var tokenData = {};
            return new Promise(function (resolve, reject) {
                tokenData.ttl = Math.min('234234', '2342345');
                tokenData.userId = result.id;
                app.models.AccessToken.create(tokenData, result, function (err, accessTokenData) {
                    if (err) reject(null);
                    else {
                        resolve(accessTokenData);
                    }
                });
            }).then(function(token){
                result.access_token = token.id;
                cb(null, 200, 'successful', result);
            })
        }).catch(err => {
            cb(null, 201, 'failed', err);
          });
      ;
    }

    Users.remoteMethod(
        'addUser',
        {
            http:{verb:'post'},
            accepts: [
                {arg: 'fullName', type: 'string', required: true},
                {arg: 'username', type: 'string', required: true},
                {arg: 'password', type: 'string', required: true},
                {arg: 'email', type: 'string'},
                {arg: 'avatar', type: 'string'},
                {arg: 'phone', type: 'string'}
              ],
              returns: [
                {arg: '_id', type: 'string'},
                {arg: 'fullName', type: 'string'},
                {arg: 'username', type: 'string'},
                {arg: 'email', type: 'string'},
                {arg: 'avatar', type: 'string'},
                {arg: 'phone', type: 'string'}
              ]
        }
    )

    Users.remoteMethod(
        'add',
        {
            http:{verb:'post'},
            accepts: [
                {arg: 'fullName', type: 'string', required: true},
                {arg: 'username', type: 'string', required: true},
                {arg: 'password', type: 'string', required: true},
                {arg: 'email', type: 'string'},
                {arg: 'avatar', type: 'string'},
                {arg: 'phone', type: 'string'}
              ],
              returns: [
                {arg: '_id', type: 'string'},
                {arg: 'fullName', type: 'string'},
                {arg: 'username', type: 'string'},
                {arg: 'email', type: 'string'},
                {arg: 'avatar', type: 'string'},
                {arg: 'phone', type: 'string'}
              ]
        }
    )
};
