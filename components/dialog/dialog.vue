<template>
	<!--components/Dialog/dialog.wxml-->
	<view class='wx_dialog_container' v-if="isShow">
	   <view class='wx-mask'></view>
	   <view class='wx-dialog'>
	      <view class='wx-dialog-title'>{{ title }}</view>
	      <view class='wx-dialog-content'>{{ content }}</view>
	      <view class='wx-dialog-footer'>
	         <view class='wx-dialog-btn' @click='_cancelEvent'>{{ cancelText }}</view>
	         <view class='wx-dialog-btn' @click='_confirmEvent'>{{ confirmText }}</view>
	      </view>
	   </view>
	</view>
</template>

<script>
	export default {
		name: "Dialog",
		data() {
			return {
				// 弹窗显示控制
				isShow: false,
			}
		},
		props: {
			myProperty: {
				type: String,
				default: ''
			},
			// 弹窗标题
			title: {            
			   type: String,    
			   default: '标题'  
			},
			// 弹窗内容
			content: {
			   type: String,
			   default: '弹窗内容'
			},
			// 弹窗取消按钮文字
			cancelText: {
			   type: String,
			   default: '取消'
			},
			// 弹窗确认按钮文字
			confirmText: {
			   type: String,
			   default: '确定'
			}
		},
		computed: {
			
		},
		methods: {
			/*
			 * 公有方法
			 */
			
			//隐藏弹框
			hideDialog() {
				this.isShow = !this.isShow
			},
			//展示弹框
			showDialog() {
				this.isShow = !this.isShow
			},
			
			/*
			* 内部私有方法建议以下划线开头
			* triggerEvent 用于触发事件,过triggerEvent来给父组件传递信息的
			* 写法： this.triggerEvent('cancelEvent', {num: 1})  // 可以将num通过参数的形式传递给父组件
			*/
			_cancelEvent() {
			   //触发取消回调通
			   this.$emit("cancelEvent"); 
			},
			_confirmEvent() {
			   //触发成功回调
			   this.$emit("confirmEvent");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wx-mask {
	   position: fixed;
	   z-index: 1000;
	   top: 0;
	   right: 0;
	   left: 0;
	   bottom: 0;
	   background: rgba(0, 0, 0, 0.3);
	}
	
	.wx-dialog {
	   position: fixed;
	   z-index: 5000;
	   width: 80%;
	   max-width: 600rpx;
	   top: 50%;
	   left: 50%;
	   -webkit-transform: translate(-50%, -50%);
	   transform: translate(-50%, -50%);
	   background-color: #fff;
	   text-align: center;
	   border-radius: 3px;
	   overflow: hidden;
	}
	
	.wx-dialog-title {
	   font-size: 18px;
	   padding: 15px 15px 5px;
	}
	
	.wx-dialog-content {
	   padding: 15px 15px 5px;
	   min-height: 40px;
	   font-size: 16px;
	   line-height: 1.3;
	   word-wrap: break-word;
	   word-break: break-all;
	   color: #999;
	}
	
	.wx-dialog-footer {
	   display: flex;
	   align-items: center;
	   position: relative;
	   line-height: 45px;
	   font-size: 17px;
	}
	
	.wx-dialog-footer::before {
	   content: '';
	   position: absolute;
	   left: 0;
	   top: 0;
	   right: 0;
	   height: 1px;
	   border-top: 1px solid #d5d5d6;
	   color: #d5d5d6;
	   -webkit-transform-origin: 0 0;
	   transform-origin: 0 0;
	   -webkit-transform: scaleY(0.5);
	   transform: scaleY(0.5);
	}
	
	.wx-dialog-btn {
	   display: block;
	   -webkit-flex: 1;
	   flex: 1;
	   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	   position: relative;
	}
	
	.wx-dialog-footer .wx-dialog-btn:nth-of-type(1) {
	   color: #353535;
	}
	
	.wx-dialog-footer .wx-dialog-btn:nth-of-type(2) {
	   color: #3cc51f;
	}
	
	.wx-dialog-footer .wx-dialog-btn:nth-of-type(2):after {
	   content: " ";
	   position: absolute;
	   left: 0;
	   top: 0;
	   width: 1px;
	   bottom: 0;
	   border-left: 1px solid #d5d5d6;
	   color: #d5d5d6;
	   -webkit-transform-origin: 0 0;
	   transform-origin: 0 0;
	   -webkit-transform: scaleX(0.5);
	   transform: scaleX(0.5);
	}
</style>
