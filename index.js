var user = new XMLHttpRequest(),	
	orgs = new XMLHttpRequest(),	
	repos = new XMLHttpRequest(),
	stars = new XMLHttpRequest(),
	fers = new XMLHttpRequest(),
	fersAll = new XMLHttpRequest(),
	fersAll = Array();
	JfersAll = Array();
	img = Mselect("#left-img"),
	rightList = Mselect(".right-list"),
	rightMain = Mselect(".right-main"),
	topInp = Mselect("#top-inp"),
	_mainShow = Mselect("#main"),
	_mainCover = Mselect("#m-cover");

// 用户api调取
MenterInput(topInp, function() {
	if (topInp.value == "") {
		alert("请输入想要查询的用户名");
	}
	else {
		// 初始化
		Mselect("#overview").innerHTML = "";
		Mselect("#repos").innerHTML = "";
		Mselect("#stars").innerHTML = "";
		Mselect("#org").innerHTML = "";


		_mainShow.style.opacity = 0;
		_mainShow.style.display = "none";
		_mainCover.style.opacity = 1;


		MAjaxGET(user, "https://api.github.com/users/" + topInp.value, function() {
			u = JSON.parse(user.responseText);
			// for (j in u) {
			// 	alert("xx");
			// 	if (u.j == null) {
			// 		alert("xxxx");
			// 		u.j = "To be filled~";
			// 	}
			// }
			document.title = u.login + "(" + u.name + ")";
			Mselect("#company").innerHTML = u.company;
			Mselect("#location").innerHTML = u.location;
			Mselect("#email").innerHTML = u.email;
			Mselect("#blog").innerHTML = u.blog;
			Mselect("#name").innerHTML = u.name;
			Mselect("#login").innerHTML = u.login;
			Mselect("#left-img").src = u.avatar_url;
			rightList[1].querySelector("span").innerHTML = u.public_repos;
			rightList[3].querySelector("span").innerHTML = u.followers;
			rightList[4].querySelector("span").innerHTML = u.following;
			// 二级调用
			AjaxTwo();
		}, function() {		//错误处理
			if (user.status == 404) {
				alert("Sorry,没有这个用户");
			}
			else {
				alert("出错了，请输入正确格式的账号！");
			}
		});
	}
});



