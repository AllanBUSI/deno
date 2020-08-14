var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

const register = async() => {
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
};

const login = async() => {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
};

const loginButton = async() => {
    // on desative envoi du formulaire
    document.querySelector("#login").addEventListener("click", (event) => {
        event.preventDefault();
    }, false);
    // une fois que le formulaire est envoyer
    $("#submitlogin").click(() => {
        //  on selectionne le input email et password
        var email = $("input[name=email]").val();
        var password = $("input[name=password]").val();
        // on parametre les requete ajax
        var settings = {
            "url": "https://mysterious-wildwood-50785.herokuapp.com/login",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            "data": {
                "email": email,
                "password": password
            },
            "success": (data) => {
                console.log(data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("email", email);
                sessionStorage.setItem("tokene", data.token);
                sessionStorage.setItem("emaile", email);
                redirectionHome();
            },
            "error": (data) => {
                $("div#error").append("<div class=\"alert alert-danger\" role=\"alert\">Tout n'est pas remplis correctement</div>");
                setTimeout(() => {
                    $("div.alert").remove();
                }, 5000);
            }
        };
        // on met notre parametre et on envoi a api
        $.ajax(settings).done((response) => {
            console.log(response);
        });
    });
};

const registerButton = async() => {
    // on desative envoi du formulaire
    document.querySelector("#register").addEventListener("click", (event) => {
        event.preventDefault();
    }, false);
    // une fois que le formulaire est envoyer
    $("#submitregister").click(() => {
        //  on selectionne le input email et password
        var nom = $("input[name=nom]").val();
        var prenom = $("input[name=prenom]").val();
        var email = $("input[name=email2]").val();
        var password = $("input[name=password2]").val();
        // on parametre les requete ajax
        var settings = {
            "url": "https://mysterious-wildwood-50785.herokuapp.com/register",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            "data": {
                "nom": nom,
                "prenom": prenom,
                "email": email,
                "password": password
            },
            "success": (data) => {
                console.log(data);
                $("div#success").append("<div class=\"alert alert-danger\" role=\"alert\">" + data.message + "</div>");
                setTimeout(() => {
                    document.location.reload();
                }, 3000);
            },
            "error": (data) => {
                $("div#error").append("<div class=\"alert alert-danger\" role=\"alert\">Nom, Prenom, Email invalid/password invalid</div>");
                setTimeout(() => {
                    $("div.alert").remove();
                }, 3000);
            }
        };
        // on met notre parametre et on envoi a api
        $.ajax(settings).done((response) => {
            console.log(response);
        });
    });
};

const forgot = async() => {
    // on desative envoi du formulaire
    document.querySelector("#forgot").addEventListener("click", (event) => {
        event.preventDefault();
    }, false);
    // une fois que le formulaire est envoyer
    $("#submit").click(() => {
        //  on selectionne le input email et password        
        var email = $("input[name=email]").val();
        // on parametre les requete ajax
        var settings = {
            "url": "https://mysterious-wildwood-50785.herokuapp.com/forgot",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            "data": {
                "email": email,
            },
            "success": (data) => {
                console.log(data);
                $("div#success").append("<div class=\"alert alert-danger\" role=\"alert\">" + data.message + "</div>");
                setTimeout(() => {
                    document.location.reload();
                }, 3000);
            },
            "error": (data) => {
                $("div#error").append("<div class=\"alert alert-danger\" role=\"alert\">Nom, Prenom, Email invalid/password invalid</div>");
                setTimeout(() => {
                    $("div.alert").remove();
                }, 3000);
            }
        };
        // on met notre parametre et on envoi a api
        $.ajax(settings).done((response) => {
            console.log(response);
        });
    });
};

const ville = () => {
    var settings = {
        "url": "https://mysterious-wildwood-50785.herokuapp.com/coul",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        "success": (data) => {
            let i = 0
            console.log(data.result.length)
            while (i <= data.result.length) {
                console.log(data.result[i]);
                let a = i + 1
                $("tbody#ville").append('<tr><th scope="row">' + a + '</th><td>' + data.result[i].ville_nom_simple + '</td><td>' + data.result[i].ville_code_postal + '</td><td>' + data.result[i].ville_latitude_deg + ' et ' + data.result[i].ville_longitude_deg + '</td></tr>');
                i++;
            }
        }
    };
    // on met notre parametre et on envoi a api
    $.ajax(settings).done();
}

const token = () => {
    setInterval(() => {
        if (localStorage.getItem("token") != sessionStorage.getItem("tokene"))
            document.location.href = "./../index.html";
    }, 1000);
};

const reset = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.location.href = "../index.html";
}

const redirectionHome = () => {
    document.location.href = "./pages/accueil.html";
};