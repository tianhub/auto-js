let point = {}; // 首页图标点位


const start = () => {
  auto(); // 自动开启无障碍服务
  requestScreenCapture(); // 开启截屏功能
  events.observeKey(); // 启用按键监听
  events.setKeyInterceptionEnabled(['volume_down'], true); // 屏蔽音量键
  events.onKeyDown('volume_down', () => {
    run();
  })
  point = findPoint(); // 保存位置供下次使用
}

const run = () => {
  clearCache();
  beforeEnter();
}

const findPoint = () => {
  const screen = captureScreen();
  const icon = images.read("./res/icon.png");
  const point = findImage(screen, icon, {
    threshold: 0.8
  });
  icon.recycle();
  return point;
}

const test = () => {
}

const beforeEnter = () => {
  sleep(2000);
  click(point.x, point.y);
  sleep(9000);
  click(540, 1759); // 权限
  sleep(50);
  click(540, 1759); // 权限
  sleep(10000);
  click(804, 1448);
  sleep(1000);
  click(916, 745);
  sleep(4000);
  click(533, 2198);
  sleep(10000);
  click(93, 2310);
  sleep(1500);
  swipe(550, 1600, 550, 0, 500); // 滑动到最底部
  swipe(550, 1600, 550, 0, 500);
  swipe(550, 1600, 550, 0, 500);
  click(529, 2073); // 点击每日免费礼包
  sleep(200);
  click(529, 2073); // 关闭每日免费礼包
  sleep(200);
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