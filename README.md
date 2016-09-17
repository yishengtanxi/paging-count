# paging-count
简单的分页数据生成模块
## 接收参数
{  
//当前页(Number)，必填。  
currentPage : 10,  
//总页数(Number)，必填。  
pageCount : 20,  
//中间显示的页码数量(Number),默认:7。  
pageNum : 7,  
//显示前几页数量(Number)，默认：-1。（-1表示不显示最前面的页码，并且不显示'...'）  
startPageNum : 1,  
//显示后几页数量(Number)，默认：-1。（同上）  
endPageNum : 1,  
//页码链接的路径(String)，默认：‘？’。(如下页码1最终路径为'/lists?page=1'）  
path : 'lists?' ,   
//是否显示首页和尾页(Boolean)，默认：false。  
hasFirst : false  
}  
##生成数据  
{   
currentPage: 10,  
pageCount: 20,  
pageLists:   [  
     {num: 'Previous',path: 'lists?page=9',style: 'previous-page '},//如果当前页已是首页或尾页，则上一页下一页及首页尾页style属性会带有' disabled'。   
     { num: 1, path: 'lists?page=1', style: '' },  
     { num: '...', path: 'lists?page=3', style: 'left-gap' },  //点击...可一次跳转pageNum个页码  
     { num: 7, path: 'lists?page=7', style: '' },  
     { num: 8, path: 'lists?page=8', style: '' },  
     { num: 9, path: 'lists?page=9', style: '' },  
     { num: 10, path: 'lists?page=10', style: 'current' },  
     { num: 11, path: 'lists?page=11', style: '' },  
     { num: 12, path: 'lists?page=12', style: '' },  
     { num: 13, path: 'lists?page=13', style: '' },  
     { num: '...', path: 'lists?page=17', style: 'right-gap' }, //点击...可一次跳转pageNum个页码   
     { num: 20, path: 'lists?page=20', style: '' },  
     { num: 'Next', path: 'lists?page=11', style: 'next-page ' } 
   ]   
}  
##运行测试Demo  
修改testDemo文件夹中index.js中参数params。node运行index.js，浏览器中打开localhost:8080/lists点击页码查看结果是否符合预期。
