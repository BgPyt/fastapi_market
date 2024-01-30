$(".form-login").submit(function(event) {
    event.preventDefault()
    const form = $(this)
    $.ajax({
        url: form.attr('action'),
        data: $(this).serialize(),
        method: "post",
        success : function(data, textStatus, jqXHR) {
            window.location.replace('/')
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (!($(".error").length)) {
                $("#login-password").after("<label class='error'>Неверный логин или пароль</label>")
                $("#login, #login-password").css("background-color", "#ffcfcf")
            }
            
        }
    })
})


$(".form-register").submit(function(event) {
    event.preventDefault()
    const form = $(this)
    const formJSON = form.serializeJSON()
    $.ajax({
        url: form.attr('action'),
        data: JSON.stringify(formJSON),
        method: "post",
        contentType: 'application/json',
        success : function(data, textStatus, jqXHR) {
            $(".user-message-block").css('display', 'flex')
            $('.user-message-block, .user-message-button_close').click(function(event) {
                console.log(event)
                if (['user-message-block', 'user-message-button_close'].includes($(event.target).attr('class'))) {
                    $(".user-message-block").css('display', 'none')
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('.error').remove()
            $('.register-on').css('background-color', '#f6f6f6')
            console.log(jqXHR)
            if (errorThrown == 'Unprocessable Entity' && !($('#email-error').length)) {
                add_error('#register-email', 'Некорректный email', 'error-email', 'email')
            }
            else if (jqXHR.responseJSON['detail'] == "PASSWORDS DON'T MATCH") {
                add_error('.register-password', 'Пароли не совпадают', 'error-password', 'repeat_password')
            }
            else {
                add_error('#register-email', 'Пользователь с таким email уже существует', 'error-email', 'email') 
            }
        }
    })
})



function add_error (tag, error_text, label_id, selector) {window.location.replace('/user/login')
    $(tag + `[name=${selector}]`).after(`<label id='${label_id}' class='error'>${error_text}</label>`)
    $(tag).css("background-color", "#ffcfcf")
}

$("#log-block-auth").click(function() {
    $("#log-block").removeClass("fadeInDown")
    $("#log-block").css("display", "none")
    $("#log-block").addClass("fadeInDown")
    $("#auth-block").css("display", "flex")
})

$("#auth-block-log").click(function() {
    $("#auth-block").removeClass("fadeInDown")
    $("#auth-block").css("display", "none")
    $("#auth-block").addClass("fadeInDown")
    $("#log-block").css("display", "flex")
})


$(".login-password").click(function() {
    if ($(this).attr('id') == 'login-close-password') {
        $(this).addClass('hide-svg')
        $('#login-open-password').removeClass('hide-svg')
        $("#login-password").attr('type', 'text')
    }
    else {
        $(this).addClass('hide-svg')
        $('#login-close-password').removeClass('hide-svg')
        $("#login-password").attr('type', 'password')
    }
        
})
