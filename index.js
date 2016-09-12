module.exports = function(options) {
    var options = handleParams(options);
    var currentPage = options.currentPage,
        pageCount = options.pageCount,
        pageNum = options.pageNum,
        startPageNum = options.startPageNum,
        endPageNum = options.endPageNum,
        path = options.path,
        hasFirst = options.hasFirst;
    var page = {
        currentPage: currentPage,
        pageCount: pageCount,
        pageLists: []
    };
    var startNum = startPageNum == -1 ? 0 : startPageNum + 2,
        endNum = endPageNum == -1 ? 0 : endPageNum + 2;
    var pNum = startNum + pageNum + endNum;
    if (pageNum >= pageCount && pageCount >= currentPage) {
        for (var i = 1; i < pageCount + 1; i++) {
            page.pageLists.push({
                num: i,
                path: path + 'page=' + i,
                style: i == currentPage ? 'current' : ''
            });
        }
    } else if (pageNum < pageCount) {
        if (currentPage - Math.floor(pageNum / 2) - startNum < 1) {
            for (var i = 1,j = currentPage + Math.ceil(pageNum / 2) > (pageCount + 1) ? (pageCount + 1) : (currentPage + Math.ceil(pageNum / 2)); i < ((j > pageNum+1) ? j : pageNum + 1); i++) {
                page.pageLists.push({
                    num: i,
                    path: path + 'page=' + i,
                    style: i == currentPage ? 'current' : ''
                });
            }
        } else if ((pageCount - currentPage + 1) < (Math.ceil(pageNum / 2) + endNum)) {
            for (var i = (pageCount- (currentPage - Math.floor(pageNum / 2)) >= (pageNum-1) ? currentPage - Math.floor(pageNum / 2) : (pageCount - pageNum + 1)); i < pageCount + 1; i++) {
                page.pageLists.push({
                    num: i,
                    path: path + 'page=' + i,
                    style: i == currentPage ? 'current' : ''
                });
            }
        } else {
            for (var i = (currentPage - Math.floor(pageNum / 2)); i < (currentPage + Math.ceil(pageNum / 2)); i++) {
                page.pageLists.push({
                    num: i,
                    path: path + 'page=' + i,
                    style: i == currentPage ? 'current' : ''
                });
            }
        }
    }
    if (startPageNum != -1 && page.pageLists[0].num > 1) {
        if (page.pageLists[0].num <= startPageNum + 2) {
            for (var i = page.pageLists[0].num - 1; i > 0; i--) {
                page.pageLists.unshift({
                    num: i,
                    path: path + 'page=' + i,
                    style: i == currentPage ? 'current' : ''
                })
            }
        } else {
            var jumpNum = currentPage - pageNum > 0 ? currentPage - pageNum : 2;
            page.pageLists.unshift({
                num: '...',
                path: path + 'page=' + jumpNum,
                style: 'left-gap'
            });
            for (var i = startPageNum; i > 0; i--) {
                page.pageLists.unshift({
                    num: i,
                    path: path + 'page=' + i,
                    style: ''
                });
            }
        }
    }
    if (endPageNum != -1 && page.pageLists[page.pageLists.length - 1].num < pageCount) {
        if (pageCount - page.pageLists[page.pageLists.length - 1].num < endPageNum + 2) {
            for (var i = page.pageLists[page.pageLists.length - 1].num + 1; i < pageCount + 1; i++) {
                page.pageLists.push({
                    num: i,
                    path: path + 'page=' + i,
                    style: ''
                })
            }
        } else {
            var jumpNum = currentPage + pageNum >= pageCount ? pageCount - 1 : currentPage + pageNum;
            page.pageLists.push({
                num: '...',
                path: path + 'page=' + jumpNum,
                style: 'right-gap'
            });
            for (var i = pageCount - endPageNum + 1; i < pageCount + 1; i++) {
                page.pageLists.push({
                    num: i,
                    path: path + 'page=' + i,
                    style: ''
                });
            }
        }
    }
    page.pageLists.unshift({
        num: 'Previous',
        path: path + 'page=' + (currentPage - 1),
        style: 'previous-page ' + (currentPage == 1 ? 'disabled' : '')
    });
    page.pageLists.push({
        num: 'Next',
        path: path + 'page=' + (currentPage + 1),
        style: 'next-page ' + (currentPage == pageCount ? 'disabled' : '')
    });
    if (hasFirst) {
        page.pageLists.unshift({
            num: 'First',
            path: path + 'page=1',
            style: 'first-page ' + (currentPage == 1 ? 'disabled' : '')
        });
        page.pageLists.push({
            num: 'Last',
            path: path + 'page=' + pageCount,
            style: 'last-page ' + (currentPage == pageCount ? 'disabled' : '')
        });
    }
    return page;
}
function handleParams(params) {
    if (params && params.currentPage && params.pageCount) {
        var options = {};
        options.currentPage = parseInt(params.currentPage);
        options.pageCount = parseInt(params.pageCount);
        options.pageNum = parseInt(params.pageNum || 7);
        options.startPageNum = parseInt(params.startPageNum == undefined ? -1 : params.startPageNum);
        options.endPageNum = parseInt(params.endPageNum == undefined ? -1 : params.endPageNum);
        options.path = params.path == undefined ? '?' : params.path;
        options.hasFirst = Boolean(params.hasFirst);
        return options;
    } else {
        console.error('params error!');
    }
};