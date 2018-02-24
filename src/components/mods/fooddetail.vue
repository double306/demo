<template>
	<transition name="move">
		<div class="detailWrapper" v-show="showDetail" ref="detailWrapper">
		<div class="foodDetail" >
			<div class="back" @click="showDetail =!showDetail">
				<i class='icon-arrow_lift'></i>
			</div>
			<img :src="foodDetails.image"  height="425" width="100%" alt="">
			<div class="info">
				<div class="title">{{foodDetails.name}}</div>
				<div class="desc">
					<span>月售{{foodDetails.sellCount}}</span>
					<span>好评率{{foodDetails.rating}}%</span>
				</div>
				<div class="price">${{foodDetails.price}}</div>
				<transition name="fade">
					<div class="shopCart" @click="add()" v-show="foodDetails.count === undefined || foodDetails.count===0">
						<div class="text" >加入购物车</div>
					</div>
				</transition>
				<cartcontrol ref="cartcontrol" :food="foodDetails"></cartcontrol>
			</div>
			<div class="divider"></div>
			<div class="desc">	
				<div class="title">商品介绍</div>
				<div class="content">{{foodDetails.info}}</div>
			</div>
			<div class="divider"></div>
			<div class="evaluation">
				<div class="title">商品评价</div>
				<div class="classify">
					<span v-for="(item, index) in classify" class="item" @click="classifyClick(item)" :class="{'active': item.active, bad: index===2, badActive: index===2 && item.active}">{{item.name}}
					<span class="count">{{item.count}}</span>
					</span>
				</div>
				<div class="switch" @click="flag =! flag" >
					<span class="icon-check_circle" :class="{'on':flag}"></span>
					<span class="text">只看有内容的评价</span>
				</div>
				<div class="evel-list">
					<ul>
						<li class="evel" v-for="item in comment">
							<div class="userInfo">
								<div class="time">{{item.rateTime}}</div>
								<div class="user">
									<span >{{item.username}}</span>
									<img :src="item.avatar" width="12" height="12" alt="">
								</div>
							</div>
							<div class="content">
								<span class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
								<span class="text">{{item.text}}</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import cartcontrol from './cartcontrol.vue'
	import Scroll from 'better-scroll'
	export default {
		props: ['foodDetails'],
		data () {
			return {
				showDetail: false,
				classify: [
				  { name:'全部', count: 0, comment: [], active: true},
					{ name:'推荐', count: 0, comment: [], active: false},
					{ name:'吐槽', count: 0, comment: [], active: false} 
				],
				comments: [],
				flag: true
			}	
		},
		methods: {
			// 添加购物车
			add () {
				this.$refs['cartcontrol'].addCart()
			},
			// 详情滚动
			foodshow () {
				this.showDetail = true
				this.$nextTick ( () => {
					this.comments = this.foodDetails.ratings
					this.foodDetails.ratings.forEach(val => {
						this.classify[0].count++
						this.classify[0].comment.push(val)
						if(val.rateType) {
							this.classify[2].count++
							this.classify[2].comment.push(val)
						} else {
							this.classify[1].count++
							this.classify[1].comment.push(val)
						}
					})
				})
				this.$nextTick( () => {
					if(!this.cs) {
						this.cs = new Scroll(this.$refs['detailWrapper'], {
							click: true
						})
					} else {
						this.cs.refresh()
					}
				})
			},
			// 点击评论
			classifyClick (item) {
				this.comments = item.comment
				this.classify.forEach(val => {
					val.active = false
				})
				item.active = true
			},
			// 更新评论内容
			updatecs () {
				this.$nextTick( () => {
					this.cs.refresh() 
				})
			}
		},
		components: {
			cartcontrol
		},
		computed: {
			comment () {
				this.updatecs()
				let arr = []
				if(this.flag) {// 只看有内容的评价
					this.comments.forEach(val => {
					if(val.text.length > 0) {
						arr.push(val)
					}
					})
					return arr
				} else {// 看全部评价
					return this.comments
				}			
			}
		}
	}
</script>

