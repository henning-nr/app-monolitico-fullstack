url = "https://effective-space-parakeet-6q6qqgw9vp9c49xg-3000.app.github.dev/"
$(document).ready(() => {
    $("#btn-update").hide()

    fetch(url+"tutors")
        .then((res) => {
            return res.json()
        })
        .then((tutors) => {
            list = ""
            for(let tutor of tutors){
                list += `<option value="${tutor.id}">${tutor.name}</option>`
            }

           $("#tutor-list").html(list)
        })


        listarPets()
})

function salvar(){
    const form = document.getElementById("form");
    const formData = new FormData(form);
    pet = {}
    for (const [key, value] of formData) {
        pet[key] = value
    }

    fetch(url+"pets",{
        method: "POST",
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify(pet)
    }).then((res)=>{
        return res.json()
    })
    .then((data)=>{
        listarPets()
    })
}

function listarPets(){
    // chamda pet
    fetch(url+"pets")
    .then((res) => {
        return res.json()
    })
    .then((pets) => {
        list = ""
        for(let pet of pets){
            list += ` <tr>
                        <td>${pet.name}</td>
                        <td>${pet.species}</td>
                        <td>${pet.age}</td>
                        <td>${pet.tutorId}</td>
                        <td>
                        <a onclick="editarPet(${pet.id})" class="btn-floating"><i class="material-icons">edit</i></a>
                        <a onclick="deletarPet(${pet.id})" class="btn-floating"><i class="material-icons">delete</i></a>
                        </td>
      </tr>`
        }

       $("#lista-pet").html(list)
    })
}


function deletarPet(id){
    fetch(url+"pets"+"/"+id,{
        method: "DELETE"
    }).then((res)=>{
        listarPets()
    })
}

function editarPet(id){
    $("#btn-update").show()
    $("#btn-save").hide()
    fetch(url+"pets"+"/"+id,{
        method: "GET"
    }).then((res)=>{
        return res.json()
    }).then((pet)=>{
        console.log("o pet veio", pet)
        $("#name").val(pet.name)
        $("#species").val(pet.species)
        $("#age").val(pet.age)
        $("#tutor-list").val(pet.tutorId)
    })
}