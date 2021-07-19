<template>
	<view class="page">   
		<view class="turntable-box">
			<view class="turn-item" v-for="(it,idx) in list" :style="{transform: `rotate(${idx*baseDeg}deg) skewY(${Math.abs(90-baseDeg)}deg)`, backgroundColor: colors[idx%9]}">
				<view class="item-text" :style="{transform: `rotate(${idx*baseTure}turn)`}">{{it.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bar: 0,
			colors: ['#EE534F', '#DA70D6', '#FFA827', '#5C6BC0', '#42A5F6', '#66BB6A', '#FFC928', '#AA47BC', '#EC407A', '#FF7F50'],
			list: [
				{
					name: '1111'
				},
				{
					name: '222222'
				},
				{
					name: '33333'
				},
				{
					name: '44444'
				},
				{
					name: '55555'
				},
				{
					name: '44444'
				},
				{
					name: '55555'
				},
			]
		}
	},
	computed: {
		baseDeg() {
			if(this.list.length == 0){
				return 0
			}
			return 360/this.list.length
		},
		baseTure() {
			if(this.list.length == 0){
				return 0
			}
			return 1/this.list.length
		}
	},
	created() {
		
	},
	onShow() {
		
	},
	methods: {
		pageReload() {
		},
		abs(val){
			return abs
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	width: 100%;
	min-height: 100%;
	height: 100%;
	font-size: 24rpx;
	padding-top: 100rpx;
	
	.pic{
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.turntable-box{
		width: 600rpx;
		height: 600rpx;
		border-radius: 50%;
		margin: 0 auto;
		border: 2rpx solid #000000;
		overflow: hidden;
		position: relative;
		.turn-item{
			box-shadow: 0 0 1px #000 inset;
			position: absolute;
			width: 300rpx;
			height: 300rpx;
			transform-origin: right bottom 0;
			-webkit-transform-origin: right bottom 0;
			.item-text{
				width:26rpx;
				height:262rpx;
				overflow:hidden;
				word-break:break-all;
				// transform-origin: 50% 50%;
				transform-origin: right bottom 0;
			}
		}
	}
	
}
</style>
