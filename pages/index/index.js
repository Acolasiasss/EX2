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
        key:'0a23e85336f54921adfc3f648ef40095'
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