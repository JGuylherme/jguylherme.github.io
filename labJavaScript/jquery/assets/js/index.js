$(document).ready(() => {
    let movieList = "assets/movies.json";

    /*----------------------------------*/
    const returnClassification = (classification) => {
        if(classification <= 14) {
            return `green`;
        } else if(classification < 18 ) {
            return `yellow`;
        } else {
            return `red`
        }
    };

    /*----------------------------------*/
    const calculateRatingStar = (rating) => {
        let starString = '';
        for(let i = 0; i < 5; i++) {
            if(i < rating){
                starString += `&#9733;`
            }else{
                starString += `&#9734;`
            }
        }
        return `<small class="stars">${starString}</small>`;
    };

    /*----------------------------------*/
    const returnSimilarTitle = (similarTitles, movieValues) => {
        let titles = [];
        similarTitles.forEach((id) => {
            movieValues.forEach((movie) => {
                if(id===movie.id){
                    titles.push(`<li> <img src=${movie.figura} alt="Titulos semelhantes"></li>`)
                }
            })

        })
        return titles.join('');
    };

    /*----------------------------------*/
    let buildHTML = (movies) => {
        let htmlContent = $(".cards");
    
        const htmlString = movies.map((movie) => (
            `
            <div class="movie-card">
                <div class="movie-image">
                    <img src="${movie.figura}" alt="${movie.titulo}">
                </div>
                <span class="classification classification-${returnClassification(movie.classificacao)}">
                    ${movie.classificacao}
                </span>
                <h2 class="movie-title">
                    ${movie.titulo}
                </h2>
                <div class="movie-info">
                    <p class="movie-summary">
                        ${movie.resumo}
                    </p>
                    <ul class="movie-genre">
                        <li>Gêneros: </li>
                        ${movie.generos.map((genre) => `<li>${genre}</li>`).join('')}
                    </ul>
                    <ul class="movie-cast">
                        <li>Elenco: </li>
                        ${movie.elenco.map((cast) => `<li>${cast}</li>`).join('')}
                    </ul>
                    <ul class="movie-opinion">
                        <li>Opiniões: </li>
                        ${movie.opinioes.map((opinion) =>
                        `
                        <li class="rating-stars">
                            <p><b>Avaliação:</b> ${calculateRatingStar(opinion.rating)}</p>
                            <p>${opinion.descricao}</p>
                        </li>
                        `
                        ).join('')}
                    </ul>
                    <div class="similar-titles">
                        ${movie.titulosSemelhantes.length > 0? '<p>Títulos semelhantes: </p>' : ''}
                        <ul class="list-similar-titles">
                            ${returnSimilarTitle(movie.titulosSemelhantes, movies)}
                        </ul>
                    </div>
                </div>
            </div>
            `
        )).join('');           

        htmlContent.html(htmlString);
    };
    
    /*----------------------------------*/
    $.get(movieList).done(function(movies){
        buildHTML(movies);
    });
    //$.get(movieList).done((movies) => buildHTML(movies));
});