function AjaxTwo() {
	//Org
	MAjaxGET(orgs, u.organizations_url, function() {
		Jorgs = JSON.parse(orgs.responseText);
		for (var i = Jorgs.length - 1; i >= 0; i--) {
			Mselect("#org").innerHTML += "<img></img>";
		}
		for (var i = Jorgs.length - 1; i >= 0; i--) {
			MselectAll("#org img")[i].src = Jorgs[i].avatar_url;
		}
	});

	// Repos
	MAjaxGET(repos, u.repos_url, function() {
		Jrepos = JSON.parse(repos.responseText);
		for (var i = Jrepos.length - 1; i >= 0; i--) {
			Mselect("#overview").innerHTML += "<div class=\"ov-repo\"><a class=\"repo-name\" href=\"#\"></a><div class=\"repo-cuntri\"></div><div class=\"repo-bo\"><div class=\"lang-c\"></div><div class=\"repo-lang\"></div><div class=\"lang-s\"></div><div class=\"repo-star\"></div></div>";
			Mselect("#repos").innerHTML += "<div class=\"rl-repo\"><a class=\"repo-name\" href=\"#\"></a><div class=\"repo-cuntri\"></div><div class=\"repo-bo\"><div class=\"lang-c\"></div><div class=\"repo-lang\"></div><div class=\"lang-s\"></div><div class=\"repo-star\"></div></div>";
		}
		for (var i = Jrepos.length - 1; i >= 0; i--) {
			MselectAll("#overview .repo-name")[i].innerHTML = Jrepos[i].name;
			MselectAll("#overview .repo-cuntri")[i].innerHTML = Jrepos[i].description;
			MselectAll("#overview .repo-lang")[i].innerHTML = Jrepos[i].language;
			MselectAll("#overview .repo-star")[i].innerHTML = Jrepos[i].stargazers_count;
			MselectAll("#repos .repo-name")[i].innerHTML = Jrepos[i].name;
			MselectAll("#repos .repo-cuntri")[i].innerHTML = Jrepos[i].description;
			MselectAll("#repos .repo-lang")[i].innerHTML = Jrepos[i].language;
			MselectAll("#repos .repo-star")[i].innerHTML = Jrepos[i].stargazers_count;
		}
		_mainCover.style.opacity = 0
		_mainShow.style.display = "block";
		setTimeout(function() {
			_mainCover.style.marginBottom = "-280px";
			_mainShow.style.opacity = 1;
		},500);
	});

	// Stars
	MAjaxGET(stars, u.url + "/starred", function() {
		Jstars = JSON.parse(stars.responseText);
		Mselect(".right-list")[2].querySelector("span").innerHTML = Jstars.length;
		for (var i = Jstars.length - 1; i >= 0; i--) {
			Mselect("#stars").innerHTML += "<div class=\"rl-repo\"><a class=\"repo-name\"></a><div class=\"repo-cuntri\"></div><div class=\"repo-bo\"><div class=\"lang-c\"></div><div class=\"star-lang\"></div><div class=\"lang-s\"></div><div class=\"star-st\"></div><div class=\"lang-t\"></div><div class=\"star-fork\"></div><div class=\"lang-m\"></div><div class=\"star-update\"></div></div></div>";
		}
		for (var i = Jstars.length - 1; i >= 0; i--) {
			MselectAll("#stars .repo-name")[i].innerHTML = Jstars[i].full_name;
			MselectAll("#stars .repo-cuntri")[i].innerHTML = Jstars[i].description;
			MselectAll("#stars .star-lang")[i].innerHTML = Jstars[i].language;
			MselectAll("#stars .star-st")[i].innerHTML = Jstars[i].stargazers_count;
			MselectAll("#stars .star-fork")[i].innerHTML = Jstars[i].forks;
			MselectAll("#stars .star-update")[i].innerHTML = Jstars[i].updated_at;
		}
	});

	// Followers
	MAjaxGET(fers, u.followers_url, function() {
		Jfers = JSON.parse(fers.responseText);
		// AjaxFers();
		// for (var i = Jfers.length - 1; i >= 0; i--) {
		// 	Mselect("#fers").innerHTML += "<div class=\"fo-main\"><img class=\"fo-img\"></img><div class=\"fo-top\"><a class=\"fo-name\"></a><div class=\"fo-login\"></div></div><div class=\"fo-countri\"></div><div class=\"fo-bo\"><div class=\"lang-c\"></div><div class=\"fo-group\"></div><div class=\"lang-t\"></div><div class=\"fo-add\"></div></div></div>";
		// }
		// for (var i = Jfers.length - 1; i >= 0; i--) {
		// 	MselectAll("#fers .fo-login")[i].innerHTML = Jfers[i].login;
		// }
	});
}




























// 三级Ajax－Followers
function AjaxFers() {
	for (var i = Jfers.length - 1; i >= 0; i--) {
		fersAll[i] = new XMLHttpRequest;
		JfersAll[i] = Object();
	}
	for (var i = Jfers.length - 1; i >= 0; i--) {
		Mselect("#fers").innerHTML += "<div class=\"fo-main\"><img class=\"fo-img\"></img><div class=\"fo-top\"><div class=\"fo-name\">fdasfsaf</div><div class=\"fo-login\"></div></div><div class=\"fo-countri\"></div><div class=\"fo-bo\"><div class=\"fo-group\"></div><div class=\"fo-add\"></div></div></div>"
	}
	Mindex(fersAll);
	Mindex(JfersAll);
	for (var i = fersAll.length - 1; i >= 0; i--) {
		var j = i;
		fersAll[j].open("GET", Jfers[j].url, true);
		fersAll[j].onreadystatechange = function() {
			if (fersAll[j].readyState == 4) {
				// alert(j);
			}
		}
		fersAll[j].send();
	}
	for (var i = fersAll.length - 1; i >= 0; i--) {
		var m = i;
		JfersAll[m] = JSON.parse(fersAll[m].responseText);
	}





	// if (fersAll[j].) {}
	// for (var i = fersAll.length - 1; i >= 0; i--) {
	// 	var j = fersAll[i].index;
	// 	JfersAll[j] = JSON.parse(fersAll[j].response);
	// }
	// for (var i = JfersAll.length - 1; i >= 0; i--) {
	// 	JfersAll[i] = JSON.parse(JfersAll[i].responseText);
	// }
	for (var i = JfersAll.length - 1; i >= 0; i--) {
		MselectAll("#fers .fo-name")[i] = JfersAll[i].name;
	}
}























// 右侧菜单
Mindex(rightList);
for (var i = rightList.length - 1; i >= 0; i--) {
	rightList[i].onclick = function() {
		for (var i = rightList.length - 1; i >= 0; i--) {
			rightList[i].className = "right-list";
			rightMain[i].className = "right-main";
		}
		this.className += " right-list-ACTIVE";
		rightMain[this.index].className += " right-main-ACTIVE";
	}
}




























