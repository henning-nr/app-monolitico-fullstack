const http = require("http")
const fs = require("fs")
const port = 5000

    http.createServer((req, res) => {
        rota = req.url
        
        // rota home
        if(rota == "/"){
            page = fs.readFileSync("./index.html").toString()
            res.end(page)      
        }
        
        // rota alunos
        if(rota == "/alunos"){
            alunos = [{nome: "henning Summer"},{nome: "Eduardo"}, {nome: "Cris"}] //DB
            page = fs.readFileSync("./aluno.html").toString()
            pagePronta = page.replace("nome", alunos[1].nome)
            res.end(pagePronta)
        }

        // rota pets
        if(rota == "/pets"){
            pets = ""
            fetch("https://effective-space-parakeet-6q6qqgw9vp9c49xg-3000.app.github.dev/pets")
            .then((resposta)=>{ return resposta.json()})
            .then((pets)=>{ 
                page = fs.readFileSync("./pet.html").toString()
                pagePronta = page.replace("nome", pets[1].name)
                res.end(pagePronta)
            })
        }
        

    })
    .listen(port,()=>{
        console.log("servidor no ar na porta", port)
    })