<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li class="menu-item" v-for="item in datas.goods">
					<span class="text">
						<span v-show="item.type>0" class="iconMap" :class="icon[item.type]"></span>
						{{ item.name }}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper"  ref="foodsWrapper">
			<ul>
				<li class="food-list food-list-hook" v-for="item in datas.goods">
					<h1 class="title">{{ item.name }}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item" @click="showInfo(food)">
							<div class="icon">
								<img :src="food.icon" alt="" width="57" height="57">
							</div>
							<div class="content">
								<h2 class="name">{{ food.name }}</h2>
								<p class="description">{{ food.description }}</p>
								<div class="sell-info">
									<span class="sellCount">月售{{ food.sellCount}}份</span>
									<span class="rating">好评率{{ food.rating}}</span>
									<div class="price">
										<span class="newPrice">${{ food.price }}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cartcontrol :food="food"></cartcontrol>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="shopCart">
			<div class="content" @click="showa">
				<div class="content-left">
					<div class="logo-wrapper">
						<div class="logo active">
							<i class="icon-shopping_cart"></i>
						</div>
						<div class="badge" v-show="totalPrice">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'active': totalPrice}">${{totalPrice}}</div>
					<div class="desc" v-show="totalPrice<99">另需要配送费{{ datas.seller.deliveryPrice}}元</div>
				</div>
				<div class="content-right" :class="{'enough': totalPrice >= datas.seller.minPrice}">
					<div class="pay" >{{payDesc}}</div>
				</div>
			</div>
			<transition name="transHeight">
				<div class="shopcart-list" v-show="totalPrice && show">
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="list-content" ref="listcontent">
						<ul>
							<li v-for="item in Food" class="food">
								<span class="name">{{item.name}}</span>
								<div class="price">
									<span>${{item.price}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="item"></cartcontrol>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>	
		</div>
		<foodDetail :foodDetails="foodDetails" ref="foodDetail"></foodDetail>
	</div>
</template>

<script>
	import icon from '../components/mods/icon.vue'
	import Scroll from 'better-scroll'
	import cartcontrol from './mods/cartcontrol.vue'
	import foodDetail from './mods/fooddetail.vue'
	export default{
		props:['datas'],
		data () {
			return {
				goods: this.datas.goods,
				icon,
				foodDetails: {},
				show: false
			}
		},
		computed: {
			// 循环选购好的商品
			Food () {
				let arr=[]
				// this指的是当前这个模板组件
				// console.log(this)
				this.datas.goods.forEach(goods => {
					goods.foods.forEach(foods => {
						if(foods.count>0) {
							arr.push(foods)
						}	
					})
				})
				return arr
			 },
			// 选购商品总金额
			totalPrice () {
				let totalprice=0
				this.Food.forEach(Food => {
					totalprice += Food.price*Food.count
				})
				return totalprice
			},
			// 选购商品总数
			totalCount () {
				let totalcount=0
				this.Food.forEach(Food => {
					totalcount += Food.count
				})
				return totalcount
			},
		 	// 如何配送
			payDesc () {
				if(this.totalPrice===0) {
					return `$${this.datas.seller.minPrice}起配送 `
				}else if(this.totalPrice<20) {
					return ` 还差${this.datas.seller.minPrice-this.totalPrice}元配送 `
				}else {
					return `去结算`
				}
			}
		},
		methods: {
			// 滚动事件
			scroll () {
				/* eslint-disable no-new */
				new Scroll(this.$refs['foodsWrapper'],{
					click: true
				})
				
				new Scroll(this.$refs['menuWrapper'],{
					click: true
				})
			},
			// 清空购物车
			empty () {
				this.Food.forEach(val => {
					val.count=0
				})
				this.show = false
			},
			// 购物车滚动函数
			showa () {
				this.show = !this.show
				this.$nextTick( () =>{// dom更新完成后滚动，第一次滚动this.sc为false，以后每次滚动都会重新计算购物车高度
					if(!this.sc) {
						this.sc = new Scroll(this.$refs['listcontent'],{
						click: true
					})
					} else {
					// 强制重新计算内容高度
						this.sc.refresh()
					}	
				})
			},
			// 点击商品显示详情
			showInfo (value) {
				// console.log(this.$refs)
				this.foodDetails = value
				this.$refs['foodDetail'].foodshow()
				// console.log(this.foodDetails)
			}
		},
		components: {
			cartcontrol,
			foodDetail
		}
	}
</script>