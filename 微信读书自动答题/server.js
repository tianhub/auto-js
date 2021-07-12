const run = () => {
  auto(); // 自动开启无障碍服务
  requestScreenCapture(); // 开启截屏功能
  events.observeKey(); // 启用按键监听
  events.setKeyInterceptionEnabled(['volume_down'], true); // 屏蔽音量键
  events.onKeyDown('volume_down', () => {
    test();
  })
}

const test = () => {
  const ocr = $plugins.load("com.hraps.ocr")
  //导入需识别的图片，请自行输入图片路径
  const img = images.read("./res/image.jpg")
  //识别图片
  let results = ocr.detect(img.getBitmap(),1)
  console.info("过滤前结果数："+results.size())
  //识别结果过滤
  console.time()
  results = ocr.filterScore(results,0.7, 0.7, 0.7)
  console.timeEnd()
  img.recycle();
  //输出最终结果
  for(var i=0;i<results.size();i++){
    var re = results.get(i)
    log("结果:"+i+"  文字:"+re.text+"  位置:"+re.frame+"  角度类型:"+re.angleType)
    log("区域置信度:"+re.dbScore+"  角度置信度:"+re.angleScore+"  文字置信度:"+re.crnnScore+"\n")
  }
  console.log('运行结束')
}

module.exports.run = run;