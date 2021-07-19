<template>
	<view style="height:100%">
	   <view style='width:100%;margin:0 auto;text-align:center;font-size:34rpx;margin-bottom:10rpx;'>{{awardsConfig.option}}</view>
	   <view style='width:100%;margin:0 auto;text-align:center;margin-bottom:44rpx;color:#1078e7;font-size:30rpx'>{{s_awards}}</view>
	   
	   <!-- myAwards就是当被子组件触发时的函数 size:转盘大小 -->
	   <zhuanpan id='zhuanpan' 
	   ref='zhuanpan'
	   @myData='getData' 
	   @myAwards="getAwards" 
	   @startZhuan="startZhuan" 
	   :size='size' 
	   :musicflg='musicflg' 
	   :fastJuedin='fastJuedin' 
	   :repeat='repeat' 
	   :zhuanpanArr='xiaojuedingArr' 
	   :awardsConfig='awardsConfig'>
	   </zhuanpan>
	
	   <view style='margin-top:60rpx'></view>
	
		<template v-for='(item,index) in xiaojuedingArr'>
			<view class='juedinoption' v-if='index<3 && share' :key='index' @click='xiaojueding(index)' >{{item.option}}</view>
		</template>
	
	   <!-- <view class='share' v-if='!share'>
	      <button class="index__share" openType="share">
	         转发给朋友
	      </button>
	      <button class="index__share" bindtap='generate'>
	         分享到朋友圈
	      </button>
	   </view> -->
	   
	   <template v-if="saveFrameFlag">
	      <view class="middle-flex-column-center" style="position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.2);z-index:10000;">
	         <view class="middle-flex-column-center" style="width:600rpx;height:920rpx;background:#ffffff;border-radius:16rpx;">
	            <view style="width:400rpx;height:650rpx;">
	               <image style="width:100%;height:100%;" :src="shengchengUrl"></image>
	            </view>
	            <view style="width:600rpx;height:80rpx;line-height:80rpx;text-align:center;font-size:28rpx;color:#1078e7;">保存后分享到朋友圈</view>
	            <view style="width:600rpx;height:70rpx;" class="middle-flex-row-center">
	               <button style="margin:0;padding:0;width:200rpx;height:70rpx;color: #1078e7;border-radius: 8rpx;border: 1px solid #1078e7;background: none;font-size: 28rpx;text-align:center;line-height:70rpx;" @click='closeSaveFrame'>关闭</button>
	               <button style="margin:0;padding:0;width:200rpx;height:70rpx;color: #1078e7;border-radius: 8rpx;border: 1px solid #1078e7;background: none;font-size: 28rpx;text-align:center;line-height:70rpx;margin-left:30rpx;" @click='saveImage'>保存图片</button>
	            </view>
	         </view>
	      </view>
	   </template>
	   
	   <template v-if="showCanvasFlag">
	      <canvas canvas-id="shareCanvas" style="border:1px dashed black;" :style="{width:canvasWidth+'px',height:canvasHeight+'px'}"></canvas>
	   </template>
	   
	</view>
	
</template>

