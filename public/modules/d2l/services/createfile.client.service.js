'use strict';

angular.module('d2l').factory('CreateFile',CreateFile);

function CreateFile($resource) {
    return {
        create: create,
        read: read
    };

    function create(){
        console.log('Create Function from CreateFile');
        var o = $resource('/userInfo',
            {userId: 123, cardId:'@id'},
            {
                charge:{method:'POST', params:{charge:true}},
                getInfo:{method:'GET'}
            });
        return o;
    }

    function read(){
        console.log('read Function from CreateFile');
        var o =$resource('/createFile', {},
            {
                readFile:{method:'GET', params:{id:'@id'}}
            });
        return o;
    }
}
