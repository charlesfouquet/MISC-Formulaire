document.querySelectorAll(".fieldBox").forEach(element => {
    element.onkeyup = formCheck;
});

document.getElementById("message").onkeyup = messageCheck;

function formCheck(event) {
    event.preventDefault()

    // Récupération des IDs des champs du formulaire
    let indexAttributes = 0;
    var attributes = [];
    document.querySelectorAll(".fieldBox").forEach(element => {
        attributes[indexAttributes] = element.getAttribute("id");
        indexAttributes++
    })

    // Récupération des labels des champs du formulaire sans l'étoile et les deux points
    let indexAttributesFR = 0;
    var attributesFR = [];
    var regExAttributesFR = /[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒa-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ0-9\s]+/;
    // ou var regExAttributesFR = /^[^*]+/
    document.querySelectorAll(".attributeFRName").forEach(element => {
        attributesFR[indexAttributesFR] = element.innerHTML.match(regExAttributesFR)[0];
        indexAttributesFR++
    })

    // Récupération du contenu des champs du formulaire
    let indexContent = 0;
    var contents = [];
    document.querySelectorAll(".fieldBox").forEach(element => {
        contents[indexContent] = element.value;
        indexContent++
    })
    
    // Effacement des erreurs précédentes
    var previousErrorsCommentaries = document.querySelectorAll(".incorrectCommentary");
    previousErrorsCommentaries.forEach(element => {
        element.remove();
    });
    var previousValidCommentaries = document.querySelectorAll(".correctCommentary");
    previousValidCommentaries.forEach(element => {
        element.remove();
    });
    var previousIntroCommentaries = document.querySelectorAll("#passIntro");
    previousIntroCommentaries.forEach(element => {
        element.remove();
    });
    var previousErrorsBoxes = document.querySelectorAll(".fieldBox");
    previousErrorsBoxes.forEach(element => {
        element.classList.remove("incorrectInput");
    });
    var previousValidBoxes = document.querySelectorAll(".fieldBox");
    previousValidBoxes.forEach(element => {
        element.classList.remove("correctInput");
    });

    // Définition des RegEx utiles pour le contrôle de saisie
    var regExEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)\.(\w{2,3})$/;
    var regExPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
    var regExPassMin = /[a-z]/;
    var regExPassMaj = /[A-Z]/;
    var regExPassSpec = /[@$!%*#?&]/;
    var regExPassNum = /\d/;
    var regExLength = /^[a-zA-Z0-9!@#$%^&\s]{5,15}$/;
    var regExTel = /^\d{10}$/;

    // Contrôle de saisie champ par champ
    let indexIncorrect = 0;
    contents.forEach(element => {
        if ((element != "") && (attributes[indexIncorrect] == "email")) {
            if (regExEmail.test(element) == false) {
                document.querySelectorAll(".fieldBox")[indexIncorrect].classList.add("incorrectInput");
                document.querySelectorAll(".fieldBox")[indexIncorrect].insertAdjacentHTML("afterend", "<em class=\"incorrectCommentary\">Votre "+attributesFR[indexIncorrect].toLowerCase()+" n'a pas le format attendu</br>(par exemple : local@domain.com)</em>");
            } else if (regExEmail.test(element) == true) {
                document.querySelectorAll(".fieldBox")[indexIncorrect].classList.add("correctInput");
                document.querySelectorAll(".fieldBox")[indexIncorrect].insertAdjacentHTML("afterend", "<em class=\"correctCommentary\">Votre "+attributesFR[indexIncorrect].toLowerCase()+" est valide</em>");
            }
        } else if ((element != "") && (attributes[indexIncorrect] == "phone")) {
            if (regExTel.test(element) == false) {
                document.querySelectorAll(".fieldBox")[indexIncorrect].classList.add("incorrectInput");
                document.querySelectorAll(".fieldBox")[indexIncorrect].insertAdjacentHTML("afterend", "<em class=\"incorrectCommentary\">Votre "+attributesFR[indexIncorrect].toLowerCase()+" n'a pas le format attendu</br>(par exemple : 0612345678)</em>");
            } else if (regExTel.test(element) == true) {
                document.querySelectorAll(".fieldBox")[indexIncorrect].classList.add("correctInput");
                document.querySelectorAll(".fieldBox")[indexIncorrect].insertAdjacentHTML("afterend", "<em class=\"correctCommentary\">Votre "+attributesFR[indexIncorrect].toLowerCase()+" est valide</em>");
            }
        } else if ((element != "") && (attributes[indexIncorrect] == "password")) {
            if (regExPass.test(element) == false) {
                document.querySelectorAll(".fieldBox")[indexIncorrect].classList.add("incorrectInput");
                document.querySelectorAll(".fieldBox")[indexIncorrect].insertAdjacentHTML("afterend", "<p id=\"passIntro\">Votre "+attributesFR[indexIncorrect].toLowerCase()+" doit avoir le format suivant :</p><p id=\"passLength\" class=\"incorrectCommentary\">8 à 15 caractères</p><p id=\"passMin\" class=\"incorrectCommentary\">1 minuscule minimum</p><p id=\"passMaj\" class=\"incorrectCommentary\">1 majuscule minimum</p><p id=\"passNum\" class=\"incorrectCommentary\">1 chiffre minimum</p><p id=\"passSpec\" class=\"incorrectCommentary\">1 caractère spécial minimum (@$!%*#?&)</p>");

                if ((element.length >= 8) && (element.length <= 15)) {
                    document.querySelector("#passLength").classList.add("correctCommentary")
                }
                if (regExPassMin.test(element) == true) {
                    document.querySelector("#passMin").classList.add("correctCommentary")
                }
                if (regExPassMaj.test(element) == true) {
                    document.querySelector("#passMaj").classList.add("correctCommentary")
                }
                if (regExPassNum.test(element) == true) {
                    document.querySelector("#passNum").classList.add("correctCommentary")
                }
                if (regExPassSpec.test(element) == true) {
                    document.querySelector("#passSpec").classList.add("correctCommentary")
                }
            } else if (regExPass.test(element) == true) {
                document.querySelectorAll(".fieldBox")[indexIncorrect].classList.add("correctInput");
                document.querySelectorAll(".fieldBox")[indexIncorrect].insertAdjacentHTML("afterend", "<em class=\"correctCommentary\">Votre "+attributesFR[indexIncorrect].toLowerCase()+" est valide</em>");
            }
        } else if (element != "") {
            if (regExLength.test(element) == false) {
                document.querySelectorAll(".fieldBox")[indexIncorrect].classList.add("incorrectInput");
                document.querySelectorAll(".fieldBox")[indexIncorrect].insertAdjacentHTML("afterend", "<em class=\"incorrectCommentary\">Votre "+attributesFR[indexIncorrect].toLowerCase()+" doit faire <b>entre 5 et 15 caractères</b></br>Longueur actuelle : <b>"+element.length+"</b></em>");
            } else if (regExLength.test(element) == true) {
                document.querySelectorAll(".fieldBox")[indexIncorrect].classList.add("correctInput");
                document.querySelectorAll(".fieldBox")[indexIncorrect].insertAdjacentHTML("afterend", "<em class=\"correctCommentary\">Votre "+attributesFR[indexIncorrect].toLowerCase()+" est valide</em>");
            }
        }
        indexIncorrect++
    });
}

function messageCheck(event) {
    event.preventDefault()
        
    document.getElementById("messageLength").innerHTML = document.getElementById("message").value.length;

    if (document.getElementById("message").value.length == 10) {
        document.getElementById("messageLengthCounter").classList.add("incorrectCommentary")
    } else if (document.getElementById("message").value.length < 10) {
        document.getElementById("messageLengthCounter").classList.remove("incorrectCommentary")
    }
}

function emptyCheck(event) {
    event.preventDefault();

    let indexAttributes = 0;
    var attributes = [];
    document.querySelectorAll(".fieldBox").forEach(element => {
        attributes[indexAttributes] = element.getAttribute("id");
        indexAttributes++
    })

    let indexAttributesFR = 0;
    var attributesFR = [];
    var regExAttributesFR = /[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒa-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ0-9\s]+/;
    document.querySelectorAll(".attributeFRName").forEach(element => {
        attributesFR[indexAttributesFR] = element.innerHTML.match(regExAttributesFR)[0];
        indexAttributesFR++
    })

    let indexContent = 0;
    var contents = [];
    document.querySelectorAll(".fieldBox").forEach(element => {
        contents[indexContent] = element.value;
        indexContent++
    })

    var previousErrorsCommentaries = document.querySelectorAll(".incorrectCommentary");
    previousErrorsCommentaries.forEach(element => {
        element.remove();
    });
    var previousIntroCommentaries = document.querySelectorAll("#passIntro");
    previousIntroCommentaries.forEach(element => {
        element.remove();
    });

    var regExPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
    var regExPassMin = /[a-z]/;
    var regExPassMaj = /[A-Z]/;
    var regExPassSpec = /[@$!%*#?&]/;
    var regExPassNum = /\d/;

    let indexIncorrect = 0;
    contents.forEach(element => {
        if (element == "") {
            document.querySelectorAll(".fieldBox")[indexIncorrect].classList.add("incorrectInput");
            document.querySelectorAll(".fieldBox")[indexIncorrect].insertAdjacentHTML("afterend", "<em class=\"incorrectCommentary\">Le remplissage du champ <b>"+attributesFR[indexIncorrect]+"</b> est requis</em>");
        } else if ((element != "") && (attributes[indexIncorrect] == "password")) {
            if (regExPass.test(element) == false) {
                document.querySelectorAll(".fieldBox")[indexIncorrect].classList.add("incorrectInput");
                document.querySelectorAll(".fieldBox")[indexIncorrect].insertAdjacentHTML("afterend", "<p id=\"passIntro\">Votre "+attributesFR[indexIncorrect].toLowerCase()+" doit avoir le format suivant :</p><p id=\"passLength\" class=\"incorrectCommentary\">8 à 15 caractères</p><p id=\"passMin\" class=\"incorrectCommentary\">1 minuscule minimum</p><p id=\"passMaj\" class=\"incorrectCommentary\">1 majuscule minimum</p><p id=\"passNum\" class=\"incorrectCommentary\">1 chiffre minimum</p><p id=\"passSpec\" class=\"incorrectCommentary\">1 caractère spécial minimum (@$!%*#?&)</p>");

                if ((element.length >= 8) && (element.length <= 15)) {
                    document.querySelector("#passLength").classList.add("correctCommentary")
                }
                if (regExPassMin.test(element) == true) {
                    document.querySelector("#passMin").classList.add("correctCommentary")
                }
                if (regExPassMaj.test(element) == true) {
                    document.querySelector("#passMaj").classList.add("correctCommentary")
                }
                if (regExPassNum.test(element) == true) {
                    document.querySelector("#passNum").classList.add("correctCommentary")
                }
                if (regExPassSpec.test(element) == true) {
                    document.querySelector("#passSpec").classList.add("correctCommentary")
                }
            } else if (regExPass.test(element) == true) {
                document.querySelectorAll(".fieldBox")[indexIncorrect].classList.add("correctInput");
                document.querySelectorAll(".fieldBox")[indexIncorrect].insertAdjacentHTML("afterend", "<em class=\"correctCommentary\">Votre "+attributesFR[indexIncorrect].toLowerCase()+" est valide</em>");
            }
        }
        indexIncorrect++
    });
}