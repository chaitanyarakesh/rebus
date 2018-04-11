RapidApp.factory('UserDetails',function($http){

	return {
		saveUserDetails : function(userdata){
			return $http.post('/SaveUserDetails',userdata)
		},
		updateUsesrDetails : function(userdata){
			return $http.post('/UpdateUser',userdata)
		},
		getuserdata:function(Dataobj){
			return $http.post('/GetUserData',Dataobj)

		}
	}

})