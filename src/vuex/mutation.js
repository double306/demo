export default {
	// 默认接收的第一个参数是vuex传过来的数据
	vxaddCart (state, val) {
		state.vxfood.push(val,1)
	},
	vxdecreaseCart (state, food){
		state.vxfood.forEach((value, index) =>{
			if(value.name === food.name) {
				state.vxfood.splice(index,1)	
			}
		})
	}
}