angular.module('myApp')
    .factory('orm', ['$sails','$http', '$rootScope', function($sails, $http, $rootScope){
        var ormData = [],
            _where = {},
            _skip,
            _limit,
            _populate,
            restPrefix = 'api'
            ;
        var updateOrmData = function(itemName, data){
            for(var i = 0; i < ormData[itemName].length; i++){
                if(ormData[itemName][i].id == data.id){
                    ormData[itemName][i] = data;
                    break;
                }
            }
        };
        return {
            where: function(field, value){
                this._where[field] = value;
                return this;
            },
            skip: function(skip){
                this._skip = skip;
                return this;
            },
            limit: function(limit){
                this._limit = limit;
                return this;
            },
            populate: function(populate){
                this._populate = populate;
                return this;
            },
            getParams: function(){
                var params = [],
                    result = '';
                if(typeof this._skip != 'undefined'){
                    params.push('skip='+this._skip);
                }
                if(typeof this._limit != 'undefined'){
                    params.push('limit='+this._limit);
                }
                if(typeof this._populate != 'undefined'){
                    params.push('populate='+this._populate);
                }
                if(JSON.stringify(this._where) == '{}'){
                    params.push('where=' + JSON.stringify(this._where));
                }
                if(params.length > 0){
                    result = '?'+params.join('&');
                }
                return result;
            },
            getDataPromise: function(itemName){//remove if not used
                return $sails.get("/" + itemName);
            },
            getData: function(itemName) {
                $sails.get("/" + restPrefix + '/' + itemName + '/' + this.getParams())
                    .success(function (response) {
                        ormData[itemName] = response;
                    }).error(function (response) {
                        console.log('item name ' + itemName);
                        console.log('An error occurred ' + JSON.stringify(response));
                    });
                this.subscribe(itemName);
                return this;
            },
            fetch: function(itemName, conditions){
                if(typeof ormData[itemName] !== 'object'){
                    return [];
                }
                return ormData[itemName];
            },
            subscribe: function(itemName){
                $sails.on(''+itemName, function (message) {
                    switch (message.verb) {
                        case 'created':
                            ormData[itemName].push(message.data);
                            break;
                        case 'destroyed':
                            var index;
                            for(var i = 0; i < ormData[itemName].length; i++){
                                if(ormData[itemName][i].id == message.id){
                                    index = i;
                                    break;
                                }
                            }
                            if(typeof index != 'undefined') {
                                ormData[itemName].splice(index, 1);
                            }
                            break;
                        case 'updated':
                            updateOrmData(itemName, message.data);
                            break;
                    }
                });
            },
            getManyRelated: function(relation, foreignKey, value){//finish this
                if(typeof ormData[relation] != 'undefined'){
                    return ormData[relation].filter(function(item){
                        return item[foreignKey] == value;
                    });
                }
            },
            getOneRelated: function(relation, foreignKey, value){
                var results = this.getManyRelated(relation, foreignKey, value)[0];
            },
            delete: function(itemName, id){
                    $http.delete('/' + restPrefix + "/" + itemName + '/' + id)
                        .success(function (response) {
                            console.log( itemName + ' deleted');
                        }).error(function (response) {
                            console.log( 'An error occurred ' + JSON.stringify(response));
                        });
                    return this;
            },
            update: function(itemName, data){
                var id = data.id;
                $http.put('/' + restPrefix + '/' + itemName + '/' + id, data)
                    .success(function(response){
                        updateOrmData(itemName, data);//update internal data. Socket does not do it for us for some reason.
                        console.log(itemName + ' updated');
                    }).error(function(response){
                        console.log('An error occurred ' + JSON.stringify(response));
                    });
            },
            create: function(itemName, data){
                $http.post('/' + restPrefix + '/' + itemName, data).
                    success(function(data, status, headers, config) {
                        console.log('A new ' + itemName + ' created');
                    }).error(function(data, status, headers, config) {
                        console.log('An error occurred ' + JSON.stringify(data));
                    });
            },
            getByField: function(itemName, field, id){
                var items = this.fetch(itemName);
                return items.filter(function(item){
                    return item[field] === id;
                });
            },
            getFirstByField: function(itemName, field, id){
                var result = this.getByField(itemName, field, id);
                if(!result.length){
                    return false;
                }
                return result[0];
            }
        }
    }]
);