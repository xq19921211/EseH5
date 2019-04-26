<template>
  <div class="e">
    <!--title-->
    <div class="_title">
     <van-nav-bar
        title="订单详情"
        left-arrow
        @click-left="onClickLeft"
      />
     </div>
     <!--job-->
     <div>
      <div class="job">
        <h2>B1夜班-消控岗</h2>
        <p>服务地址：{{}}</p>
        <p>开始时间：{{}}</p>
        <p>结束时间：{{}}</p>
      </div>
     </div>
     <!--details-->
     <div>
        <div class="details">
          <p>
            <span>订单金额：</span>
            <span class="red">¥88</span>
          </p>
          <p>
            <span>订单详情：</span>
            <span class="red">{{state}}</span>
          </p>
          <p>
            <span>编号：********</span>
            <span>
              <van-button type="info" size="mini">复制</van-button>
            </span>
          </p>
          <div class="joe"></div>
          <p>
            下单人信息
          </p>
          <div class="order">
            <span>
              <i class="van-icon van-icon-manager"></i>
            </span>
            <div class="order_p">
              <p style="text-align:left">E安全平台系统</p>      
              <p style="text-align:left">七星广场</p>     
            </div>
            <span>
              <i class="van-icon van-icon-phone-o" @click="phoneCall('10000')"></i>
            </span>
          </div>
        </div>
        <div class="joe"></div>
        <div class='task_del'>
          <h4 style="text-align:left">订单任务详情</h4>
          <p style="text-align:left">消控岗-七星广场</p>
        </div>
     </div>
     <div :class="{disnone:isshow}" class="over">
       <h3>订单操作记录：</h3>
       <van-steps direction="vertical" :active="0">
        <van-step>
          <h3>订单完成，操作人：{{}}</h3>
          <p>{{}}</p>
        </van-step>
        <van-step>
          <h3>验收完成，操作人：{{}}</h3>
          <p>{{}}</p>
        </van-step>
        <van-step>
          <h3>服务完成，操作人：{{}}</h3>
          <p>{{}}</p>
        </van-step>
        <van-step>
          <h3>服务开始，操作人：{{}}</h3>
          <p>{{}}</p>
        </van-step>
        <van-step>
          <h3>确认接单，操作人：{{}}</h3>
          <p>{{}}</p>
        </van-step>
        <van-step>
          <h3>提交订单，操作人：{{}}</h3>
          <p>{{}}</p>
        </van-step>
      </van-steps>
     </div>
     <van-popup v-model="show" position="bottom" :overlay="true">
      <div class='pop'>
       <p class='pop_t'>
         <span @click="yes">确定</span>
         <span @click="no">取消</span>
       </p>
       <p class="pop_m">
         <i class="van-icon van-icon-location-o"><!--定位--></i>
         <span @click="city">{{LocationCity}}</span>
       </p>
       <div class="photo">
        <div class="photograph">
          <van-uploader :after-read="onRead">
            <van-icon name="van-icon van-icon-plus" />
          </van-uploader>
        </div>
       </div>
     </div>
     </van-popup>
     <div class="bottom_btn">
       <van-button
         size="large"
         @click="change"
         :style="{background:btn_color}"
         color="#fff"
        >{{dan}}
        </van-button>
     </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Icon,
 Tabbar, 
 TabbarItem, 
 Dialog,
 Popup, 
 Uploader, 
 Step, 
 Steps
 } from 'Vant'
import BMap from 'BMap'
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Step).use(Steps)
Vue.use(Icon, Dialog, Uploader, Popup)
export default {
  name: 'home',
  data () {
    return {
      state:'待接单',
      dan:'立即接单',
      btn_color:"#26a5f1",
      show:false,
      isshow:true,
      timer: null,
      LocationCity:"正在定位",
      location: null
     }
  },
  mounted(){
      this.city()  //触发获取城市方法
      let _this = this
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          const myGeo = new BMap.Geocoder()
          myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), data => {
            if (data.addressComponents) {
              const result = data.addressComponents
              const location = {
                creditLongitude: r.point.lat, // 经度
                creditLatitude: r.point.lng, // 纬度
                creditProvince: result.province || '', // 省
                creditCity: result.city || '', // 市
                creditArea: result.district || '', // 区
                creditStreet: (result.street || '') + (result.streetNumber || '') // 街道
              }
              _this.location = location
            }
          })
        }
      })
    },
  updated (){
    if(this.dan=='等待验收'){
        this.timer=setTimeout(()=>{
        this.state='已完成'
        this.dan='订单已完成'
        this.isshow=false
      },2000)
      console.log("溜了溜了")
      }
    },
  methods:{
   change(){
     if(this.dan=='立即接单'){
      Dialog.confirm({
        title: '确认接单',
        message: '请确认您接单的内容'
      }).then(() => {
      if(confirm){
        this.state='待服务',
        this.dan='开始服务'
        }
      }).catch(() => {
        // on cancel
      })
      }else if(this.dan=='开始服务'){
        this.show=true
      }else if(this.dan=='结束服务'){
        Dialog.confirm({
        title:'确认结束服务',
        message:'请确认已到服务时间'
      }).then(() => {
        if(confirm){
         this.state="待验收"
         this.dan='等待验收'
         this.btn_color='#d1d1d1'
        }
      }).catch(() => {
        // on cancel
      })
      }
    },
    city(){ //定义获取城市方法
        const geolocation = new BMap.Geolocation();
        var _this = this
        geolocation.getCurrentPosition(function getinfo(position){
            let city = position.address.city;             //获取城市信息
            let province = position.address.province;    //获取省份信息
            _this.LocationCity = city
        }, function(e) {
            _this.LocationCity = "定位失败"
        }, {provider: 'baidu'});		
        },
    onClickLeft(){
      this.state='待接单',
      this.dan='立即接单',
      this.btn_color="#26a5f1",
      this.isshow=true
    },
    onRead(file) {
      console.log(file)
    },
    phoneCall: function (msg) {
      console.log(msg)
      window.location.href="tel:10000"
    },
    yes(){
      this.show=false,
      this.dan='结束服务'
      this.state='服务中'
      },
    no(){
      this.show=false
      }
    }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 @import "./index.css"
</style>
