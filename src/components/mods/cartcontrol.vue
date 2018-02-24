<template>
	<div class="cartcontrol">
		<transition name="fadeRotate">
			<div class="cart-decrease" @click.stop="decreaseCart" v-show="food.count>0">
				<span class="icon-remove_circle_outline inner"></span>
			</div>			
		</transition>
		<div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
		<div class="cart-add" @click.stop="addCart($event)">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {mapMutations , mapState} from 'vuex'
	export default {
		props: ['food'],
		methods: {
			...mapMutations([
				'vxaddCart',
				'vxdecreaseCart'
				]),
			addCart () {
				// console.log(event)
				// ._constructed 是滚动插件里自带的一个属性 默认为 true ,如果是pc端，event下面没有这个属性，则会阻止掉pc端的默认点击事件
				// if(!event._constructed) {
				// 	return false
				// }
				if(!this.food.count){
					Vue.set(this.food, 'count', 0)
					Vue.set(this.food, 'active',true)
				}
				this.food.count++
				if(this.food.active) {
					this.vxaddCart(this.food)
					this.food.active=false
				}	
			},
			decreaseCart () {
				this.food.count--
				if(this.food.count === 0) {
					this.vxdecreaseCart(this.food)
				}
			}
		},
		computed: {
			...mapState([
				'vxfood'
				])
		}
	}
</script>
