var user = new XMLHttpRequest(),	
	orgs = new XMLHttpRequest(),	
	repos = new XMLHttpRequest(),
	stars = new XMLHttpRequest(),
	fers = new XMLHttpRequest(),
	fersAll = new XMLHttpRequest(),
	Jfers;
	fersAll = Array();
	JfersAll = Array();	
	fing = new XMLHttpRequest(),
	fingAll = new XMLHttpRequest(),
	fingAll = Array();
	JfingAll = Array();
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
		Mselect("#left-ul").innerHTML = "";
		Mselect("#fers").innerHTML = "";
		Mselect("#fing").innerHTML = "";


		_mainShow.style.opacity = 0;
		_mainShow.style.display = "none";
		_mainCover.style.opacity = 1;
		_mainCover.style.zIndex = 10;


		MAjaxGETSearch(user, "https://api.github.com/users/" + topInp.value, function() {
			u = JSON.parse(user.responseText);
			// for (j in u) {
			// 	if (!j) {
			// 		function x(a) {
			// 			alert("xxxx");
			// 			a = "To be filled~";
			// 		}
			// 		x(j);
			// 	}
			// }
			document.title = u.login + "(" + u.name + ")";
			if (u.company) {Mselect("#left-ul").innerHTML += "<li><div class=\"lang-t\"></div>" + u.company + "</li>"};
			if (u.location) {Mselect("#left-ul").innerHTML += "<li><div class=\"lang-s\"></div>" + u.location + "</li>"};
			if (u.email) {Mselect("#left-ul").innerHTML += "<li><div class=\"lang-m\"></div>" + u.email + "</li>"}; 
			if (u.blog) {Mselect("#left-ul").innerHTML += "<li><div class=\"lang-u\"></div>" + u.blog + "</li>"};
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
			_mainCover.style.opacity = 0
			_mainShow.style.display = "block";
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
			setTimeout(function(){
				_mainCover.style.zIndex = -1;
			},500);
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
		AjaxFers();
	});

	// Following
	MAjaxGET(fing, u.url + "/following", function() {
		Jfing = JSON.parse(fing.responseText);
		AjaxFing();
	});
}





function AjaxFers() {
	for (var i = Jfers.length - 1; i >= 0; i--) {
		fersAll[i] = new XMLHttpRequest;
		JfersAll[i] = Object();
	}
	for (var i = Jfers.length - 1; i >= 0; i--) {
		Mselect("#fers").innerHTML += "<div class=\"fo-main\"><div class=\"fo-mcover\"><img class=\"fo-img\"></img></div><div class=\"fo-top\"><div class=\"fo-name\">fdasfsaf</div><div class=\"fo-login\"></div></div><div class=\"fo-countri\"></div><div class=\"fo-bo\"><div class=\"lang-c\"></div><div class=\"fo-group\"></div><div class=\"lang-t\"></div><div class=\"fo-add\"></div></div></div>"
	}
	Mindex(Jfers);
	for (var i = Jfers.length - 1; i >= 0; i--) {
		Jfers[i].getUrl = function(a) {
			MAjaxGET(fersAll[a], this.url, function() {
				JfersAll[a] = JSON.parse(fersAll[a].responseText);
				MselectAll(".fo-img")[a].src =  JfersAll[a].avatar_url;
				MselectAll(".fo-name")[a].innerHTML = JfersAll[a].name;	
				MselectAll(".fo-login")[a].innerHTML = JfersAll[a].login;
				MselectAll(".fo-countri")[a].innerHTML = JfersAll[a].bio;
				MselectAll(".fo-group")[a].innerHTML = JfersAll[a].company;
				MselectAll(".fo-add")[a].innerHTML = JfersAll[a].location;
				MselectAll(".fo-name")[a].href = JfersAll[a].html_url;
			})
		}
	}
	for (var i = Jfers.length - 1; i >= 0; i--) {
		Jfers[i].getUrl(i);
	}
}


function AjaxFing() {
	for (var i = Jfing.length - 1; i >= 0; i--) {
		fingAll[i] = new XMLHttpRequest;
		JfingAll[i] = Object();
	}
	for (var i = Jfing.length - 1; i >= 0; i--) {
		Mselect("#fing").innerHTML += "<div class=\"fo-main\"><div class=\"fo-mcover\"><img class=\"fo-img\"></img></div><div class=\"fo-top\"><a class=\"fo-name\">fdasfsaf</a><div class=\"fo-login\"></div></div><div class=\"fo-countri\"></div><div class=\"fo-bo\"><div class=\"lang-c\"></div><div class=\"fo-group\"></div><div class=\"lang-t\"></div><div class=\"fo-add\"></div></div></div>"
	}
	Mindex(Jfing);
	for (var i = Jfing.length - 1; i >= 0; i--) {
		Jfing[i].getUrl = function(a) {
			MAjaxGET(fingAll[a], this.url, function() {
				JfingAll[a] = JSON.parse(fingAll[a].responseText);
				MselectAll("#fing .fo-img")[a].src =  JfingAll[a].avatar_url;
				MselectAll("#fing .fo-name")[a].innerHTML = JfingAll[a].name;	
				MselectAll("#fing .fo-login")[a].innerHTML = JfingAll[a].login;
				MselectAll("#fing .fo-countri")[a].innerHTML = JfingAll[a].bio;
				MselectAll("#fing .fo-group")[a].innerHTML = JfingAll[a].company;
				MselectAll("#fing .fo-add")[a].innerHTML = JfingAll[a].location;
				MselectAll("#fing .fo-name")[a].href = JfingAll[a].html_url;
			})
		}
	}
	for (var i = Jfing.length - 1; i >= 0; i--) {
		Jfing[i].getUrl(i);
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




























