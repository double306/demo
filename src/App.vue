<template>
	<div id="app">
		<vHeader :seller="datas.seller"></vHeader>
		<div class="tab">
			<div class="tab-item">
				<router-link to="/goods">商品</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/ratings">评论</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/seller">商家</router-link>
			</div>
		</div>
	<!-- 	把加载过的组件缓存起来 -->
		<!-- <keep-active> -->
			<router-view :datas="datas" ref="abc"></router-view>
	<!-- 	</keep-active> -->
	</div>
</template>
<script>
import vHeader from './components/mods/header.vue'
import axios from 'axios'
export default {
	data () {
		return {
			datas: {
				// 商户信息
				seller: {},
				// 商品信息
				goods: [],
				// 评论
				ratings: []
			}
		}
	},
	mounted () {
		axios.get('/static/data.json').then(res =>{
    	this.datas.seller = res.data.seller
			this.datas.goods = res.data.goods
    	this.datas.ratings = res.data.ratings
   		//console.log(this.$refs.abc)
    	// dom更新完之后执行，相当于window.onload
    	this.$nextTick(() => {
    		//console.log(this.$refs.abc)
				this.$refs.abc.scroll()	
			})
		})
	},
  components: {
    vHeader
  }
}
</script>

<style>
	.tab .tab-item a.router-link-active {
		color: red;
	}
</style>
