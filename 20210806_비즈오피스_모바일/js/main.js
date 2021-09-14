$(document).ready(function(){
    // 현재시간 값 받아오고 보여주기
    window.onload = clock;

    function clock(){
        var cur_hours = document.getElementById('current_hours');
        var cur_minutes = document.getElementById('current_minutes');
        var cur_seconds = document.getElementById('current_seconds');

        var cur_time = new Date();

        var cur_h = cur_time.getHours();
        var cur_m = cur_time.getMinutes();
        var cur_s = cur_time.getSeconds();


        if(cur_h < 10){
            cur_h = '0' + cur_h
        }
        if(cur_m < 10){
            cur_m = '0' + cur_m
        }
        if(cur_s < 10){
            cur_s = '0' + cur_s
        }

        cur_hours.innerHTML = cur_h
        cur_minutes.innerHTML = cur_m
        cur_seconds.innerHTML = cur_s
    }
    setInterval(clock,1000);
    // ================================

    // 메뉴 탭
    $('.list_depth_01 > li').on('click',function(){
        $('.list_depth_01 > li').removeClass('on');
        $(this).addClass('on');
        $('.list_depth_01 > li > div').hide();
        $(this).children('div').show();
    })

    $('.list_depth_02 > li > span').on('click',function(){
        $('.list_depth_02 > li').removeClass('on');
        $(this).parent().addClass('on');
        $('.list_depth_02 > li > img').prop('src','images/down_arrow.png')
        $(this).next().prop('src','images/up_arrow.png')
        $('.list_depth_03').hide();
        $(this).next().next().show();
    })

    $('.list_depth_03 > li > span').on('click',function(){
        $('.list_depth_03 > li').removeClass('on');
        $(this).parent().addClass('on')
    })
    // ============================


    // 출근입력 시간 출력
    $('.time_check_in').one('click',function(){
        var inner_txt = $('.current_time > span').text();
        $(this).text(inner_txt);
    })
    // =================


    // 메일 리스트
    $('.mail_tab').on('click',function(){
        $('.main_content').hide();
        $('.mail_content').show();
    })

    $('.prev_page_btn').on('click',function(){
        $('.mail_content').hide();
        $('.main_content').show();
    })

    $('.mail_content .mail_list dl').on('click',function(){
        $('.layOut_layer').hide();
        $('.mail_confirm').show();
    })
    // ============================


    // 메뉴탭에서 나갈때 이전 페이지로 나가기
    var code = 'MAIN';
    var layOut = $('.layOut_layer');
    $('.main_btn').on('click',function(){
        layOut.hide();
        $('.main_content').show();
        code = 'MAIN';
        console.log(code)
    })
    $('.mail_btn').on('click',function(){
        layOut.hide();
        $('.mail_content').show();
        code = 'MAIL';
    })
    $('.menu_btn').on('click',function(){
        layOut.hide();
        $('.menu_tab').show();
    })
    $('.org_btn').on('click',function(){
        layOut.hide();
        $('.organization_chart').show();
        code = 'ORG';
    })
    $('.cash_btn').on('click',function(){
        layOut.hide();
        $('.payment_content').show();
        code = 'CASH';
    })
    $('.person_btn').on('click',function(){
        layOut.hide();
        $('.contact').show();
        code = 'PERSON';
    })

    $('.menu_tab .close img').on('click',function(){
        layOut.hide();
        if(code == 'MAIN') {
            $('.main_content').show();
        } else if (code == 'MAIL') {
            $('.mail_content').show();
        } else if(code == 'WRITE') {
            $('.mail_write').show();
        } else if(code == 'ORG') {
            $('.organization_chart').show();
        } else if(code == 'CASH') {
            $('.payment_content').show();
        } else if(code == 'PERSON') {
            $('.contact').show();
        }
    })
    // ===================================


    // 메일 선택시 상단 검은색 박스
    $('.mail_content input[type="checkbox"] + label span').on('click',function(){
        var checked_val = $(this).parent().prev().prop('checked')

        if(checked_val == false){
            $(this).parents('li').css('background-color','#F2F7FD')
        } else if(checked_val == true) {
            $(this).parents('li').css('background-color','')
        }

        if(checked_val == true && $('.list_checked_area').css('display') == 'none') {
            $('.list_checked_area').hide();
        } else if(checked_val == false && $('.list_checked_area').css('display') == 'none') {
            $('.list_checked_area').show();
        }
    })

    $('.list_checked_area .close_btn').on('click',function(){
        $('.list_checked_area').hide();
    })
    // ========================================================


    // 메일 작성 페이지
    $('.write_page_move').on('click',function(){
        $('.layOut_layer').hide();
        $('.mail_write').show();
        code = 'WRITE';
    })

    $('.mail_write_close').on('click',function(){
        $('.layOut_layer').hide();
        $('.mail_content').show();
    })

    $('.receiver_txt .reference_expand_icon').on('click',function(){
        $(this).toggleClass('on');
        $('.reference_expand_area').toggle();
    })

    $('.add_file .reference_expand_icon').on('click',function(){
        $(this).toggleClass('on');
        $('.file_area').toggle();
    })
    // =====================================


    // 조직도
    $('.chart_depth_01 > li.expand > p > span.expand_icon').on('click',function(){
        $(this).parents('li').children('ul').toggle();
        $(this).parents('li').toggleClass('on');
    })

    $('.chart_depth_02 > li.expand > span.expand_icon').on('click',function(){
        $(this).parent().children('ul').toggle();
        $(this).parent().toggleClass('on');
    })

    $('.chart_depth_03 > li.expand > span.expand_icon').on('click',function(){
        $(this).parent().children('ul').toggle();
        $(this).parent().toggleClass('on');
    })

    $('.organization_chart .close_btn').on('click',function(){
        $('.organization_chart').hide();
        $('.main_content').show();
    })
    // ============================================================


    // 연락처
    $('.contact .close_btn').on('click',function(){
        $('.contact').hide();
        $('.main_content').show();
    })

    $('.contact_add_icon').on('click',function(){
        var add_txt = $(this).parent().prev().children('p').eq(0).text();
        var $span = $("span").addClass('selected_list').html(add_txt);
        $('.selected .tab_center').append($span);
        // $('.selected').css('display','flex');        
        // $('.selected .tab_center').html("<span class='selected_list'>" + add_txt + "</span>")
    })

    $('.selected_list').on('click',function(){
        $(this).css('background-color','red')
        console.log('a')
    })

   
    // ==========================================================


    // 받은 메일
    $('.mail_confirm_prev').on('click',function(){
        $('.mail_confirm').hide();
        $('.mail_content').show();
    })


    // 전자결재
    $('.payment_content .prev_page_btn').on('click',function(){
        $('.payment_content').hide();
        $('.main_content').show();
    })

    $('.payment_content input[type="checkbox"] + label span').on('click',function(){
        var checked_val = $(this).parent().prev().prop('checked')

        if(checked_val == false){
            $(this).parents('li').css('background-color','#F2F7FD')
        } else if(checked_val == true) {
            $(this).parents('li').css('background-color','')
        }
    })
})