<script>
	// import zhuanpan from '@/components/zhuanpan/zhuanpan.vue'
	var util = require('../../utils/util.js')
	var app = getApp();
	
	var xiaojuedingArr = require('../../utils/xiaojueding.js')
	uni.setStorageSync('all', xiaojuedingArr);
	uni.setStorageSync('num', 100);
	
	function randomsort(a, b) {
	   return Math.random() > .5 ? -1 : 1;
	}
	
	export default {
		data() {
			return {
				size:{ //转盘大小可配置
				   w:599,
				   h:600
				},
				musicflg: true,
				fastJuedin: false,
				repeat: false,
				xiaojuedingArr: xiaojuedingArr.sort(randomsort),
				awardsConfig: {
					awards: []
				},
				s_awards: '？',//结果
				
				share: true,
				
				
				//画布--------------------------------
				canvasWidth: 400,
				canvasHeight: 650,
				showCanvasFlag: false,
				
				colorArr: [
				   '#EE534F',
				   '#FF7F50',
				   '#FFC928',
				   '#66BB6A',
				   '#42A5F6',
				   '#5C6BC0',
				   '#AA47BC',
				   '#EC407A',
				   '#FFB6C1',
				   '#FFA827'
				],
				fontArr: ['italic', 'oblique', 'normal'],
				sizeArr: [12, 14, 16, 18, 20, 22, 24, 26, 28],
				
				eweimaUrl: '../../images/erweima.jpg',
				
				shengchengUrl: '',
				
				saveFrameFlag: false,
			}
		},
		// components: { zhuanpan },
		onLoad() {
			console.log('=========onload============');
			// this.zhuanpan = this.selectComponent("#zhuanpan");
			this.zhuanpan = this.$refs['zhuanpan']
			this.awardsConfig = this.xiaojuedingArr[0]
			console.log(this.awardsConfig)
			this.zhuanpan.initAdards(this.awardsConfig)
		},
		onShow() {
			console.log('============onShow============');
			var that = this, switchTab = uni.getStorageSync('switchTab'), all = uni.getStorageSync('all'), xiaojuedingArr = that.xiaojuedingArr;
			
			//判断从热门小决定 还是个人小决定跳转过来的 还是编辑页面跳过来的
			all = app.globalData.defaultJueding ? xiaojuedingArr : app.globalData.myJueding ? all : xiaojuedingArr;
			
			that.musicflg = !app.globalData.musicflg ? true : false
			that.fastJuedin = app.globalData.juedin ? true : false
			that.repeat = app.globalData.repeat ? true : false
			
			//跳转过来的
			if (!util.isNull(switchTab)) {
			   
			   uni.showLoading({
			      title: '加载中',
			   })
			   switchTab = switchTab == '00' ? '0' : switchTab;
			   setTimeout(function () {
			      for (let i in all) {
			         if (all[i].id == switchTab) {
			            that.zhuanpan.switchZhuanpan(all[i], true);//切换当前转盘数据选项 
						that.zhuanflg = false
			            break;
			         }
			      }
			      uni.hideLoading();
			   }, 500)
			}
		},
		methods: {
			//接收当前转盘初始化时传来的参数
			getData(e){
				this.awardsConfig = e
			},
			
			//接收当前转盘结束后的答案选项
			getAwards(e) {
				this.s_awards = e.end ? "？" : e.s_awards
				this.share = e.end ? true : false
			},
			
			//开始转
			startZhuan(e) {
				this.zhuanflg = e ? true : false
			},
			//点击切换转盘选项
			xiaojueding(e) {
			   var that = this, idx = e, xiaojuedingArr = that.xiaojuedingArr;
			   console.log(xiaojuedingArr,that.awardsConfig)
			   
			   if (!that.zhuanflg) {
			      for (let x in xiaojuedingArr) {
					  console.log(x,xiaojuedingArr[x])
			         if (idx == x && xiaojuedingArr[x].option != that.awardsConfig.option) {
			            that.zhuanpan.switchZhuanpan(xiaojuedingArr[x]);//切换当前转盘数据选项 
			            return;
			         }
			      }
			   }
			},
			//关闭保存图片的框
			closeSaveFrame: function () {
			   var that = this;
			   that.zhuanpan.reset();
			   that.saveFrameFlag = false
			},
			
			//保存图片
			saveImage: function () {
			   var that = this;
			   var filePath = that.shengchengUrl;
			
			   uni.saveImageToPhotosAlbum({
			      filePath: filePath,
			      success: function (res) {
			         uni.showToast({
			            title: '保存图片成功！',
			            icon: 'none',
			            duration: 1000,
			            mask: true,
			         })
			      }
			   })
			},
			
			//分享到朋友圈
			generate() {
			   uni.showLoading({
			      title: '正在生成中',
			   })
			
			   var that = this;
			   that.showCanvasFlag = true
			
			   var textArr = [];
			   for (var i = 0; i < that.awardsConfig.awards.length; i++) {
			      textArr.push(that.data.awardsConfig.awards[i].name);
			   }
			
			
			   that.makeImageCanvas('shareCanvas', that.awardsConfig.option, textArr, that.colorArr, that.fontArr, that.sizeArr, 600, 20, 20, 40, that.canvasWidth, that.canvasHeight, 120, 400, that.eweimaUrl);
			
			   setTimeout(function () {
			      uni.canvasToTempFilePath({
			         x: 0,
			         y: 0,
			         width: that.canvasWidth,
			         height: that.canvasHeight,
			         canvasId: 'shareCanvas',
			         success: function (res) {
			            console.log(res.tempFilePath);
						that.showCanvasFlag = false
						that.saveFrameFlag = true
						that.shengchengUrl = res.tempFilePath
			
			            uni.hideLoading();
			         }
			      })
			   }, 2000)
			},
			//数组随机取出一个数
			arrayRandomTakeOne: function (array) {
			   var index = Math.floor((Math.random() * array.length + 1) - 1);
			   return array[index];
			},
		}
	}
