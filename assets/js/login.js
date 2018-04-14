printError = (message) => {
    var error = document.getElementById('error');
    error.innerHTML = "";
    error.innerHTML = message;
}

setToken = (res) => {
    localStorage.setItem('token', res.token)
    localStorage.setItem('key', res.key)
    if (window.location.href === "https://client.monneasy.com/login.html")
        window.location.href = "https://client.monneasy.com/";
    else
        window.location.href = "https://client.monneasy.com/fr"
}

getData = (url, argv, callback) => {
    var xhr = new XMLHttpRequest()
    var url = 'https://api.monneasy.com/' + url;
    xhr.open("GET", url + '?' + argv, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    }
    xhr.send(null);
}


callApi = (password, mail) => {
    getData('shop/login', 'mail='+mail+'&password='+password, function(res) {
        if (res.success == false)
            printError(res.message);
        else
            setToken(res)
            
    });
}

submitLogin = (content) => {
    var password = content.password.value
    var mail = content.mail.value
    callApi(password, mail)
}