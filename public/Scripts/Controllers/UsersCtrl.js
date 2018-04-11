/**
 * @author Divya
 * @created date 09/11/2017
 * @Modified By Divya
 * @Modified Date 09/11/2017
 */

RapidApp.controller('UserFormListCtrl', function ($scope, $location, $state) {
    localStorage.setItem('id', '');
    localStorage.setItem('type', '');

    $scope.go = function (path) {
        $location.path(path);
    };
    $scope.Userform_update = function () {
        if (Sel_name == undefined || Sel_name == "undefined" || Sel_name == "") {
            fn_errorNotification("200", "", "", "Please Select a Record to Edit", "error_alert", "", "");
        }
        else {

            bootbox.confirm("Do You want to Edit " + Sel_name + " Details?", function (result) {
                if (result) {
                    Sel_name = "";
                    localStorage.setItem('id', rowid);
                    localStorage.setItem('type', 'edit');
                    $state.go('Users', {
                        id: rowid,
                        type: 'edit',
                        Name: Sel_name
                    });
                }
            });
        }
    };
});

RapidApp.controller('UsersCtrl', function ($scope, $location, $stateParams,UserDetails) {
    //var id = $stateParams.id;
    //var type = $stateParams.type;

    var id = localStorage.getItem('id');
    var type = localStorage.getItem('type');
    var jobj = new Object();

    /*To populate data in main form for edit operation*/
    if (type == "edit") {
        var Dataobj = [];
        jobj.id = id;
        Dataobj.push(jobj);
        StartPageLoader();



        UserDetails.getuserdata(JSON.stringify(Dataobj)).then(function(response){
            if (response.isauthenticated == false) {
                            StopPageLoader();
        
                            //fn_session_expired_client();
        
                        }
                        else if (response.error) {
                            fn_errorNotification("200", response.error, response.error, "error occured at getting data with code fn_save_details_003", "error_alert", "", "");
                            StopPageLoader();
                        }
                        else {
                            $("#txt_EmpId").val(response[0]["EmployeeId"]);
                            $("#txt_firstname").val(response[0]["Firstname"]);
                            $("#txt_lastname").val(response[0]["Lastname"]);
                            $("#txt_EmailId").val(response[0]["EmailId"]);
                            $("#txt_countrycode").val(response[0]["Countrycode"]);
                            $("#txt_Mobilenumber").val(response[0]["Mobilenumber"]);
        
                            $("#idUserlabel").val(response[0]["Id"]);
                            if (response[0]["chk_active"] == true || response[0]["chk_active"] == "true") {
                                $("#chk_active").attr('checked', 'checked');
                            }
                            else {
                                $("#chk_active").prop('');
                            }
        
                            setTimeout(function () {
                                $("#txt_Role").val(response[0]["Role"]);
                                $("#txt_Role").trigger("chosen:updated");
                                $("#txt_passwordPolicy").val(response[0]["PasswordPolicy"]);
                                $("#txt_passwordPolicy").trigger("chosen:updated");
                            }, 100);
                            //$("#txt_passwordPolicy").val(response[0]["PasswordPolicy"]).trigger("chosen:updated");
                            StopPageLoader();
                        

            
                        }
        })
        .catch(function(jqHXR,exception){
            fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at getting data with code getupdatedata_003", "error_alert", "", "");
            StopPageLoader();
            
        })
        // $.ajax({
        //     url: "/GetUserData",
        //     type: 'POST',
        //     contentType: 'application/json',
        //     data: JSON.stringify(Dataobj),
        //     success: function (response) {
        //         if (response.isauthenticated == false) {
        //             StopPageLoader();

        //             //fn_session_expired_client();

        //         }
        //         else if (response.error) {
        //             fn_errorNotification("200", response.error, response.error, "error occured at getting data with code fn_save_details_003", "error_alert", "", "");
        //             StopPageLoader();
        //         }
        //         else {
        //             $("#txt_EmpId").val(response[0]["EmployeeId"]);
        //             $("#txt_firstname").val(response[0]["Firstname"]);
        //             $("#txt_lastname").val(response[0]["Lastname"]);
        //             $("#txt_EmailId").val(response[0]["EmailId"]);
        //             $("#txt_countrycode").val(response[0]["Countrycode"]);
        //             $("#txt_Mobilenumber").val(response[0]["Mobilenumber"]);

        //             $("#idUserlabel").val(response[0]["Id"]);
        //             if (response[0]["chk_active"] == true || response[0]["chk_active"] == "true") {
        //                 $("#chk_active").attr('checked', 'checked');
        //             }
        //             else {
        //                 $("#chk_active").prop('');
        //             }

        //             setTimeout(function () {
        //                 $("#txt_Role").val(response[0]["Role"]);
        //                 $("#txt_Role").trigger("chosen:updated");
        //                 $("#txt_passwordPolicy").val(response[0]["PasswordPolicy"]);
        //                 $("#txt_passwordPolicy").trigger("chosen:updated");
        //             }, 100);
        //             //$("#txt_passwordPolicy").val(response[0]["PasswordPolicy"]).trigger("chosen:updated");
        //             StopPageLoader();
        //         }
        //     },
        //     error: function (jqXHR, exception) {
        //         fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at getting data with code getupdatedata_003", "error_alert", "", "");
        //         StopPageLoader();
        //     }
        // });
    }
	
	$scope.fn_save_Userdetails = function(){
		
		 var Firstname = $("#txt_firstname").val();
        var MiddelName = $("#txt_MiddelName").val();
        var Lastname = $("#txt_lastname").val();
        var EmailId = $("#txt_EmailId").val();
        var Countrycode = $("#txt_countrycode").val();
        var Mobilenumber = $("#txt_Mobilenumber").val();
        var EmployeeId = $("#txt_EmpId").val();
        var Role = $("#txt_Role option:selected").val();
        var chk_active = $("#chk_active").prop('checked');
        var Id = $("#idUserlabel").val();
        var PasswordPolicy = $("#txt_passwordPolicy").val();

        var ErFlag = 0;

        $(".Error").hide();

        if (Firstname == "" || Firstname == "null" || Firstname == null) {
            ErFlag++;
            $("#er_fName").show();
            $("#er_fName").html("<b> first !! </b> Input is required.");
        }

        if (Lastname == "" || Lastname == "null" || Lastname == null) {
            ErFlag++;
            $("#er_LName").show();
            $("#er_LName").html("<b> lastname !! </b> Input is required.");
        }

        if (EmailId == "" || EmailId == "null" || EmailId == null) {
            ErFlag++;
            $("#er_EmailID").show();
            $("#er_EmailID").html("<b> email id !! </b> Input is required.");
        }
        if (Countrycode == "" || Countrycode == "null" || Countrycode == null) {
            ErFlag++;
            $("#er_Ccode").show();
            $("#er_Ccode").html("<b> Code !! </b> Input is required.");
        }
        if (Mobilenumber == "" || Mobilenumber == "null" || Mobilenumber == null) {
            ErFlag++;
            $("#er_MNumber").show();
            $("#er_MNumber").html("<b> Mobile Number !! </b> Input is required.");
        }
        if (EmployeeId == "" || EmployeeId == "null" || EmployeeId == null) {
            ErFlag++;
            $("#er_Empid").show();
            $("#er_Empid").html("<b> Employee Id !! </b> Input is required.");
        }
        if (Role == "" || Role == "null" || Role == null) {
            ErFlag++;
            $("#er_role").show();
            $("#er_role").html("<b> Role !! </b> Input is required.");
        }


        if (PasswordPolicy == "" || PasswordPolicy == "null" || PasswordPolicy == null) {
            ErFlag++;
            $("#er_PasswordPolicy").show();
            $("#er_PasswordPolicy").html("<b> Password !! </b> Input is required.");
        }
		if (ErFlag == 0) {

            var UserDetails = JSON.stringify({
                Firstname: Firstname,
                MiddelName: MiddelName,
                Lastname: Lastname,
                EmailId: EmailId,
                Countrycode: Countrycode,
                Mobilenumber: Mobilenumber,
                EmployeeId: EmployeeId,
                Role: Role,
                chk_active: chk_active,
                Id: Id,
                PasswordPolicy: PasswordPolicy
            });



            if ($("#idUserlabel").val() != "" && $("#idUserlabel").val() != null && $("#idUserlabel").val() != "undefined") {

                UserDetails.updateUsesrDetails(UserDetails).then(function(responce){
                    if (response.isauthenticated == false) {
                                        StopPageLoader();
            
                                        fn_session_expired_client();
            
                                    }
            
                                    else if (response.error) {
            
                                        fn_errorNotification("200", response.error, response.error, "error occured at save data with code fn_save_Userdetails", "error_alert", "", "");
                                        StopPageLoader();
                                    }
                                    else {
                                        fn_SuccessNotification(response, "success_alert", "", "");
                                        localStorage.setItem('id', '');
                                        localStorage.setItem('type', '');
                                        window.location.href = "#UserFormList";
                                        StopPageLoader();
                                    }

                })
                .catch(function(jqHXR,exception){
                    fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at update with code fn_save_Userdetails", "error_alert", "", "");
                                 StopPageLoader();

                })
                //StartPageLoader();
                 //alert(ErFlag)
            //     $.ajax({
            //         url: "/UpdateUser",
            //         type: 'POST',
            //         contentType: 'application/json',
            //         data: UserDetails,
            //         success: function (response) {
            //             if (response.isauthenticated == false) {
            //                 StopPageLoader();

            //                 fn_session_expired_client();

            //             }

            //             else if (response.error) {

            //                 fn_errorNotification("200", response.error, response.error, "error occured at save data with code fn_save_Userdetails", "error_alert", "", "");
            //                 StopPageLoader();
            //             }
            //             else {
            //                 fn_SuccessNotification(response, "success_alert", "", "");
            //                 localStorage.setItem('id', '');
            //                 localStorage.setItem('type', '');
            //                 window.location.href = "#UserFormList";
            //                 StopPageLoader();
            //             }
            //         },
            //         error: function (jqXHR, exception) {
            //             fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at update with code fn_save_Userdetails", "error_alert", "", "");
            //             StopPageLoader();
            //         }
            //     });
             }


            else {

                StartPageLoader();
				UserDetails.saveUserDetails(UserDetails).then(function(response){
					if (response.isauthenticated == false) {
                            StopPageLoader();

                            fn_session_expired_client();

                        }
                        else if (response.error) {
                            fn_errorNotification("200", response.error, response.error, "error occured at save data with code fn_save_details_001", "error_alert", "", "");
                        }
                        else {
                            fn_SuccessNotification(response, "success_alert", "", "");

                            ClearTextbox();
                        }
                        StopPageLoader();
				})
				.catch(function(jqXHR,exception){
					 fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code fn_getdata_list_001", "error_alert", "", "");
                     StopPageLoader();
				})
                /* $.ajax({
                    url: '../SaveUserDetails',
                    contentType: 'application/json',
                    type: 'POST',
                    data: UserDetails,
                    success: function (response) {
                        //alert(data);
                        if (response.isauthenticated == false) {
                            StopPageLoader();

                            fn_session_expired_client();

                        }
                        else if (response.error) {
                            fn_errorNotification("200", response.error, response.error, "error occured at save data with code fn_save_details_001", "error_alert", "", "");
                        }
                        else {
                            fn_SuccessNotification(response, "success_alert", "", "");

                            ClearTextbox();
                        }
                        StopPageLoader();
                    },
                    error: function (jqXHR, exception) {
                        fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code fn_getdata_list_001", "error_alert", "", "");
                        StopPageLoader();
                    }


                }); */
            }

        }
			
	}
		
});
