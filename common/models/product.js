'use strict';

module.exports = function(Product) {
    Product.create = function(){

    }

    Product.getListAll = function(){

    }

    Product.getByCategory = function(){

    }

    Product.getById = function(){

    }

    Product.updateById = function(){

    }

    Product.deleteById = function(){

    }

    Product.search = function(){

    }

    Product.remoteMethod('create',{
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

    Product.remoteMethod('getListAll',{
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

    Product.remoteMethod('getByCategory',{
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

    Product.remoteMethod('getById',{
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

    Product.remoteMethod('updateById',{
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

    Product.remoteMethod('deleteById',{
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

    Product.remoteMethod('search',{
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
