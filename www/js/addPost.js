function id(id){
    return document.getElementById(id)
}

tinymce.init({
    selector: "#editor"
})

const cat_url = "/api/v1/categories/allcat"
fetch(cat_url,{
    method: "get",
    credentials: 'include'
})
.then((data)=>data.json())
.then((data)=>{
    let select
    select = data.map((item)=>{
        return (`<option value=${item._id}>${item.name}</option>`)
    })

    id('opt').innerHTML = select
})
.catch((e)=>console.log(e))


    // const title = id('title').value
    // const content = id('content').value
    // const cat = id('opt').value


id('form').addEventListener('submit',(e)=>{
    e.preventDefault()

    fetch('/api/v1/post',{
        method: "post",
        body: JSON.stringify({
            title: id('title').value ,
            content: id('editor').value ,
            category : id('opt').value
        })
    })
    .then((data)=>data.json())
    .then((data)=>{
        id('alert').style.display = 'block'
        setTimeout(()=>{
            id('alert').style.display = 'none'
        }, 1000)
    })
    .catch((e)=>console.log(e))

})

