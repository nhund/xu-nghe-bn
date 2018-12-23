'use strict';

module.exports = function(Category) {
    Category.create = function(){

    }

    Category.getListAll = function(){

    }

    Category.getById = function(){

    }

    Category.updateById = function(){

    }

    Category.deleteById = function(){

    }

    Category.search = function(){

    }

    Category.remoteMethod('create',{
        http :{verb: 'post'},
        accepts : [
            { arg: 'title', type: 'string', required: true },
            { arg: 'price', type: 'number', required: true },
            { arg: 'thumbnails', type: 'string', required: true },
            { arg: 'user_id', type: 'string', required: true },
            { arg: 'description', type: 'string', required: true },
            { arg: 'sale', type: 'string', required: true },
            { arg: 'category', type: 'string', required: true },
            { arg: 'keywords', type: 'string', required: true },
            { arg: 'status', type: 'string', required: true },
        ],
        returns :[
            {arg:'response_code', type :'number'},
            {arg:'message', type :'string'},
            {arg:'data', type:'object'}
        ]
    })

    Category.remoteMethod('getListAll',{
        http :{verb: 'post'},
        accepts : [
            { arg: 'status', type: 'string', required: true },
        ],
        returns :[
            {arg:'response_code', type :'number'},
            {arg:'message', type :'string'},
            {arg:'data', type:'object'}
        ]
    })

    Category.remoteMethod('getById',{
        http :{verb: 'post'},
        accepts : [
            { arg: 'product_id', type: 'string', required: true },
            { arg: 'status', type: 'string', required: true },
        ],
        returns :[
            {arg:'response_code', type :'number'},
            {arg:'message', type :'string'},
            {arg:'data', type:'object'}
        ]
    })

    Category.remoteMethod('updateById',{
        http :{verb: 'post'},
        accepts : [
            { arg: 'product_id', type: 'string', required: true },
            { arg: 'status', type: 'string', required: true },
        ],
        returns :[
            {arg:'response_code', type :'number'},
            {arg:'message', type :'string'},
            {arg:'data', type:'object'}
        ]
    })

    Category.remoteMethod('deleteById',{
        http :{verb: 'post'},
        accepts : [
            { arg: 'product_id', type: 'string', required: true },
            { arg: 'status', type: 'string', required: true },
        ],
        returns :[
            {arg:'response_code', type :'number'},
            {arg:'message', type :'string'},
            {arg:'data', type:'object'}
        ]
    })

    Category.remoteMethod('search',{
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
