function id(id){
    return document.getElementById(id)
}

id('form').addEventListener('submit',(e)=>{
    e.preventDefault()

    const name = id('catName').value

    fetch('/api/v1/categories/',{
        method: "post",
        body: JSON.stringify({name})
    })
    .then((data)=>data.json())
    .then((data)=>{
        id('alert').style.display = "block"
        id('atx').innerText = data.status
        setTimeout(()=>{
            id('alert').style.display = "none"
            getAllPost()
        },1000)
    })
    .catch((e)=>console.log(e))
})