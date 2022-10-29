/*
 * @Author: 肖俊男
 * @Date: 2022-03-15 22:38:18
 * @LastEditTime: 2022-10-04 21:40:17
 * @LastEditors: 肖俊男
 * @Description: 
 * @FilePath: \exams\vue.config.js
 * 鲸落
 */
module.exports = {
	lintOnSave: false,
	configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'components': '@/components',
				'views': '@/views'
			}
		}
	},
	devServer:{
		proxy:{
			'/api':{
				target:'http://vip.jzab.xyz:8000/api',
				changeOrigin:true,
				pathRewrite:{
					'^/api':''
				}
			}
		}
	}
}