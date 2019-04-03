/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */
var express = require('express')
var student = require('./student')
var fs = require('fs')
// 1. 创建一个路由容器
var router = express.Router()
// 2. 把路由都挂载到 router 路由容器中
// 功能一
/*
 * 渲染学生列表页面
 */
router.get('/',function (req,res) {
	student.find(function (err,students) {
		if(err) {
			return res.status(500).send('server error')
		}
		res.render('index.html',{
			fruits:[
			'苹果',
        	'香蕉',
        	'橘子'
			],
			students:students
		})
	})
})
// 功能二
 /*
 * 渲染添加学生页面
 */
router.get('/new',function(req,res){
	res.render('new.html')
})
// 功能三
/*
 * 处理添加学生
 */
router.post('/new', function (req, res){
  // 1. 获取表单数据
  // 2. 处理
  //    将数据保存到 db.json 文件中用以持久化
  // 3. 发送响应
  // 首先封装数据存储函数
  student.save(req.body, function(err) {
  	if (err) {
  		return res.status(500).send('server error')
  	}
  	res.redirect('/')
  })
})
/*
 * 渲染编辑学生页面
 */
router.get('/edit', function (req, res) {
	student.findById(req.query.id, function(err, student){
		if (err) {
  			return res.status(500).send('server error')
  		}
  		res.render('edit.html', {
  			student:student
  		})
	})
})
router.post('/edit', function (req, res) {
	student.updateById(req.body, function(err, data) {
		if (err) {
  			return res.status(500).send('server error')
  		}
  		res.redirect('/')
	})
})
/*
 * 处理删除学生
 */
router.get('/delete', function (req, res) {
	  // 1. 获取要删除的 id
  // 2. 根据 id 执行删除操作
  // 3. 根据操作结果发送响应数据
	student.deleteById(req.query.id, function(err) {
		if (err) {
  			return res.status(500).send('server error')
  		}
  		res.redirect('/')
	})
})
module.exports = router