// Mibary ---- Coder Ming的个人小库    My blog: www.coderming.com


// 元素选择器
function Mselect(a) {
	return document.querySelectorAll(a).length == 1 ? document.querySelector(a) : document.querySelectorAll(a);
}


// 固定返回数组的选择器 
function MselectAll(a) {
	return document.querySelectorAll(a);
}


// Ajax
function MAjax(a, b, c) {
	a.onreadystatechange = function() {
		if (a.readyState == 4) {
			if (a.status == 200 || a.status == 304) {
				b();
			}
			else c();
		}
	}
}


// 高度封装版Ajax-Get
function MAjaxGETSearch(a, b, c, d) {
	a.open("GET", b, true);
	a.onreadystatechange = function() {
		if (a.readyState == 4) {
			if (a.status == 200 || a.status == 304) {
				c();
			}
			else {
				d();
			}
		}
	}
	a.send();
	return true;
}

// 不查错
function MAjaxGET(a, b, c) {
	a.open("GET", b, true);
	a.onreadystatechange = function() {
		if (a.readyState == 4) {
			if (a.status == 200 || a.status == 304) {
				c();
			}
		}
	}
	a.send();
	return true;
}


// 高度封装版Ajax－POST
function MAjaxPOST(a, b, c) {
	a.open("POST", b, true);
	a.onreadystatechange = function() {
		if (a.readyState == 4 && (a.status == 200 || a.status == 304)) {
			c();
		}
	}
	a.send(d);
}


// 给数组赋index的值
function Mindex(a) {
	for (var i = a.length - 1; i >= 0; i--) {
		a[i].index = i;
	}
}


// input框回车触发事件
function MenterInput(a, b) {
	a.onkeyup = function() {
		if (event.keyCode == 13) {
			b();
		}
	}
}








