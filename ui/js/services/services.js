'use strict';

// simple stub that could use a lot of work...
myApp.factory('RESTService',
    function ($http) {
        return {
            get:function (url, callback) {
                return $http({method:'GET', url:url}).
                    success(function (data, status, headers, config) {
                        callback(data);
                        //console.log(data.json);
                    }).
                    error(function (data, status, headers, config) {
                        console.log("failed to retrieve data");
                    });
            }
        };
    }
);

myApp.factory('GraphDataService',
    function () {
        //* private *//
        //note: need to have 1 "field" to use as label, currently name
        var samplePerson = {
            name:"Dan Janson",
            companies:[11000],
            evictions: [12000,12001,12002],
            properties:  [13000,13001,13002],
            neoID: 10000
        };
        var sampleLLC = {
            name:"Shellise Enterprise",
            owners:[10000],
            evictions: [12003],
            properties: [13003],
            neoID: 11000
        };
        var sampleEviction = {
            name: "Record 123123",
            property: 13000,
            data: new Date(),
            evictor: 10000,
            neoID: 12000
        }
        var sampleProperty = {
            address: "1234 Main Street",
            name: "1234 Main Street",
            owner: 10000,
            evictions: [12000,12001,12002],
            neoID: 13000
        }
        var cache    = {};
        window.cache = cache
        var nIntsAsString = function(n){
            var res = "";
             _.times(n,function(){
                res += _.random(9)
            })
             return res;
        }
        //load persons
        cache[10000] = samplePerson;
        //load LLCs
        cache[11000] = sampleLLC;
        //load Evictions
        cache[12000] = sampleEviction;
        _.times(3,function(n){
            var i = n+1;
            var data = _.clone(sampleEviction);
            data.name = "Record " + nIntsAsString(6);
            data.property += i;
            data.neoID += i;
            if(data.neoID == 12000 || data.neoID == 12001 || data.neoID == 12002){
                data.evictor = 10000;
            } else {
                data.evictor = 11000;
            }
            cache[data.neoID] = data;
        })
        //Load properties
        cache[13000] = sampleProperty;
        _.times(3,function(n){
            var i = n+1;
            var data = _.clone(sampleProperty);
            var name = nIntsAsString(_.random(3,4)) +  " " + nIntsAsString(_.random(2)) + "th Ave"
            data.name = name;
            data.address = name;
            data.neoID += i;
            if(data.neoID == 13000 || data.neoID == 13001 || data.neoID == 13002){
                data.owner = 10000;
            } else {
                data.owner = 11000;
            }
            cache[data.neoID] = data;
        })
        //* public *//
        return {
            dataById: function(id){
                //check cache
                var res = cache[id];
                if(!_.isUndefined(res)){
                    return res;
                }
                //$http-$resource malarky, faked for now;
                return {name:"not yet DLed"}
            },
            query: function(str,callback){
                //actually make request;
                var res = "something"
                var df = function(){
                    console.log("dBang!");
                }
                _.delay(df,1000)
            }
        };
    }
);

// simple auth service that can use a lot of work... 
myApp.factory('AuthService',
    function () {
        var currentUser = null;
        var authorized = false;

        // initMaybe it wasn't meant to work for mpm?ial state says we haven't logged in or out yet...
        // this tells us we are in public browsing
        var initialState = true;

        return {
            initialState:function () {
                return initialState;
            },
            login:function (name, password) {
                currentUser = name;
                authorized = true;
                //console.log("Logged in as " + name);
                initialState = false;
            },
            logout:function () {
                currentUser = null;
                authorized = false;
            },
            isLoggedIn:function () {
                return authorized;
            },
            currentUser:function () {
                return currentUser;
            },
            authorized:function () {
                return authorized;
            }
        };
    }
);

