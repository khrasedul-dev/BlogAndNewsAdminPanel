function id(id) {
    return document.getElementById(id)
}

let authCheck = document.cookie
authCheck = authCheck.split('=') 
authCheck = authCheck[1]



const login_url = "http://localhost:5000/api/v1/user/login"
id('login_btn').addEventListener('click', async (e)=>{

    let username = id('email').value
    username = username.trim()
    let password = id('password').value
    password = password.trim()

    fetch(login_url , {
        method: "POST",
        body: JSON.stringify({username,password}),
        credentials: 'include'
    })
    .then((data)=>{
        console.log(data.status)
        if(!data.ok){
            throw new Error(data.status)
        }
        return data.json()
    })
    .then((data)=>{
        document.cookie = "auth-token = " + data.access_token
        window.location.href= '/dashboard.html'
    })
    .catch((e)=>{
        console.log(e)
        id('alert').style.display = 'block'
    })

})