</script>

<style>
page {
   height: 100%;
   position: fixed;
   left: 0;
   top: 0;
}

.canvas-container {
   margin: 0 auto;
   position: relative;
}

.gb-wheel-content {
   position: relative;
   margin: 0 auto;
   z-index: 2;
   width: 660rpx;
   height: 660rpx;
   box-sizing: border-box;
   border-radius: 50%;
   /* border: 20rpx solid #4e413b; *//* border: 20rpx solid #f0f0f0; *//* background-clip: padding-box;
   background: radial-gradient(rgba(100, 100, 100, 0.1) 15%, transparent 16%) 0 0,
                radial-gradient(rgba(100, 100, 100, 0.1) 15%, transparent 16%) 8px 8px,
                radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 0 1px,
                radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 8px 9px; *//* background-color: #e2ded3; *//* background-color: transparent;#BDB76B */
   background-size: 12px 14px;
   box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2) inset;
   overflow: hidden;
}

.gb-wheel-run {
   box-shadow: 0 0 5rpx 0rpx rgba(0, 0, 0, 0.98);
   width: 700rpx;
   height: 700rpx;
   border-radius: 50%;
   border: 30rpx solid #f1ecec;
   box-sizing: border-box;
   position: absolute;
   left: 27rpx;
   top: -19rpx;
   opacity: 0.7;
}

.gb-wheel-line {
   margin: 0 auto;
   position: relative;
   width: 100%;
   height: 100%;
   z-index: 9;
}

.gb-wheel-litem {
   position: absolute;
   left: 340rpx;
   top: 0;
   width: 1.2px;
   height: 340rpx;
   /* background-color: #4e413b; */
   background-color: #fff;
   overflow: hidden;
   transform-origin: 50% 340rpx;
}

.gb-wheel-list {
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   z-index: 9;
}

.gb-wheel-item {
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   color: #fff;
   text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
}

.gb-wheel-icontent {
   position: relative;
   display: block;
   padding-top: 50rpx;
   margin: 0 auto;
   text-align: center;
   transform-origin: 50% 328rpx;
}

/* ***************************** */

.canvas-list {
   position: absolute;
   left: 0;
   top: 0;
   width: inherit;
   height: inherit;
   z-index: 8;
}

.canvas-item2 {
   position: absolute;
   left: 0px;
   top: 0;
   width: 660rpx;
   height: 330rpx;
   color: #e4370e;
   font-weight: bold;
   transform-origin: 330rpx 330rpx;
   overflow: hidden;
}

.canvas-item2-after {
   position: absolute;
   top: 0;
   left: 0;
   width: 330rpx;
   height: 330rpx;
   transform-origin: 330rpx 330rpx;
   opacity: 1;
}

.back {
   position: absolute;
   width: 100%;
   height: 90%;
   background: rgba(255, 255, 255, 0.5);
   left: 0;
   top: -40rpx;
   z-index: 8888;
}

.juedinoption {
   font-size: 30rpx;
   color: #1078e7;
   width: 100%;
   text-align: center;
   margin-top: 30rpx;
   text-decoration: underline;
}

.share {
   width: 100%;
   height: 180rpx;
   display: flex;
   align-items: center;
   justify-content: space-around;
}

.index__share {
   width: 36%;
   color: #1078e7;
   border-radius: 8rpx;
   border: 1px solid #1078e7;
   background: none;
   font-size: 28rpx;
   padding: 10rpx 0;
}




/*居中--弹性--竖向--中间*/
.middle-flex-column-center{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/*居中--弹性--横向--中间*/
.middle-flex-row-center{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
</style>
