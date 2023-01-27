module.exports = {
    getQueryCategory(year, season){
        let query = `query ($id: Int, $page: Int, $perPage: Int, $tagCategory: String`;
        let media = `media (id: $id, tagCategory: $tagCategory`;
        if (year != undefined){
            query += `, $year: Int`;
            media += `, seasonYear: $year`;
        }
        if (season != undefined){
            query += `, $season: MediaSeason`;
            media += `, season: $season`;
        }
        query += `){
            `;
        media += `) {
            `;
        return query+this.pageQuery()+media+this.mediaQuery();
    },
    getQueryTag(year, season){
        let query = `query ($id: Int, $page: Int, $perPage: Int, $tag: String`;
        let media = `media (id: $id, tag: $tag`;
        if (year != undefined){
            query += `, $year: Int`;
            media += `, seasonYear: $year`;
        }
        if (season != undefined){
            query += `, $season: MediaSeason`;
            media += `, season: $season`;
        }
        query += `){
            `;
        media += `) {
            `;
        return query+this.pageQuery()+media+this.mediaQuery();
    },
    getQueryName(year){
        let query = `query ($id: Int, $page: Int, $perPage: Int, $search: String`;
        let media = `media (id: $id, search: $search`;
        if (year != undefined){
            query += `, $year: Int`;
            media += `, seasonYear: $year`;
        }
        query += `){
            `;
        media += `) {
            `;
        return query+this.pageQuery()+media+this.mediaQuery();
    },
    getQueryYear(){
        let query = `query ($id: Int, $page: Int, $perPage: Int, $year: Int){
            `;
        let media = `media (id: $id, seasonYear: $year) {
            `;
        return query+this.pageQuery()+media+this.mediaQuery();
    },
    getQuerySeason(){
        let query = `query ($id: Int, $page: Int, $perPage: Int, $year: Int, $season: MediaSeason){
            `;
        let media = `media (id: $id, season: $season, seasonYear: $year) {
            `;
        return query+this.pageQuery()+media+this.mediaQuery();
    },
    mediaQuery(){
        let media = 
            `id
            title {
                romaji
                english
            }
            coverImage {
                extraLarge
                large
                medium
            }
            tags {
                name
            }
                bannerImage
                genres
                season
                seasonYear
                description
                episodes
                popularity
                averageScore
            }
        }
        }
        `;
        return media;
    },
    pageQuery(){
        let page = 
            `Page (page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }`;
        return page;
    }
}