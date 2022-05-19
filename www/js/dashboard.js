function id(id){
    return document.getElementById(id)
}

let authCheck = document.cookie
authCheck = authCheck.split('=') 
authCheck = authCheck[1]

window.onload = ()=>{

    //total post url
    const totalPostUrl = "/api/v1/post/total/count"

    fetch(totalPostUrl,{
        method: "get"
    })
    .then((data)=>data.json())
    .then((data)=>{
        id('totalPost').innerText = data.totalPost || 0
    })
    .catch((e)=>{
        console.log(e)
        location.replace("/index.html")
    })

    const totalCatUrl = "/api/v1/categories/total/count"
    fetch(totalCatUrl)
    .then((data)=>data.json())
    .then((data)=>{

        id('total_cat').innerText = data.totalCat || 0
    })
    .catch((e)=>{
        console.log(e)
    })
}

function getAllPost() {
    fetch('/api/v1/post/recentPost')
    .then((data)=>data.json())
    .then((data)=>{

        let post;
        

        post = data.map((item, index)=>{
            return (`
            <tr class="post_list">
            <td>${index + 1}</td>
            <td>${item.title.slice(0,30).concat('...')}</td>
            <td>${item.category.name}</td>
            <td>${item.content.slice(0,90).concat('...')}</td>
            
            </tr>
            `)
        })
        post = post.toString()
        post.replaceAll(',','')

        id('d-data').innerHTML = post
    })
    .catch((e)=>console.log(e))
}

getAllPost()


