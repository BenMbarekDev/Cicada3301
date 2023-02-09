//add visitor
function addVisitor() {
    var ip = localStorage.getItem("currentIp")
    var visitors = JSON.parse(localStorage.getItem("visitors") || "[]")
    if (!visitorExist(ip)) {
        var visitor = {
            ip: ip,
            challenge: "",
            isVisited: ""
        }
        visitors.push(visitor)
        localStorage.setItem("visitors", JSON.stringify(visitors))
    }

}
// return if visitor exist or not
function visitorExist(ip) {
    var visitors = JSON.parse(localStorage.getItem("visitors") || "[]")
    var test = false
    var ip = localStorage.getItem("currentIp")
    for (let i = 0; i < visitors.length; i++) {
        if (visitors[i].ip == ip) {
            test = true
            break
        }
    }
    return test

}
// recherche un objet 
function findObject(ip, key) {
    var objects = JSON.parse(localStorage.getItem(key) || "[]")
    var obj = {};
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].ip == ip) {
            obj = objects[i]
            break
        }
    }
    return obj
}

//false click challange standart
function falseClick() {
    // alert('if you choose the wrong place you will return to home page')
    var ip = localStorage.getItem("currentIp")
    var visitors = JSON.parse(localStorage.getItem("visitors") || "[]")
    for (let i = 0; i < visitors.length; i++) {
        if (visitors[i].ip == ip) {
            console.log('AM HERE')
            visitors[i].challenge = "f"
            location.replace('./index.html')
            break
        }
    }
    localStorage.setItem("visitors", JSON.stringify(visitors))
}
function passedChallenge() {
    // alert('if you choose the wrong place you will return to home page')
    var ip = localStorage.getItem("currentIp")
    var visitors = JSON.parse(localStorage.getItem("visitors") || "[]")
    for (let i = 0; i < visitors.length; i++) {
        if (visitors[i].ip == ip) {
            visitors[i].challenge = "t"
            localStorage.setItem("visitors", JSON.stringify(visitors))
            location.replace("../vortex-master/vortex-master/signup.html")
            break

        }
    }


}

function firstTest() {

    var ip = localStorage.getItem("currentIp")
    var visitor = findObject(ip, "visitors")
    var visitors = JSON.parse(localStorage.getItem('visitors') || '[]')
    // for (let i = 0; i < visitors.length; i++) {
    //     if (visitors[i].ip==ip) {
    if (visitor.challenge == "t") {
        location.replace("../vortex-master/vortex-master/signup.html")

    } else if (visitor.challenge == "f") {
        document.getElementById("participate").style.visibility = "hidden"
        document.getElementById("description").innerHTML = "sorry you are out of challange"

    }



}
//     }


// }
//block challenge if try to open page in other window
function challengeTest() {
    var ip = localStorage.getItem("currentIp")
    var visitors = JSON.parse(localStorage.getItem('visitors') || '[]')
    var test = true
    for (let i = 0; i < visitors.length; i++) {
        if (visitors[i].ip == ip) {
            if (visitors[i].isVisited == "true") {
                if (visitors[i].challenge == "") {
                    document.getElementById("ta1").style.visibility = "hidden"
                    document.getElementById("boxTest").style.visibility = "hidden"
                    document.getElementById("description").innerHTML = "Nice try ;) you are out of challenge"
                    visitors[i].challenge = "f"
                    localStorage.setItem('visitors', JSON.stringify(visitors))
                }
            } else {
                visitors[i].isVisited = "true"
                localStorage.setItem('visitors', JSON.stringify(visitors))
            }
        }
    }

}

// **********************************************************
// register
function register() {

    location.replace('index.html')
}


