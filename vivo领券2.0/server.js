const reciveGift = () => {
  for(;;) {
    let duihuan = className("android.view.View").text("兑换").findOne(5000);
    if (duihuan) {
      duihuan.click();
      let confirm = className("android.view.View").text("确认兑换").findOne(5000);
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
    let duihuanbtn = className("android.view.View").text("兑换").findOnce();
    isRight = duihuanbtn;
    sleep(20);
  }
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