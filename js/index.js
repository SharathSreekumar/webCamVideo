window.onload = function(){ // hides the Signup Div part
	$('#signup').css('display','none');
	//$('#createAcc').attr('disabled',true);
}

function hide(frame1,frame2,btn1,btn2){//(frame-to-disable, frame-to-enable, btn-to-deactivate, btn-to-activate)
	$(frame1).hide('slow');
	$(frame2).show('slow');
	$(btn1).removeClass('active');
	$(btn2).addClass('active');
}

function reset(){//to clear the value
	$('#email').value='';
	$('pass').value='';
	$('cnpass').value='';
}

function verify(){//verify(email,password,confirm-password)
	var x = document.forms["formCreate"]["email"].value;
	var y = document.forms["formCreate"]["pass"].value;
	var z = document.forms["formCreate"]["cnpass"].value;
	var radio = $('input[name=memberCreate]:checked').length; //checks if the any radio button of that group is chosen

    if (x == null || x == "" || y == null || y == "" || z == null || z == "" || radio <= 0) {
        alert("Please complete the form");
        return false;
    }else if (y!=z){
    	alert("Password Incorrect!");
    	return false;
    }
}

function verifyLogin() {// verify the attributes in the the login Form
	var user = document.forms["formLogin"]["userid"].value;
	var pass = document.forms["formLogin"]["pass"].value;
	var radio = $('input[name=memberLog]:checked').length;

	if(user==null||user==""||pass==null||pass=="" || radio <= 0){//if radio < 0 , then none selected
		alert("Please enter UserId and Password");
        return false;	
	}
}