// signup 
function signup() {
    var test = true;
    var fullName = document.getElementById('fullName').value;

    if (fullName.length < 3) {
        document.getElementById('fullNameError').innerHTML = "Full Name must have at least 3 characters";
        document.getElementById('fullNameError').style.color = "red"
        test = false;
    } else {
        document.getElementById('fullNameError').innerHTML = ""

    }

    var email = document.getElementById('email').value;
    var verifEmail = validateEmail(email);
    if (!verifEmail) {
        document.getElementById('emailError').innerHTML = "Invalid email";
        document.getElementById('emailError').style.color = "red";
        test = false


    } else {
        document.getElementById('emailError').innerHTML = "";

    }

    var verifEmailExist = emailExists(email);
    if (verifEmailExist) {
        document.getElementById('emailExistError').innerHTML = "Email already exists";
        document.getElementById('emailExistError').style.color = "red";
        test = false


    } else {
        document.getElementById('emailExistError').innerHTML = "";

    }

    var userName = document.getElementById('userName').value;
    if ((userName.length < 3) || (userNameExist(userName))) {
        document.getElementById('userNameError').innerHTML = "UserName must be unique and have at least 5 characters "
        document.getElementById('userNameError').style.color = "red";
        test = false;
    }
    else {
        document.getElementById('userNameError').innerHTML = "";
    }

    var pwd = document.getElementById('pwd').value;
    var verifPassword = checkPassword(pwd);
    if (!verifPassword) {
        document.getElementById('passwordError').innerHTML = "Invalid password";
        document.getElementById('passwordError').style.color = "red";
        test = false
    } else {
        document.getElementById('passwordError').innerHTML = "";

    }
    // stockage dans LS
    if (test) {
        var idUser = JSON.parse(localStorage.getItem('idUser') || "10")
        var currentIp = localStorage.getItem('currentIp')

        var user = {
            id: idUser,
            fullName: fullName,
            userName: userName,
            email: email,
            pwd: pwd,
            role: 'challanger',
            ip: currentIp,
            score: 0
        }

        var users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("idUser", idUser + 1)
        location.replace('login.html')
    }

}

// validate email valide
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Check if Password valide
function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    return re.test(str);
}

//validate email exist
function emailExists(email) {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var exist = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            exist = true;
        }
    }
    return exist;
}

// validate userName 
function userNameExist(userName) {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var exist = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].userName == userName) {
            exist = true;
        }
    }
    return exist;
}

//insert 2 admins 
function insertAdmins() {
    var admin1 = {
        id: "1",
        fullName: "islem",
        userName: "islem",
        email: "islem@crococoder.tn",
        pwd: "Islem@123",
        role: 'admin',
        ip: "",
        score: ""
    }
    var admin2 = {
        id: "2",
        fullName: "omar",
        userName: "omar",
        email: "omar@crococoder.tn",
        pwd: "Omar@123",
        role: 'admin',
        ip: "",
        score: ""
    }

    var users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(admin1, admin2);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("adminsAdded", true);
}

//login
function login() {
    var userName = document.getElementById('userName').value;
    var pwd = document.getElementById('password').value;
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var findedUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].userName == userName && users[i].pwd == pwd) {
            findedUser = users[i]
        }
    }
    if (findedUser) {
        // user exists

        localStorage.setItem("connectedUser", JSON.stringify(findedUser));
        // Redirection
        switch (findedUser.role) {
            case "challanger":
                location.replace("home.html")
                break;

            case "admin":
                location.replace("home.html")

                break;


        }
    } else {
        // not exists
        document.getElementById("error").innerHTML = 'Wrong informations'
        document.getElementById("error").style.color = 'red'
    }


}

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Display user Profile
function displayUser() {
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'))
    var users = JSON.parse(localStorage.getItem('users'))
    var user
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == connectedUser.id) {
            user = users[i]

        }

    }
    var userInfo = ` 
    <div class="col-lg-6 mb-4 mb-lg-0">
    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="...">
    </div>
        <div class="col-lg-6 px-xl-10">
    <div class="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
        <h3 class="h2 text-white mb-0">${user.fullName} </h3>
        <b class="text-primary">${user.role}</b>
    </div>
    <ul class="list-unstyled mb-1-9">
        <li class="mb-2 mb-xl-3 display-28"><span class="display-26 text-secondary me-2 font-weight-600">Full Name:</span> ${user.fullName} </li>
        <li class="mb-2 mb-xl-3 display-28"><span class="display-26 text-secondary me-2 font-weight-600">UserName:</span> ${user.userName}</li>
        <li class="mb-2 mb-xl-3 display-28"><span class="display-26 text-secondary me-2 font-weight-600">Email:</span> ${user.email}</li>
        <li class="mb-2 mb-xl-3 display-28"><span class="display-26 text-secondary me-2 font-weight-600">Score:</span> ${user.score}</li>
        <li class="mb-2 mb-xl-3 display-28"><button class=" btn btn-warning" style="margin-top:50px ;" onclick="editUser(${user.id})">Edit Info</button></li>
       
    </ul>
    </div> `
    document.getElementById("displayUser").innerHTML = userInfo
}


