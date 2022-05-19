function id(id){
    return document.getElementById(id)
}

function getAllPost() {
    fetch('/api/v1/post/allpost')
    .then((data)=>data.json())
    .then((data)=>{

        let post;
        
        console.log(post)

        post = data.map((item, index)=>{
            return (`
            <tr class="post_list">
            <td>${index + 1}</td>
            <td>${item.title.slice(0,30).concat('...')}</td>
            <td>${item.category.name }</td>
            <td>${item.content.slice(0,70).concat('...')}</td>
            <td>

                <a href="#" data-id="${item._id}" class=" btn btn-danger" data-toggle="modal" data-target="#deleteModal"> Delete </a> 
                <a href="#" data-edit="${item._id}" class="btn btn-primary" data-toggle="modal" data-target="#editModal" >Edit</a>

            </td>
            </tr>
            `)
        })
        post = post.toString()
        post = post.replaceAll(',','')

        id('d-data').innerHTML = post
    })
    .catch((e)=>console.log(e))
}

getAllPost()


$('#deleteModal').on('show.bs.modal', function(event){
    const btn = $(event.relatedTarget)
    const val = btn.data('id')
    const pid = id('postId').value = val

    id('deleteSubmit').addEventListener('click',()=>{
        fetch('/api/v1/post/',{
            method: "delete",
            body: JSON.stringify({id: pid})
        })
        .then((data)=>data.json())
        .then((data)=>{
            
            id('alert').style.display = "block"
            setTimeout(()=>{
                id('alert').style.display = "none"
                getAllPost()
            },1000)
            
        })
        .catch((e)=>console.log(e))
        
    })
})

$('#editModal').on('show.bs.modal', function(event){
    const btn = $(event.relatedTarget)
    const val = btn.data('edit')
    const pid = id('postId').value = val

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

    fetch('/api/v1/post/single/'+pid )
    .then((data)=>data.json())
    .then((data)=>{
        id('postId').value = pid
        id('title').value = data[0].title
        id('editor').value = data[0].content
    })
    .catch((e)=>console.log(e))

})

tinymce.init({
    selector: "#editor"
})


id('up-btn').addEventListener('click',(e)=>{

    fetch('/api/v1/post',{
        method: "put",
        body: JSON.stringify({
            id: id('postId').value,
            title: id('title').value ,
            content: id('editor').value ,
            category : id('opt').value
        })
    })
    .then((data)=>data.json())
    .then((data)=>{
        console.log(data)
        id('alert2').style.display = 'block'
        setTimeout(()=>{
            id('alert2').style.display = 'none'
        }, 1000)
        getAllPost()
    })
    .catch((e)=>console.log(e))

})
