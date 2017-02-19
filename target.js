/**
 * Created by Administrator on 2017/2/19.
 */
var cdTimer;
var passwordCheck = false;
var targetInputInfo ={};
$(function(){
    if($('.error').length>0){
        if($('.error').attr('for') == "Register_email" || $('.error').attr('for') == "Register_id_card" || $('.error').attr('for') == "Register_fullname"){
            step(2);
        }
    }
    if($('.container-step-1').is(':visible'))
    {
        $('#Register_username')[0].focus();
    }

    $('input').on('focus',function(event){
        if($(event.target).parent().hasClass('error')){
            targetInputInfo.className = "error";
            $(event.target).parent().removeClass('error');
        }else if($(event.target).parent().hasClass('success')){
            targetInputInfo.className = "success";
            $(event.target).parent().removeClass('success');
        }
        targetInputInfo.content =  $(event.target).val();
    })
    $('input').on('blur',function(event){
        if(targetInputInfo.className != null && targetInputInfo.content == $(event.target).val()){
            if(!(targetInputInfo.className == 'success' && $(event.target).val() == '')){
                $(event.target).parent().addClass(targetInputInfo.className);
            }
        }
    })

    $("#show-password").on("mousedown",function(event){
        $('#Register_password_text').val($("#Register_password").val());
        $("#Register_password").addClass('hide');
        $("#Register_password_text").removeClass('hide');
    });
    $("#show-password").on("mouseup",function(event){
        $("#Register_password").removeClass('hide');
        $("#Register_password_text").addClass('hide');
    });

    $('#Register_agreen').on('ifChecked ifUnchecked', function(event) {
        if (event.type == 'ifChecked') {
            $('input[name="Register[agreen]"]').val(1);
        } else {
            $('input[name="Register[agreen]"]').val(0);
        }
    });
    $('#birthday_input').val($('#Register_birthday').val());
    $('#agreement_check').iCheck('update');

    $("#Register_retype_password").blur(checkPwd);

    $("#next_btn").on("click",function(){

        var reg_username = $('#Register_username').val();
        var realLength = 0, len = reg_username.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = reg_username.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 3;
        }
        console.log(realLength)
        if(realLength.length < 5 || realLength.length > 20){
            $('#Register_username').focus();
            return false;
        }
        var firstPw = $("#Register_password").val();
        if(firstPw.length < 7 || firstPw.length > 20){
            $('#Register_password').focus();
            return false;
        }
        if(!checkPwd())//密码验证不通过
        {
            return false;
        }

        if(!$("#Register_agreen").is(":checked")){
            $('#Register_agreen_em_').text("注册条款必须同意才能注册。");
            $('#Register_agreen_em_').show();
            return false;
        }else{
            $('#Register_agreen_em_').text("");
            $('#Register_agreen_em_').hide();
        }

        var isvisible = $("#Register_ip_count_em_").is(":visible");
        var ipcountval = $("#Register_ip_count_em_").text();
        if(isvisible && (ipcountval.length > 0)){
            return false;
        }

        $.ajax({
            url:"/home/checkVerify",
            type:"POST",
            dataType:"json",
            data:{
                Register_username:$('#Register_username').val(),
                Register_password:$('#Register_password').val(),
                Register_retype_password:$('#Register_retype_password').val(),
                Register_verify:$('#Register_verify').val(),
            },
            success:function(data){
                if(data.success === 1)
                {
                    step(2);
                }
            }
        });
    });

    $("#forward_btn").on("click",function(){//返回第一步
        step(1);
    });

    $("#user-register-form").submit(function(){
        if(!$("#Register_agreen").is(":checked")){
            $('#Register_agreen_em_').text("注册条款必须同意才能注册。");
            $('#Register_agreen_em_').show();
            return false;
        }else{
            $('#Register_agreen_em_').text("");
            $('#Register_agreen_em_').hide();
        }
    });


    $('#register_btn').on('click',function(){
        var reg_fullname = $('#Register_fullname').val();
        //var reg_identify = $('#Register_identify').val();
        var reg_email = $("#Register_email").val();

        if(reg_fullname.length == 0){
            $('#Register_fullname').focus;
        }

        if(reg_email.length == 0 || !checkemail(reg_email)){
            $('#Register_email').focus;
            return false;
        }
    });

});

function step(index){
    switch(index){
        case 1:
            $('.step2nd').removeClass('active');
            $('.container-step-1').removeClass('hide');
            $('.container-step-2').addClass('hide');
            break;
        case 2:
            $('.step2nd').addClass('active');
            $('.container-step-1').addClass('hide');
            $('.container-step-2').removeClass('hide');
            break;
        default:
            $('.step2nd').removeClass('active');
            $('.step3rd').removeClass('active');
            $('.container-step-1').removeClass('hide');
            $('.container-step-2').addClass('hide');
            $('.container-step-3').addClass('hide');
            break;
    }
}

//验证邮箱
function checkemail(email){
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    ismail= reg.test(email);
    if (!ismail ) {
        return false;
    }
    return true;
}

function register_submit(){
    $('#Register_birthday').val($('#birthday_input').val());
    $('#user-register-form').submit();
}

jQuery(document).on('click', '#register-verify', function(){
    jQuery.ajax({
        url: "\/home\/captcha.html?refresh=1",
        dataType: 'json',
        cache: false,
        success: function(data) {
            jQuery('#register-verify').attr('src', data['url']);
            jQuery('body').data('captcha.hash', [data['hash1'], data['hash2']]);
            $('#Register_verify').val('');
            $('.verification-codes').removeClass('success error');
            $('#Register_verify')[0].focus();
        }
    });
    return false;
});