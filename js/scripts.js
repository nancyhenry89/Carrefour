function validate() {
    var username = document.forms["signInForm"]["username"].value;
    var password = document.forms["signInForm"]["password"].value;
    if (username == "") {
        $('#username').addClass('error');
        return false;
    } else if (password == "") {
        $('#password').addClass('error');
        return false;
    } else {
        authenticate(username, password);
        return false;
    }
}

function authenticate($username, $password) {
    $.ajax({
        type: "GET",
        url: "db.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('user').each(function() {
                var username = $(this).find('username').text();
                if ($username == username) {
                    if ($password == $(this).find("password").text()) {
                        alert('sucess');
                        $('.authFailed').hide();
                        return false;
                    } else {
                        $('.authFailed').show();
                    }
                } else {
                    $('.authFailed').show();
                }
            });
        },
        error: function() {
            alert("An error occurred while processing XML file.");
        }
    });

}
$(document).ready(function() {
    $(".search i").click(function() {
        $(".search input").fadeToggle()
    });
});