// add formulaire to edit user
function editUser(id) {
    var user = JSON.parse(localStorage.getItem("connectedUser"))
    var editUserForm = `
        <div class="login_form_inner" >
        <h3> EditUser</h3>
        <div class="row login_form">
        
            <div class="d-block col-md-4 form-group">
                <input type="text" class="form-control" id="fullName" name="" placeholder="User Name" value="${user.fullName}" onfocus="this.placeholder = ''" onblur="this.placeholder = 'full name'">
                <span id="fullNameError"></span>
            </div>
            <div class="d-block col-md-4 form-group">
                <input type="text" class="form-control" id="email" name="email" placeholder="email" value="${user.email}" onfocus="this.placeholder = ''" onblur="this.placeholder = 'email'">
                <span id="emailError"></span>
            </div>
            
            <div class="col-md-6 form-group mb-2 mb-xl-3 display-28">
                <button value="" class=" btn btn-warning" style="margin-top:20px ;" onclick="confirmEditUser(${user.id})" >Edit</button>
                
            </div>
        </div>
    </div>
    
        `;
    document.getElementById('editUserForm').innerHTML = editUserForm

}

//search by id
function searcheById(id, key) {
    var objects = JSON.parse(localStorage.getItem(key) || "[]")
    var object
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].id == id) {
            object = objects[i]

        }

    }
    return object;
}

//confirm edit user
function confirmEditUser(id) {
    var users = JSON.parse(localStorage.getItem("users") || "[]")
    var fullName = document.getElementById('fullName').value
    var email = document.getElementById('email').value
    var test = true
    if (fullName.length < 3) {
        document.getElementById("fullNameError").innerHTML = "Full Name Must Have at least 3 char"
        document.getElementById("fullNameError").style.color = "red"
        test = false
    }
    if (emailExists(email)) {
        document.getElementById("emailError").innerHTML = "email exist"
        document.getElementById("emailError").style.color = "red"
        test = false
    }
    if (test == true) {

        for (let i = 0; i < users.length; i++) {

            if (users[i].id == id) {
                users[i].fullName = fullName
                users[i].email = email
                localStorage.setItem("connectedUser", JSON.stringify(users[i]));
            }
        }
        localStorage.setItem("users", JSON.stringify(users));
        location.reload();


    }


}

//tri challenger by score
function triChallengerByScore() {
    var users = JSON.parse(localStorage.getItem('users'))
    for (var i = 0; i < users.length; i++) {
        //stocker l'index de l'élément minimum
        var max = i;
        for (var j = i + 1; j < users.length; j++) {
            if (users[j].score > users[max].score) {
                // mettre à jour l'index de l'élément minimum
                max = j;
            }
        }
        var tmp = users[i];
        users[i] = users[max];
        users[max] = tmp;
    }
    localStorage.setItem("users", JSON.stringify(users))
};

//display challenger list by Rank
function displayChallengerRank() {
    var users = JSON.parse(localStorage.getItem('users'))
    var challengerTab = ` 
    <thead>
    <th>#</th>
    <th>Player Name</th>
    <th>Score</th>
    <th>Time</th>
    </thead>
    <tbody >
    `
    var j = 1
    for (let i = 0; i < users.length; i++) {
        if (users[i].role == "challanger") {
            switch (j) {
                case 1: challengerTab += `
                        <tr class="tr bg-gold" id="rankRow" style="background-color : background: rgb(255,245,0);
                        background: radial-gradient(circle, rgba(255,245,0,1) 0%, rgba(253,187,45,1) 100%);">
                             <td>${j}</td>
                             <td>${users[i].fullName}</td>
                             <td>${users[i].score}</td>
                             <td>ghjkl</td>
                    
                        </tr>`
                    break

                case 2: challengerTab += `
                        <tr class="tr" id="rankRow" style="background: rgb(153,156,156);
                        background: linear-gradient(265deg, rgba(153,156,156,1) 0%, rgba(221,224,221,1) 100%);">
                            <td>${j}</td>
                            <td>${users[i].fullName}</td>
                            <td>${users[i].score}</td>
                            <td>ghjkl</td>
                    
                        </tr>`
                    break
                    ;
                case 3: challengerTab += `
                        <tr class="tr" id="rankRow" style="background: rgb(158,138,19);
                        background: linear-gradient(265deg, rgba(158,138,19,1) 0%, rgba(214,214,214,1) 100%);">
                            <td>${j}</td>
                            <td>${users[i].fullName}</td>
                            <td>${users[i].score}</td>
                            <td>ghjkl</td>
                    
                        </tr>`
                    break
                    ;

                default:
                    challengerTab += `
                    <tr class="tr" id="rankRow">
                        <td>${j}</td>
                        <td>${users[i].fullName}</td>
                        <td>${users[i].score}</td>
                        <td>ghjkl</td>
                        
                    </tr>` ;

            }
            j++


        }

    }
    challengerTab += `
    </tbody>`
    document.getElementById('rankTab').innerHTML = challengerTab



}
//display challenger list
function displayChallengerList() {
    var users = JSON.parse(localStorage.getItem('users'))
    var challengerTab = ` 
    <thead>
    <th>#</th>
    <th>Player Name</th>
    <th>Score</th>
    <th>Time</th>
    </thead>
    <tbody >
    `
    for (let i = 0; i < users.length; i++) {
        if (users[i].role == "challanger") {
            challengerTab += `
        <tr class="tr" id="rankRow">
            <td>${i + 1}</td>
            <td>${users[i].fullName}</td>
            <td>${users[i].score}</td>
            <td>ghjkl</td>
            <td><button value="" class=" btn btn-warning" onclick="deleteChallenger(${users[i].id})">Delete</button> </td>
            
        </tr>`
        }


    }
    challengerTab += `
    </tbody>`
    document.getElementById('challengerListTab').innerHTML = challengerTab

}

