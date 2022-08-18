---
title: EX2
updated: 2022-08-18 14:26:29Z
created: 2022-08-18 13:14:58Z
---

# 2022年夏季《移动软件开发》实验报告



<center></center>

| 姓名和学号？         |                   |
| -------------------- | -------------------------------- |
| 本实验属于哪门课程？ | 中国海洋大学22夏《移动软件开发》 |
| 实验名称？           | 实验2：天气查询小程序          |
| 博客地址？           | https://www.cnblogs.com/amonologue/p/16600304.html                         |
| Github仓库地址？     | https://github.com/Acolasiasss/EX2                          |

（备注：将实验报告发布在博客、代码公开至 github 是 **加分项**，不是必须做的）



## **一、实验目标**

1、掌握服务器域名配置和临时服务器部署；2、掌握 wx.request 接口的用法。



## 二、实验步骤

列出实验的关键步骤、代码解析、截图。
1.API密钥申请：
首先注册和风天气账号，依据老师给出的教程步骤，成功申请到密钥和调用API
2.然后依教程创建项目，进行视图和页面设计
3.接着进行逻辑实现，依次完成更新省、市、区信息，获取天气数据以及更新页面天气信息，操作很简单，依教程理解并修改各文件代码即可
修改后代码如下：
1.index.js
```
// index.js
Page({
  /**
    *页面的初始数据
    */
    data: {
      region: ['安徽省', '芜湖市', '镜湖区']
    },
    /**
    *更新省.市、区信息
    */
    regionChange: function(e) {
      this.setData({region: e.detail.value});
    },


  /**
   * 获取实况天气数据
   */
    getWeather: function() {
      var that = this;
      wx.request({
        url: 'https://free-api.heweather.com/s6/weather/now', data:{
        location: that.data.region[1],
        key:'0a23e85336f54921adfc3f648ef40095'/**这里填自己的key */
      },
      success: function(res) {
        console.log(res.data);
      }
    })
  },

    /**
    *更新省市,区信息
    */
    regionChange: function(e){
      this.setData({region: e.detail.value});
      this.getWeather();          //更新天气
    },
    /*
    *生命周期函数--监听页面加载
    */
    onLoad: function(options) {
      this.getWeather();          //更新天气
    },
    
    /**
    *获取实况天气数据
    */
    getWeather: function() {
      var that = this;
      wx.request({
        url: 'https://free-api.heweather.com/s6/weather/now',
        data:{
          location: that.data.region[1],
          key: 'f0671b6589ff43019e72970d334ea93e'
        },
        success: function(res){
          that.setData({now:res.data.HeWeather6[0].now});
        }
    })
  },
    
  /**
  *页面的初始数据
  */
  data: {
    region: ['安徽省', '芜湖市', '镜湖区'],
    now: {
      tmp: 0,
      cond_txt: '未知',
      cond_code: '999',
      hum: 0,
      pres: 0,
      vis: 0,
      wind_dir: 0,
      wind_spd: 0,
      wind_sc: 0
    }
  },
})
```
2.index.json
```
{
  "usingComponents": {}
}
```
3.index.wxml
```
<!--index.wxml-->
<view class="container">
  <!--区域1:地区选择器-->
  <picker mode = 'region' bindchange = 'regionChange'>
    <view>{{region}}</view>
  </picker >

  <!--区域2:单行天气信息-->
  <text>{{now.tmp}}℃ {{now.cond_txt}}</text>

  <!--区域3:天气图标-->
  <image src = '/images/weather_icon_s2/{{now.cond_code}}.png' mode = 'widthFix'></image >

  <!--区域4:多行天气信息-->
  <view class = 'detail'>
    <view class = 'bar'>
      <view class = 'box'>湿度</view>
      <view class = 'box'>气压</view>
      <view class = 'box'>能见度</view>
    </view >
    <view class = 'bar'>
      <view class = 'box'>{{now.hum}}</view>
      <view class = 'box'>{{now.pres}}</view>
      <view class = 'box'>{{now.vis}}</view>
    </view >
    <view class = 'bar'>
      <view class = 'box'>风向</view>
      <view class = 'box'>风速</view>
      <view class = 'box'>风力</view>
    </view >
    <view class = 'bar'>
      <view class = 'box'>{{now.wind_dir}}</view>
      <view class = 'box'>{{now.wind_spd}}</view>
      <view class = 'box'>{{now.wind_sc}}</view>
    </view>
  </view>
</view>
```
4.index.wxss
```
/*文本样式*/
text{
  font-size: 80rpx;
  color:#3C5F81;
}

/*图标样式*/
image{
  width: 220rpx;
}

/*区域4整休样式*/
.detail{
  width: 100%;
  display: flex;
  flex-direction: column;
}
/*区域4单元行样式*/
.bar{
  display: flex;
  flex-direction: row;
  margin: 20rpx 0;
}
/*区域4单元格样式*/
.box{
  width: 33.3%;
  text-align: center;
}
```
## 三、程序运行结果

列出程序的最终运行结果及截图。
手机端预览效果如下
（默认）安徽省芜湖市

![LEBX {)M7A@FUHG)(P$ ~U](https://user-images.githubusercontent.com/111416724/185420297-f7f85563-9994-4d3c-9ea6-a62cc482bcc6.png)

山东省青岛市

![29X(ARHL F4M5J_P8_NRJLX](https://user-images.githubusercontent.com/111416724/185420336-0895a626-8ebc-4cb3-8b37-2b9113824d3d.png)

再随机测试一个

![T~4_TAR~JT12L26X5~83A5](https://user-images.githubusercontent.com/111416724/185420368-1ceaa796-c85b-47f5-87d4-14be63887eb1.png)


## 四、问题总结与体会

描述实验过程中所遇到的问题，以及是如何解决的。有哪些收获和体会，对于课程的安排有哪些建议。
其实本次实验对于像我一样的初学者来说难度还是很大的，但是老师给的教程真的很详细，我下去也会继续弄明白每一步以及关键代码的意义。
对于本次实验，中途犯了一个错误：有一个地方需要填自己的key，结果我把下面有个地方一起改了，后来就不能正常获取信息了。不过还好及时发现，改正过来，但我还是有些弄不明白其中缘由，可能是两个key作用的地方不同吧。
