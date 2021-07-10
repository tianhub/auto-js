const { EQUIPEMENT_COLOR_COLLECTION, EQUIPEMENT_POINT_COLLECTION, ACTION_POINT_COLLECTION } = require('./constant.js');
const { fuhuojia } = EQUIPEMENT_COLOR_COLLECTION; // 复活甲配置

const run = () => {
  auto(); // 自动开启无障碍服务
  requestScreenCapture(); // 开启截屏功能
  events.observeKey(); // 启用按键监听
  events.setKeyInterceptionEnabled(['volume_down'], true); // 屏蔽音量键
  events.onKeyDown('volume_down', function() {
    judge();
  })
}

const judge = () => {
  click(185, 440); // 点击金币
  sleep(60);
  const img = images.findMultiColors(captureScreen(), fuhuojia[0], fuhuojia[1], {
    threshold: 10
  });
  if(img) { // 查到复活甲 切换名刀
    move('mingdao');
  } else { // 查不到复活甲 切复活甲
    move('fuhuojia');
  }
}

const move = (type) => {
  const { sidebar, equipment } = EQUIPEMENT_POINT_COLLECTION[type];
  const { preorder, six, sell, close, purchase } = ACTION_POINT_COLLECTION;
  click(sidebar.x, sidebar.y); // 点击左侧菜单栏
  sleep(15);
  click(equipment.x, equipment.y); // 点击想要购买的装备
  sleep(15);
  click(preorder.x, preorder.y); // 预购
  sleep(15);
  click(six.x, six.y); // 点击第六格装备
  sleep(15);
  click(sell.x, sell.y); // 出售装备
  sleep(15);
  click(close.x, close.y); // 点击关闭
  sleep(15);
  click(purchase.x, purchase.y); // 点击购买装备
}

module.exports.run = run;