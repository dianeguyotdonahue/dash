printError = () => {
    var error = document.getElementById('error');
    error.innerHTML = "";
    error.innerHTML = "Ce compte existe déjà, veuillez vous connecter.";
}

setToken = (res) => {
    localStorage.setItem('token', res.token);
    localStorage.setItem('key', res.key);
    if (window.location.href === "https://client.monneasy.com/register.html")
        window.location.href = "https://client.monneasy.com/";
    else
        window.location.href = "https://client.monneasy.com/fr"
}

postData = (url, argv, callback) => {
    var xhr = new XMLHttpRequest();
    var url = 'https://api.monneasy.com/' + url;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    }
    xhr.send(argv);
}

callApi = (url, mail, password, shop) => {
    postData('shop/account', 'url='+url+'&mail='+mail+'&password='+password+'&shop='+shop, function(res) {
        if (res.success === false)
            printError();
        else
            setToken(res);
    });
}

submitRegister = (content) => {
    var url = content.url.value
    var mail = content.mail.value
    var password = content.password.value
    var shop = content.shop.value;
    callApi(url, mail, password, shop)
}