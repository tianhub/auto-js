let testTime = [9, 59, 59, [900, 999]]; // 时 分 秒 毫秒区间

const refresh = () => { // 刷新页面
  id("game_actionbar_overflow_btn").findOne().click()
  id("game_web_head_item_title").className("android.widget.TextView").text("刷新").findOne().parent().click();
}

const reciveGift = () => {
  for(;;) {
    let duihuan = className("android.view.View").text("兑换").findOne(3000);
    if (duihuan) {
      duihuan.click();
      let confirm = className("android.view.View").text("确认兑换").findOne(3000);
      if (confirm) {
        confirm.click();
      } else {
        return;
      }
    } else {
      return;
    }
    sleep(300);
  }
  toastLog('领取成功')
}

const untilTime = () => {
  let isRight = false;
  while (!isRight) {
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();
    let second = currentTime.getSeconds();
    let milliseconds = currentTime.getMilliseconds();
    isRight = hour === testTime[0] && minute === testTime[1] && second === testTime[2] && ( milliseconds >= testTime[3][0] && milliseconds <= testTime[3][1] );
    log(isRight);
    sleep(40);
  }
  refresh();
  reciveGift();
}

const start = () => {
  auto(); // 自动开启无障碍服务
  events.observeKey(); // 启用按键监听
  events.setKeyInterceptionEnabled(['volume_down'], true); // 屏蔽音量键
  toastLog('程序启动成功，请按下音量下键启动');
  events.onKeyDown('volume_down', function() {
    run();
  })
}

const run = () => {
  toastLog('抢购脚本开始运行');
  untilTime();
}

module.exports.start = start;