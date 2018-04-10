RapidApp.factory('UserDetails',function($http){

	return {
		saveUserDetails : function(userdata){
			return $http.post('/SaveUserDetails',userdata)
		}
	}
})