"use strict"
function store() {
    var name = document.getElementById("name").value;
    var pw = document.getElementById("pw").value;
    localStorage.name=name;
    localStorage.pw=pw;
}

function check() {

    var storedName = localStorage.getItem("name");
    var storedPw = localStorage.getItem("pw");

    var userName = document.getElementById("userName");
    var userPw = document.getElementById("userPw");

    if(userName.value == storedName && userPw.value == storedPw) {
        alert("Login succesful");
    }else {
        alert("Login failed");
    }
}