$(function() {
    //初始化右侧滚动条
    //这个方法定义在scroll.js中
    resetui();

    //为发送按钮绑定鼠标点击事件
    $('#btnSend').on('click', function() {
            var text = $('#ipt').val().trim();
            if (text.length <= 0) {
                return $('#ipt').val('');
            }
            //如果用户输入了聊天内容，则将聊天内容追加到页面上显示
            $('.talk_list').append('<li class="right_word"><img src="img/person02.png" /><span>' + text + '</span> </li>');
            $('#ipt').val('');
            //重置滚动条的位置
            resetui();
            //发送请求，获取聊天内容
            getMsg(text);

        })
        //获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function(res) {
                console.log(res);
                if (res.message === 'success') {
                    //接受聊天消息
                    var msg = res.data.info.text;
                    $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /><span>' + msg + '</span> </li>');
                    //充值滚动条
                    resetui();
                    //调用getVoic函数，把文本转化为语音
                    getVoice(msg);
                }
            }
        })
    }

    //把文字转换为语音进行播放
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function(res) {
                // console.log(res);
                if (res.status === 200) {
                    //播放语音
                    $('#voice').attr('src', res.voiceUrl); //增加属性赋值给voice
                }
            }
        })
    }

    //
    $('#ipt').on('keyup', function(e) {
        //console.log(e.keyCode);
        if (e.keyCode === 13) {
            console.log('用户弹起了回车键');
            //调用按钮元素的click函数，可以通过编程的形式触发按钮的点击事件
            $('#btnSend').click();
        }
    })

})