// delete challenger
function deleteChallenger(id) {

    var users = JSON.parse(localStorage.getItem("users") || "[]");

    var pos;
    // recherche de la pos
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            pos = i;
        }
    }

    users.splice(pos, 1);
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
}


// function getTextArea() {
//    var cnsl = document.getElementById('firstChlg').value;
//    return  ;
// }


// function run() {

//     var fn = document.getElementById('firstChlg').value;
//     //    fn=fn.replace(" Function teriangle (N) {","")
//     //    fn=fn.replace("}","")
//     fn = "var fnc = " + fn
//     eval(`${document.getElementById('firstChlg').value}`)
//     document.getElementById('result').value = teriangle(5)
//     // fn=fn.replace("}","")

//     // var bactic=`<scrpt>

//     //     document.getElementById('result').value = ${fn}
//     //     } 
//     //     </script>
//     // `
//     var bactic = `
//     <textarea name="" id="result" cols="50" rows="10" classe="text-center" style="color: rgb(0, 246, 20) ; border-radius: 20px; background-color: #000000;" readonly="true">${fn}</textarea>
//     `;
//     // document.getElementById('runFn').innerHTML=bactic

// }

//logout
function logout() {
    localStorage.removeItem('connectedUser')
    location.replace('login.html')
}

//navbar dynamique
function navBar() {
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'))
    if (connectedUser.role == "challenger") {

        document.getElementById('navbar-menu').innerHTML = `
        
        <ul class="nav navbar-nav navbar-right">

        <li class=""><a href="home.html#X-winners">Home</a></li>

        <li class=""><a href="home.html#About">About</a></li>

        <li class=""><a href="profile.html">Profile</a></li>

        <li class="active"><a href="challenge.html">Challenge</a></li>

        <li class=""><a href="rank.html">Rank</a></li>

        <li class="button-holder">

            <button type="button" class="btn btn-blue navbar-btn"onclick="logout()">logout</button>

        </li>

    </ul>`

    }
    else {
        document.getElementById('navbar-menu').innerHTML = `
        
        <ul class="nav navbar-nav navbar-right">

        <li class=""><a href="home.html#X-winners">Home</a></li>

        <li class=""><a href="home.html#About">About</a></li>

        <li class=""><a href="profile.html">Profile</a></li>

        <li class="active"><a href="challenge.html">Challenge</a></li>

        <li class=""><a href="rank.html">Rank</a></li>

        <li class=""><a href="challengersListe.html">Challengers List</a></li>

        <li class="button-holder">

            <button type="button" class="btn btn-blue navbar-btn"onclick="logout()">logout</button>

        </li>

    </ul>`
    }
}

//timer in challange 1
function challangeTime() {

    var timer = JSON.parse(localStorage.getItem('timer') || "1800")
    const minutes = Math.floor(timer / 60)
    let seconds = timer % 60
    const counter = document.getElementById('timer')
    //if seconds < 10 ==> +0
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var newTime = `${minutes} : ${seconds} `
    counter.innerHTML = newTime
    timer--
    localStorage.setItem('timer', timer)
    
}


// test challenge1 and add to score
function challange1() {

    var users = JSON.parse(localStorage.getItem('users'))
    var answer = document.getElementById('answer').value
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"))
    var timer = JSON.parse(localStorage.getItem("timer"))

    if (answer == "crococoder") {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == connectedUser.id && timer > 0) {
                users[i].score += timer / 10
                localStorage.setItem('users', JSON.stringify(users))
                location.replace('profile.html')
            }
        }
    } else {
        document.getElementById('errorCh1').innerHTML="false adress your friend has been killed"
        document.getElementById('errorCh1').style.color="red"
        document.getElementById('confirm').style.visibility="hidden"
    }

}