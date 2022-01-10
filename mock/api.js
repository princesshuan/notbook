const Mock = require('mockjs')
const Random = Mock.Random

function getAdverts() {
	var res = Mock.mock({
			status: 200,
			message: '获取广告列表成功',
			'data|3': [{ // 5-10随机生成5~10个数据
				'id|+1': 1,
				'image': "https://picsum.photos/400/200",
				"link": 'https://www.baidu.com',
			}]
		})
	    // 输出结果
	    // console.log(JSON.stringify(res))
	    // fn(res);
		return res
}
function getFeeds() {
	var res = Mock.mock({
		status: 200,
		message: '获取动态列表成功',
		'data|10-15': [{ // 5-10随机生成5~10个数据
			'id|+1': 1,
			name: '@cword(2,3)', // 生成中文汉字，word生成英文汉字
			'cover|1': ['https://picsum.photos/180/150',"https://picsum.photos/250/250"],
			// cover:'@image()',
			feed_content: '@ctitle(5,10)',
			avatar: "https://picsum.photos/200/200",
			name: '@cname(2,4)',
			'has_like|1': [false, true],
			feed_comment_count:'@integer(0,2000)',
			like_count: '@integer(0,2000)'
		}]
	})
	return res
}
function getNews() {
	var res = Mock.mock({
		status: 200,
		message: '获取资讯列表成功',
		'data|10-15': [{ // 5-10随机生成5~10个数据
			'id|+1': 1,
			title: '@ctitle(10,20)',
			author: '@cname(2,4)',
			created_at: '@datetime()',
			cover: "https://picsum.photos/200/100"
		}]
	})
	return res
}
function getImage() {
	var res = Mock.mock({
		status: 200,
		message: '获取图片列表成功',
		'data|20-35': [{ // 5-10随机生成5~10个数据
			'id|+1': 1,
			name: '@cword(2,3)',
			'cover|1': ['https://picsum.photos/180/150',"https://picsum.photos/250/250","https://picsum.photos/200/100"]
		}]
	})
	return res
}

function feedInfo(name) {
	var res = Mock.mock({
		status: 200,
		message: '获取动态详情成功',
		'data': { 
			id: 1,
			name: name,
			avatar: "https://picsum.photos/200/100",
			feed_content: '@ctitle(10,20)',
			images: ['https://picsum.photos/180/150',"https://picsum.photos/250/250","https://picsum.photos/200/100"],
			created_at: '@datetime()',
			feed_view_count: '@integer(0,200)',
		    feed_comment_count:'@integer(0,20)',
			'has_like|1': [false, true],
			like_count: '@integer(0,200)'
		}
	})
	return res
}

function newInfo(name) {
	var res = Mock.mock({
		status: 200,
		message: '获取资讯详情成功',
		'data': { 
			id: 1,
			cover: "https://picsum.photos/200/100",
			title: '@ctitle(10,20)',
			author: name,
			created_at: '@datetime()',
			views_count: '@integer(0,200)',
			content: '@cparagraph(300,400)',
			digg_count:'@integer(0,20)',
			comment_count:'@integer(0,20)',
			'has_like|1': [false, true],
			
		}
	})
	return res
}

function getFeedComments(){
	var res = Mock.mock({
		status: 200,
		message: '获取动态评论成功',
		'data|5-10': [{ 
			'id|+1': 1,
			body: '@ctitle(10,20)',
			user: {
				avatar: {
					url: "https://picsum.photos/200/100"
				},
				name: '@cname(2,3)',
			},
			created_at: '@datetime()'
		}]
	})
	return res
}
function getNewComments(){
	var res = Mock.mock({
		status: 200,
		message: '获取动态评论成功',
		'data|5-10': [{
			'id|+1': 1,
			body: '@ctitle(10,20)',
			user: {
				avatar: {
					url: 'https://picsum.photos/200/100'
				},
				name: '@cname(2,3)',
			},
			created_at: '@datetime()'
		}]
	})
	return res
}

function getUserMsg(){
	var res = Mock.mock({
		status: 200,
		message: '获取动态评论成功',
		'data|5-10': {
			user: {
				liked:'',
				commented:'',
				name: '@cname(2,3)',
			},
			created_at: '@datetime()'
		}
	})
	return res
}

module.exports = {
    getAdverts: getAdverts,
	getFeeds:getFeeds,
	getNews:getNews,
	getImage:getImage,
	feedInfo:feedInfo,
	newInfo:newInfo,
	getFeedComments :getFeedComments ,
	getNewComments:getNewComments,
	getUserMsg :getUserMsg 
}
