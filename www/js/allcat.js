function id(id){
    return document.getElementById(id)
}

function getAllCat() {
    fetch('/api/v1/categories/allCat')
    .then((data)=>data.json())
    .then((data)=>{

        let cat;

        cat = data.map((item, index)=>{
            return (`
            <tr class="cat_list">
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>

                <a href="#" data-id="${item._id}" class=" btn btn-danger" data-toggle="modal" data-target="#deleteModal"> Delete </a> 
                <a href="#" data-edit="${item._id}" class="btn btn-primary" data-toggle="modal" data-target="#editModal" >Edit</a>

            </td>
            </tr>
            `)
        })
        cat = cat.toString()
        cat = cat.replaceAll(',','')

        id('d-data').innerHTML = cat
    })
    .catch((e)=>console.log(e))
}

getAllCat()


$('#deleteModal').on('show.bs.modal', function(event){
    const btn = $(event.relatedTarget)
    const val = btn.data('id')
    const pid = id('catId').value = val

    id('deleteSubmit').addEventListener('click',()=>{
        fetch('/api/v1/categories/',{
            method: "delete",
            body: JSON.stringify({id: pid})
        })
        .then((data)=>data.json())
        .then((data)=>{
            
            id('alert').style.display = "block"
            setTimeout(()=>{
                id('alert').style.display = "none"
                getAllCat()
            },1000)
            
        })
        .catch((e)=>console.log(e))
        
    })
})


$('#editModal').on('show.bs.modal', function(event){
    const btn = $(event.relatedTarget)
    const val = btn.data('edit')
    const pid = id('catId').value = val

    fetch('/api/v1/categories/single/'+pid )
    .then((data)=>data.json())
    .then((data)=>{
        
        id('catName').value = data[0].name
    })
    .catch((e)=>console.log(e))

})


id('up-btn').addEventListener('click',(e)=>{

    fetch('/api/v1/categories/',{
        method: "put",
        body: JSON.stringify({
            id: id('catId').value,
            name: id('catName').value 
        })
    })
    .then((data)=>data.json())
    .then((data)=>{
        id('alert2').style.display = 'block'
        setTimeout(()=>{
            id('alert2').style.display = 'none'
        }, 1000)
        getAllCat()
    })
    .catch((e)=>console.log(e))

})