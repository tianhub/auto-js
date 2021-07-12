let date = new Date();
let hour = date.getHours();

let getCoupon = [23, 0]; // 领取时间段
let flashSale = [9, 10, 17, 18, 11, 12]; // 抢购时间段

const start = () => {
  auto(); // 自动开启无障碍服务
  events.observeKey(); // 启用按键监听
  events.setKeyInterceptionEnabled(['volume_down'], true); // 屏蔽音量键
  events.onKeyDown('volume_down', function() {
    run();
  })
}

const run = () => {
  let count = 0;
  if (flashSale.indexOf(hour) > -1) {
    toastLog('抢购脚本开始运行');
    while (true) {
      let all = text('马上抢').find();
      if (all.length) {
        all.forEach((current) => {
          let btn = current.parent();
          let depth = 4; // 遍历深度
          while (btn && depth) {
            if (btn.clickable()) {
              btn.click();
              count++;
            }
            btn = btn.parent();
            depth--;
          }
        });
        toastLog('脚本运行结束 共领取' + count + '个优惠券');
        exit();
      }
    }
  } else if (getCoupon.indexOf(hour) > -1) {
    toastLog('领取脚本开始运行');
    while (true) {
      let all = text('立即领取').find();
      if (all.length) {
        all.forEach((current) => {
          if (current.clickable) {
            current.click();
            sleep(6);
            count = count + 1;
          }
        });
        toastLog('脚本运行结束 共领取' + count + '个优惠券');
        exit();
      }
    }
  } else {
    toastLog('请在规定的时间内运行脚本')
    exit();
  }
}




module.exports.start = start;