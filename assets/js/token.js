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

if (localStorage.getItem('token') && localStorage.getItem('key')) {
    getData('shop/account', 'token='+localStorage.getItem('token'), function(res) {
        if (res == false) {
            localStorage.removeItem('token');
            localStorage.removeItem('key');
            if (window.location.href === "https://client.monneasy.com/fr" || window.location.href === "https://client.monneasy.com/fr/")
                window.location.href = "https://client.monneasy.com/fr/login.html"
            else
                window.location.href = "https://client.monneasy.com/login.html"
        } else {
            if (window.location.pathname === "/fr/login.html" || window.location.pathname === "/fr/register.html")
                window.location.href = "https://client.monneasy.com/fr/";
            else
                window.location.href = "https://client.monneasy.com"
        }
    })   
}
else {
    localStorage.removeItem('token');
    localStorage.removeItem('key');
}