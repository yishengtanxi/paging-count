var express=require('express');
var paging=require('../index.js');
var app=express();
app.set('views','./views');
app.set('view engine','ejs');
var params = {
    currentPage:10,
    pageCount: 20,
    pageNum: 8,
    startPageNum:1,
    endPageNum:1,
    hasFirst:true
};
app.get('/',function(req,res){
    params.currentPage = req.query.page || 1;
    console.log(params);
    var data=paging(params);
    console.log(data);
    res.render('index',data);
    res.end();
})
var server=app.listen(8080,'localhost',function(){
	console.log('Example app listening at http://localhost:8080');
})