device.keepScreenOn()
auto.waitFor()
auto.setMode("fast")
app.launch("com.tecent.mm")


var unread_chat = className("TextView").depth(14).id('ga3').find();
console.log("<<<<<<<>>>>>>>")
console.log("未屏蔽的聊天，未读数量为:" + unread_chat.size())
if(! unread_chat.empty()){
    dealChat(unread_chat)
    console.log("Completed unmuted groups!!!!")
}else{
    console.log("没有未读的朋友消息")
}


var sheild_chat = className("ImageView").depth(14).id("tt").find()
console.log("已屏蔽的聊天，未读数量为:" + sheild_chat.size())
if(! sheild_chat.empty()){
    dealChat(sheild_chat)
    console.log("Completed muted groups!!!!")
}else{
    console.log("没有未读的屏蔽消息")
}

console.log("==============")
console.log("finished") 

function dealChat(chat_list) {
    for(var i = 0; i < chat_list.length; i++ ) {
        var chat = chat_list[i]
        console.log("open msg: " + chat.id() + ", " + chat.bounds())
        var b = chat.bounds()
        click(b.centerX(), b.centerY())
        // 等待跳转到对话框页面
        className("ScrollView").depth(14).id("g78").findOne()

        var exceedMsgs = className("LinearLayout").depth(9).id("am2").findOne(1000)
        
        console.log("check redpacket")
        for (var loop = 0; loop < 5; loop++) {
            console.log("loop : " + loop)

            var redpacket_list = className("TextView").id("r8").find()
            console.log("检测到红包个数: " + redpacket_list.length)

            for(var k = 0; k < redpacket_list.length; k++) {
                var redpacket = redpacket_list[k]
                var redpacket_parent = redpacket.parent()
                if(redpacket_parent.childCount() == 1) {
                    console.log("发现新红包")
                    var rpb = redpacket.bounds()
                    click(rpb.centerX(), rpb.centerY())
                    console.log("打开新红包")
                    openNewRedPacket()
                    sleep(1000)
                }
                else if (k == (redpacket_list.length - 1)) {
                    console.log("当前页面已经检测完成")
                }
                else{
                    console.log("无效红包，跳过")
                }
            }
            
            var scrollEm = className("ListView").depth(10).id("an3").findOnce()
            if (scrollEm != null & exceedMsgs != null) {
                console.log("loop : " + loop + ", 进入下一轮")
                scrollEm.scrollUp()
                sleep(500)
                exceedMsgs = className("LinearLayout").depth(9).id("am2").findOnce()
            }
            else{
                console.log("loop : " + loop + ", 跳出")
                back()
                break
            }
        }
    }
    
}

//领取点开的红包
function openNewRedPacket(){
    var draw = desc("开").findOne(1000);
    console.log("调试信息2");
    if(draw != null){
        console.log("#### 点开新红包");
        console.time("openrp")
        draw.click();
        console.log("点击成功");
        
        className("TextView").depth(16).id("det").findOne()
        console.timeEnd("openrp")
        //领完返回聊天主页
        back();
        className("FrameLayout").depth(8).id("al8").findOne()
    }else{
        console.log("过期之类无效红包");
    }
    back();
    className("LinearLayout").depth(12).id("b4r").findOne()
    console.log("返回成功");
}
