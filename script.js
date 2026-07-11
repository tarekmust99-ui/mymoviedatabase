let todosFilmes = [];


fetch("filmes.txt")
    .then(resposta => resposta.text())
    .then(texto => {


        const lista = document.getElementById("movies");
        const busca = document.getElementById("busca");
        const contador = document.getElementById("contador");
        const estatisticas = document.getElementById("estatisticas");
        const exportar = document.getElementById("exportar");



        texto.split("\n").forEach(linha => {


            if(linha.trim() === "") return;


            const dados = linha.split("|");


            const filme = {

                titulo: dados[0],
                ano: dados[1],
                diretor: dados[2],
                nota: Number(dados[3])

            };


            todosFilmes.push(filme);


        });




        contador.textContent =
            "> FILMS: " + todosFilmes.length;




        mostrarFilmes(todosFilmes);

        mostrarEstatisticas();






        busca.addEventListener("input", function(){


            const termo = busca.value.toLowerCase();



            const resultados = todosFilmes.filter(filme =>


                filme.titulo.toLowerCase().includes(termo)


            );



            contador.textContent =
                "> SEARCH RESULTS: " + resultados.length;



            mostrarFilmes(resultados);



        });









        function mostrarFilmes(listaFilmes){


            lista.innerHTML = "";



            listaFilmes.forEach(filme => {



                const item = document.createElement("pre");



                item.textContent =

                    filme.titulo +
                    " (" + filme.ano + ") - " +
                    filme.diretor +

                    "\n" +

                    gerarEstrelas(filme.nota) +

                    "\n\n----------------------------------------";



                lista.appendChild(item);



            });


        }








        function gerarEstrelas(nota){


            let resultado = "";



            let cheias = Math.floor(nota);



            let meia = nota % 1 !== 0;



            resultado += "★".repeat(cheias);



            if(meia){

                resultado += "½";

            }



            return resultado;


        }









        function mostrarEstatisticas(){



            let ranking = {

                1:0,
                2:0,
                3:0,
                4:0,
                5:0

            };




            todosFilmes.forEach(filme => {


                ranking[Math.floor(filme.nota)]++;


            });





            estatisticas.innerHTML = "";



            const titulo = document.createElement("div");


            titulo.textContent =
                "> RATING";



            estatisticas.appendChild(titulo);






            for(let nota = 5; nota >= 1; nota--){



                const linha = document.createElement("div");



                const estrelas = document.createElement("span");



                estrelas.textContent =
                    "★".repeat(nota);



                estrelas.className =
                    "rating-star";





                const quantidade = document.createElement("span");



                quantidade.textContent =
                    " : " + ranking[nota];





                estrelas.onclick = function(){


                    mostrarFilmesPorNota(nota);


                };





                linha.appendChild(estrelas);

                linha.appendChild(quantidade);



                estatisticas.appendChild(linha);



            }






            const limpar = document.createElement("div");



            const limparTexto = document.createElement("span");



            limparTexto.textContent =
                "> SHOW ALL FILMS";



            limparTexto.className =
                "show-all";



            limparTexto.onclick = function(){


                contador.textContent =
                    "> FILMS: " + todosFilmes.length;



                mostrarFilmes(todosFilmes);


            };



            limpar.appendChild(limparTexto);


            estatisticas.appendChild(document.createElement("br"));

            estatisticas.appendChild(limpar);



        }









        function mostrarFilmesPorNota(nota){



            const filtrados = todosFilmes.filter(filme =>


                Math.floor(filme.nota) === nota


            );



            contador.textContent =


                "> FILTER: " +
                nota +
                " STARS\n" +

                "> RESULTS: " +
                filtrados.length +
                " FILMS";



            mostrarFilmes(filtrados);



        }








        exportar.onclick = function(){



            let conteudo = "";



            todosFilmes.forEach(filme => {



                conteudo +=

                    filme.titulo +
                    "|" +
                    filme.ano +
                    "|" +
                    filme.diretor +
                    "|" +
                    filme.nota +
                    "\n";



            });




            const arquivo = new Blob(

                [conteudo],

                {type:"text/plain"}

            );




            const link = document.createElement("a");



            link.href =
                URL.createObjectURL(arquivo);



            link.download =
                "filmes_backup.txt";



            link.click();



        };



    });