<template>
	<div class="seller-wrapper" ref="sellerWrapper">
		<div class="seller-content">
			<div class="info">
				<div class="title">
					<div class="text">{{datas.seller.name}}</div>
					<div class="star-wrapper">
						<star :size="36" :score="datas.seller.score"></star>
						<span class="rate-count">({{datas.seller.ratingCount}})</span>
						<span class="sell-count">{{datas.seller.sellCount}}单</span>
					</div>
					<div class="collect" @click="show =!show">
						<span class="icon-favorite" :class="{'active':show}"></span>
						<span class="text">{{show?'已收藏':'收藏'}}</span>
					</div>
					<div class="remark">
						<div class="block">
							<h2>起送价</h2>
							<div class="content">
								<span class="num">{{datas.seller.minPrice}}</span>元
							</div>
						</div>
						<div class="block">
							<h2>商家配送</h2>
							<div class="content">
								<span class="num">{{datas.seller.deliveryPrice}}</span>元
							</div>
						</div>
						<div class="block">
							<h2>平均配送时间</h2>
							<div class="content">
								<span class="num">{{datas.seller.deliveryTime}}</span>分钟
							</div>
						</div>
					</div>
					<div class="activities">
						<div class="bulletin">
							<h1>公告与活动</h1>
							<div class="content">{{datas.seller.bulletin}}</div>
						</div>
					</div>
					<div class="supports">
						<ul>
							<li class="item" v-for="item in datas.seller.supports">
								<span class="iconMap" :class="icon[item.type]"></span>
								<span class="text">{{item.description}}</span>
							</li>
						</ul>
					</div>
					<div class="divider"></div>
					<!-- <div class="imgs">
						<h1>商家实景</h1>
						<div class="img-wrapper" ref="picsWrapper">
		          	<div ref="picList">
		           		<img v-for="pic in datas.seller.pics" :src="pic" width="120" height="90">
		         		</div>
	        	</div>
        	</div>
					<div class="divider"></div> -->
					<div class="seller-info">
						<h1>商家信息</h1>
						<ul class="info-list">
							<li class="info">该商家支持发票，请下单写好发票抬头</li>
							<li class="info">品类：其他菜系，包子粥店</li>
							<li class="info">北京市昌平区回龙观西大街龙观置业大厦底座B座102单元1340</li>
							<li class="info">营业时间:10:00-20:30</li>
						</ul>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import star from './mods/star.vue'
	import icon from './mods/icon.vue'
	import Scroll from 'better-scroll'
	export default {
		props: ['datas'],
		data () {
			return {
				show: false,
				icon
			}
		},
		components: {
			star
		},
		mounted () {
			// eslint-disable no-new
			new Scroll(this.$refs['sellerWrapper'],{
				click: true
			})
		}
	}
</script>
