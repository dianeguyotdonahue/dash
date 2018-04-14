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

color_picker = (type, color) => {
    if (type === 1) {
        document.getElementById('widget_color_1').style.backgroundColor = color.value;
    } else {
        document.getElementById('widget_color_2').style.backgroundColor = color.value;
    }
}

putPromo = (res) => {
    var content = document.getElementById('promo_form');
    content.promo_1.value = res.promo5_1;
    content.promo_2.value = res.promo5_2;
    content.promo_3.value = res.promo10_1;
    // content.promo_4.value = res.promo10_2;
    // content.promo_5.value = res.promo15_1;

}

getPromo = () => {
    getData('shop/promo', 'token=' + localStorage.getItem('token'), function (res) {
        if (res.success == 2)
            logout();
        else {
            if (res.success == 0)
                console.log('Pas encore de codes promos ajouté 🐢');
            else
                putPromo(res);
        }
    })
}

copyScript = () => {
    var copy_button = document.getElementById('copy_script');
    copy_button.addEventListener('click', function () {
        var text = document.getElementById('script_text');
        text.select();
        document.execCommand("Copy");
        copy_button.style.width = "167px";
        if (window.location.href === "https://client.monneasy.com/fr" || window.location.href === "https://client.monneasy.com/fr/")
            copy_button.innerHTML = "SCRIPT COPIÉ";
        else
            copy_button.innerHTML = "SCRIPT COPIED";
    })
}

getScriptArea = () => {
    var key = localStorage.getItem('key')
    var text = document.getElementById('script_text')
    text.innerHTML = "<script type=\"text/javascript\">window.MONNEASY_WEBSITE_ID=" + "\"" + key + "\"" + ";(function(){d=document;s=d.createElement(\"script\");s.src=\"https://src.monneasy.com/monneasy.js\";s.async=1;d.getElementsByTagName(\"body\")[0].appendChild(s)})();</script>";
}

postPromo = (content) => {
    var color_1 = document.getElementById('color_picker_1').value;
    var color_2 = document.getElementById('color_picker_2').value;
    var promo_1 = content.promo_1.value;
    var promo_2 = content.promo_2.value;
    var promo_3 = content.promo_3.value;
    var promo_4 = '';
    var promo_5 = '';
    postData('shop/promo', 'token=' + localStorage.getItem('token') + '&promo_1=' + promo_1 + '&promo_2=' + promo_2 + '&promo_3=' + promo_3 + '&promo_4=' + promo_4 + '&promo_5=' + promo_5, function (res) {
        document.getElementById('installation').scrollIntoView();
    })
    if (window.location.href === "https://client.monneasy.com/fr" || window.location.href === "https://client.monneasy.com/fr/") {
        postData('shop/custom', 'token=' + localStorage.getItem('token') + '&color_1=' + color_1 + '&color_2=' + color_2 + '&lang=fr', function (res) {
            var ok = 1;
        })
    } else {
        postData('shop/custom', 'token=' + localStorage.getItem('token') + '&color_1=' + color_1 + '&color_2=' + color_2 + '&lang=en', function (res) {
            var ok = 1;
        })
    }
}

getKpi = () => {
    getData('shop/users', 'token=' + localStorage.getItem('token'), function (res) {
        document.getElementById('membre_nbr').innerHTML = res.membres_nbr;
        document.getElementById('filleuil_nbr').innerHTML = res.filleuil_nbr;
        document.getElementById('parrain_nbr').innerHTML = res.parrain_nbr;
    })
}

getCustom = () => {
    getData('shop/custom', 'key=' + localStorage.getItem('key'), function (res) {
        if (res.success !== 0) {
            document.getElementById('color_picker_1').value = res.color_1;
            document.getElementById('color_picker_2').value = res.color_2;
            document.getElementById('widget_color_1').style.backgroundColor = res.color_1;
            document.getElementById('widget_color_2').style.backgroundColor = res.color_2;
        }
    })
}

init = () => {
    getKpi()
    getPromo()
    getCustom()
    getScriptArea()
    copyScript()
}

window.onload = init()