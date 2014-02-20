'use strict';

angular.module('displacement.directives', []).directive('nodeView',['GraphDataService',function(GraphDataService){return{
	template: '<div class="panel panel-default"><div class="panel-heading"></div><div class="panel-body"></div></div>',
	scope:{},
	link:  function(scope, element, attrs) {
		attrs.$observe('nodeId', function(nv){
			scope.data = GraphDataService.dataById(nv); // make async?
			var parts = element.children().children()
			var head = $(parts[0]);
			var body = $(parts[1]);
			head.append("<b>" + scope.data.name + "</b>");
			var bodyObj = _.clone(scope.data);
			delete bodyObj.name;
			delete bodyObj.neoID;
			_.each(bodyObj,function(value,key,list){
				var caps = key.charAt(0).toUpperCase() + key.slice(1);
				body.append(caps);
				var list = $('<ul></ul>');
				var li = function(value){
					console.log(value,_.isNumber(value))
					if(_.isNumber(value)){
						value = GraphDataService.dataById(value).name
					}
					return '<li>'+ value +'</li>';
				}
				if(_.isArray(value)){
					_.each(value,function(v2,k2,l2){
						list.append(li(v2))
					})
				} else {list.append(li(value))}
				body.append(list);
			})
       });
	}
}}])