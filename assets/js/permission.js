if (!localStorage.getItem('token') || !localStorage.getItem('key')) {
    if (window.location.href === "https://client.monneasy.com/fr" || window.location.href === "https://client.monneasy.com/fr/")
        window.location.href = "https://client.monneasy.com/fr/login.html"
    else
        window.location.href = "https://client.monneasy.com/login.html"
}

logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('key')
    if (window.location.href === "https://client.monneasy.com/fr" || window.location.href === "https://client.monneasy.com/fr/")
        window.location.href = "https://client.monneasy.com/fr/login.html"
    else
        window.location.href = "https://client.monneasy.com/login.html"
}