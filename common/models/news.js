'use strict';

const app = require('../../server/server');
const ct  = require('../models/util/constants');

module.exports = function(News) {

    News.createNews = function(user_id, title, content, photo, category, keywords, status, cb){
        let UserModel = app.models.Users;
        if(user_id == undefined || title == undefined ||content == undefined ||photo == undefined){
            cb(null, ct.HTTP_STATUS_ERROR, 'params invalid', null);
        }
        UserModel.findOne({where:
            {_id: user_id}
        }).then( result => {
            console.log('result', result)
            if(result){
                let data = {}
                data['user_id']   = user_id;
                data['title']     = title;
                data['content']   = content;
                data['photo']     = photo;
                data['category']  = category;
                data['keywords']  = keywords;
                data['status']    = status;
                data["date"]      = Math.floor(Date.now() / 1000);

                News.create(data).then(result => {
                    cb(null, ct.HTTP_STATUS_OK, ct.MESSAGE_GET_SUCCESS, result);
                }).catch((err) =>{
                    cb(null, ct.HTTP_STATUS_ERROR, ct.MESSAGE_GET_FAILED, err);
                });
            }else{
                cb(null, ct.HTTP_STATUS_ERROR, 'Người dùng không tồn tại', {});
            }
        }).catch(err => {
            cb(null, ct.HTTP_STATUS_ERROR, ct.MESSAGE_GET_FAILED, err);
        })
    }

    News.getListAll = function(type, page, size, status,cb){
        size = parseInt(size, 10);
        page = parseInt(page, 10);
        let skip = (page - 1) * size;

        News.find({
            include:{
                relation:'getUser',
                scope:{
                    fields:['fullname', 'username', 'email','phone']
                }
            },
            where :{category:type, status},
            limit : size,
            skip:skip
        }).then(results => {
            if(results){
                if (!results) {
                    results = [];
                  }
                  let next_page = results.length - size < 0 ? -1 : page + 1;
                cb(null, ct.HTTP_STATUS_OK, ct.MESSAGE_GET_SUCCESS, {results,next_page});
            }else{

            }
        })
    }

    News.getByCategory = function(){

    }

    News.getById = function(news_id, status,  cb){
        News.findOne({
            include:{
                relation:'getUser',
                scope:{
                    fields:['fullname', 'username', 'email','phone']
                }
            },
            where :{_id:news_id}
        }).then((result) =>{
            cb(null, ct.HTTP_STATUS_OK, ct.MESSAGE_GET_SUCCESS, {result});
        }).catch(err =>{
            cb(null, ct.HTTP_STATUS_ERROR, ct.MESSAGE_GET_FAILED, err);
        })
    }

    News.updateById = function(user_id, news_id,  title, content, photo, category, keywords, status, cb){
        News.findOne({where:{_id:news_id, user_id}})
        .then(result =>{
            if(result){
                console.log('photo', photo)
                // let photos = JSON.stringify(photo) ;
                // console.log('photo', photo, photos)
                let data = {user_id,  title, content, photo, category, keywords, status}
                News.updateAll({_id:news_id, user_id},data).then(news =>{
                    cb(null, ct.HTTP_STATUS_OK, ct.MESSAGE_GET_SUCCESS, {news});
                })
            }else{
                cb(null, ct.HTTP_STATUS_NOT_FOUND, ct.MESSAGE_NOT_FOUND, {});
            }
        }).catch(err =>{
            cb(null, ct.HTTP_STATUS_ERROR, ct.MESSAGE_GET_FAILED, err);
        })
    }

    News.deleteById = function(news_id, user_id, cb){

    }

    News.search = function(){

    }
    News.remoteMethod('createNews',{
        http :{verb: 'post'},
        accepts : [
            { arg: 'user_id', type: 'string', required: true },
            { arg: 'title', type: 'string', required: true },
            { arg: 'content', type: 'string', required: true },
            { arg: 'photo', type: 'object', required: true },
            { arg: 'category', type: 'string',  default: 'news' },
            { arg: 'keywords', type: 'string', required: true },
            { arg: 'status', type: 'string', default: 1 },
        ],
        returns :[
            {arg:'response_code', type :'number'},
            {arg:'message', type :'string'},
            {arg:'data', type:'object'}
        ]
    })

    News.remoteMethod('getListAll',{
        http :{verb: 'post'},
        accepts : [
            { arg: 'type', type: 'string', default: 'news' },
            { arg: 'page', type: 'string', required: true, default: 1 },
            { arg: 'size', type: 'string', required: true, default: 10 },
            { arg: 'status', type: 'string', required: true },
        ],
        returns :[
            {arg:'response_code', type :'number'},
            {arg:'message', type :'string'},
            {arg:'data', type:'object'}
        ]
    })

    News.remoteMethod('getByCategory',{
        http :{verb: 'post'},
        accepts : [
            { arg: 'category', type: 'string', required: true },
            { arg: 'status', type: 'string', required: true },
        ],
        returns :[
            {arg:'response_code', type :'number'},
            {arg:'message', type :'string'},
            {arg:'data', type:'object'}
        ]
    })

    News.remoteMethod('getById',{
        http :{verb: 'post'},
        accepts : [
            { arg: 'news_id', type: 'string', required: true },
            { arg: 'status', type: 'string'},
        ],
        returns :[
            {arg:'response_code', type :'number'},
            {arg:'message', type :'string'},
            {arg:'data', type:'object'}
        ]
    })

    News.remoteMethod('updateById',{
        http :{verb: 'post'},
        accepts : [
            { arg: 'user_id', type: 'string', required: true },
            { arg: 'news_id', type: 'string', required: true },
            { arg: 'title', type: 'string', required: true },
            { arg: 'content', type: 'string', required: true },
            { arg: 'photo', type: 'array', required: true },
            { arg: 'category', type: 'string',  default: 'news' },
            { arg: 'keywords', type: 'string', required: true },
            { arg: 'status', type: 'string', default: 1 },
        ],
        returns :[
            {arg:'response_code', type :'number'},
            {arg:'message', type :'string'},
            {arg:'data', type:'object'}
        ]
    })

    News.remoteMethod('deleteById',{
        http :{verb: 'post'},
        accepts : [
            { arg: 'news_id', type: 'string', required: true },
            { arg: 'user_id', type: 'string' },
        ],
        returns :[
            {arg:'response_code', type :'number'},
            {arg:'message', type :'string'},
            {arg:'data', type:'object'}
        ]
    })

    News.remoteMethod('search',{
        http :{verb: 'post'},
        accepts : [
            { arg: 'keyword', type: 'string', required: true },
            { arg: 'status', type: 'string', required: true },
        ],
        returns :[
            {arg:'response_code', type :'number'},
            {arg:'message', type :'string'},
            {arg:'data', type:'object'}
        ]
    })
};
