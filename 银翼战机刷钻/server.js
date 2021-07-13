const { AD_COLOR_COLLECTION } = require('./constant.js');
let point = {}; // 首页图标点位


const start = () => {
  auto(); // 自动开启无障碍服务
  requestScreenCapture(); // 开启截屏功能
  events.observeKey(); // 启用按键监听
  toast('启动成功');
  events.setKeyInterceptionEnabled(['volume_down'], true); // 屏蔽音量键
  point = findPoint(); // 保存位置供下次使用
  events.onKeyDown('volume_down', () => {
    run();
  })
}

const run = () => {
  while(true) {
    clearCache();
    beforeEnter();
    closeAd();
    get30();
    // get10();
  }
}

const closeAd = () => {
  const todayGift = searchPoint(AD_COLOR_COLLECTION.todayGift);
  if(todayGift) {
    click(todayGift.x, todayGift.y);
    sleep(1000);
  } else {
    toast('没查到每日礼包广告')
  }
}

const searchPoint = (colors) => {
  const point = images.findMultiColors(captureScreen(), colors[0], colors[1], {
    threshold: 10
  });
  return point;
}

const findPoint = () => {
  const screen = captureScreen();
  const icon = images.read("./res/icon.png");
  const point = findImage(screen, icon, {
    threshold: 0.8
  });
  icon.recycle();
  if(!point) {
    toast('未查到主页图标，程序即将退出')
    exit();
  }
  return point;
}

const test = () => {
}

const beforeEnter = () => {
  sleep(2000);
  click(point.x, point.y);
  sleep(700);
  click(540, 1759); // 权限
  sleep(50);
  click(540, 1759); // 权限
  sleep(9000);
  click(804, 1448); // 同意
  sleep(1000);
  click(916, 745); // x
  sleep(5600);
  click(540, 2200); // 开始游戏
  sleep(12800);
}

const until = (colors) => {
  const point = searchPoint(colors);
  if(point) {
    toast('找到了')
    return point;
  } else {
    toast('没找到')
    sleep(5000);
    return until(colors);
  }
}

const get10 = () => { // 获取每日免费礼包10钻
  click(93, 2310);
  sleep(1500);
  swipe(550, 1600, 550, 0, 500); // 滑动到最底部
  swipe(550, 1600, 550, 0, 500);
  swipe(550, 1600, 550, 0, 500);
  sleep(1000);
  click(529, 2073); // 点击每日免费礼包
  sleep(1000);
  click(529, 2073); // 关闭每日免费礼包
  sleep(2000);
}

const get30 = () => { // 获取每日免费礼包30钻
  click(1000, 328);
  sleep(1000);
  click(493, 1981);
  sleep(1000);
  swipe(550, 1600, 550, 500, 500); // 滑动到最底部
  sleep(1000);
  click(888, 1693); // 点击每日免费礼包30
  sleep(1000);
  click(888, 1693); // 关闭每日免费礼包30
  sleep(2500);
}

const clearCache = () => {
  home();
  sleep(1000); // 不设置延时会直接进游戏中
  press(point.x, point.y, 500);
  sleep(1000)
  const btnInfo = text('应用信息').findOne();
  btnInfo.click();
  sleep(1000);
  const btnStore = text('存储').findOne();
  btnStore.parent().parent().parent().parent().click(); // 存储的第四父层级
  sleep(1000);
  const btnClear = text('清除数据').findOne();
  btnClear.click();
  sleep(1000);
  const btnConfirm = text('确定').findOne();
  btnConfirm.click();
  sleep(1000);
  home();
}


module.exports.start = start;