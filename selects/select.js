const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const query = require("./query.js");

module.exports = {
    async selectAnimes(req){
      let animes;
      if (req.query.name != undefined){
        animes = await this.selectByName(req.query.name, req.query.year, req.query.pr, req.query.nr);
      }else if(req.query.category != undefined){
        animes = await this.selectByCategory(req.query.category, req.query.year, req.query.season, req.query.pr, req.query.nr);
      }else if(req.query.tag != undefined){
        animes = await this.selectByTag(req.query.tag, req.query.year, req.query.season, req.query.pr, req.query.nr);
      }else if(req.query.season != undefined){
        animes = await this.selectByseason(req.query.season, req.query.year, req.query.pr, req.query.nr);
      }else if(req.query.year != undefined){
        animes = await this.selectByYear(req.query.year, req.query.pr, req.query.nr);
      }else {
        return "Paramentros passados incorretos!";
      }
      if(animes != undefined)
        return animes;
      else
        return "Paramentros invalidos!";
    },
    async selectByName(name, year=undefined, pr=1, nr=100){
        let qy = query.getQueryName(year);
        let variables = {
            search: name,
            year: year,
            page: pr,
            perPage: nr
        };
        return await this.select(this.getUrl(), this.getOptions(qy, variables));
    },
    async selectByCategory(category, year=undefined, season=undefined, pr=1, nr=100){
        let qy = query.getQueryCategory(year, season);
        let variables = {
            tagCategory: category,
            year: year,
            season: season,
            page: pr,
            perPage: nr
        };
        return await this.select(this.getUrl(), this.getOptions(qy, variables));
    },
    async selectByTag(tag, year=undefined, season=undefined, pr=1, nr=100){
        let qy = query.getQueryTag(year, season);
        let variables = {
            tag: tag,
            year: year,
            season: season,
            page: pr,
            perPage: nr
        };
        return await this.select(this.getUrl(), this.getOptions(qy, variables));
    },
    async selectByseason(season, year=undefined, pr=1, nr=10){
        let qy = query.getQuerySeason();
        let variables = {
            year: year,
            season: season,
            page: pr,
            perPage: nr
        };
        return await this.select(this.getUrl(), this.getOptions(qy, variables));
    },
    async selectByYear(year, pr=1, nr=100){
        let qy = query.getQueryYear();
        let variables = {
            year: year,
            page: pr,
            perPage: nr
        };
        return await this.select(this.getUrl(), this.getOptions(qy, variables));
    },
    getUrl(){
        return url = 'https://graphql.anilist.co';
    },
    getOptions(query, variables){
        return options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };
    },
    async select(url, options){
        return await fetch(url, options).then((response) => {
            return response.json().then( function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }).then((resp) => {
            return resp;
        }).catch((err) => {
            console.log(err);
        });
    }

}