<template>
	<div class="star" :class="'star-'+size">
		<span class="star-item" :class="item" v-for="item in starCom"></span>
	</div>
</template>
<script>
	export default{
		props: ['score','size'],
		computed: {
			starCom (){
				// 整数 ZS用来存取评分的整数部分
				let ZS = Math.floor(this.score),
				// 小数 XS用来存取评分的小数部分
					XS = (this.score - ZS)>=0.5 ,
					// 用来接收是否添加on,off,half
					arr = []
					for( var i=0; i<ZS; i++) {
						arr.push('on')
					}
					if(XS){
						arr.push('half')
					}
					while(arr.length<5){
						arr.push('off')
					}
					return arr
			}
		}
	}
</script>