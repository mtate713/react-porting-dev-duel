import token from '../../token'
import axios from 'axios'

export function createUserProfile(profile) {
    return new Promise((resolve) => {
        setTimeout(() =>{
            axios.get(`http://api.github.com/users/` + profile.login + `/repos`, 
                {headers: {
                    'Authorization': token
                }
            }).then((data) => {
                //console.log(data.data)
                let result = {};
                let repoList = data.data;
                result["username"] = profile.login;
                result["name"] = profile.name;
                result["location"] = profile.location;
                result["email"] = profile.email;
                result["bio"] = profile.bio;
                result["avatar-url"] = profile.avatar_url;
                result["public-repos"] = profile.public_repos;
                let titles = [];
                let languageList = new Map();
                let starTotal = 0;
                let greatestStars = 0;
                let perfectProjectTotal = 0;
                let forkCount = 0;
                for (let repo of repoList) {
                    if (!languageList.has(repo.language)){
                        languageList.set(repo.language, 1)
                    }
                    else {
                        let count = languageList.get(repo.language);
                        languageList.set(repo.language, count + 1)
                    }
                    starTotal += repo.stargazers_count;
                    if (repo.stargazers_count > greatestStars) {
                        greatestStars = repo.stargazers_count;
                    }
                    if(repo.open_issues == 0)  {
                        perfectProjectTotal += 1;
                    }
                    if (repo.forks_count > 0) {
                        forkCount += 1;
                    }
            
                }
            
                if (forkCount > (repoList.length/2)) {
                    titles.push("Forker");
                }
                if (languageList.size == 1) {
                    titles.push("One-Trick Pony")
                }
                if (languageList.size > 10) {
                    titles.push("Jack of all Trades")
                }
                if ((profile.followers != 0) && (profile.following > (profile.followers * 2))) {
                    titles.push("Stalker")
                }
                if ((profile.following != 0) && (profile.followers > (profile.following * 2))) {
                    titles.push("Mr.Popular")
                }
                if (perfectProjectTotal == 0) {
                    titles.push("Spagetti Coder")
                }

                if (titles.length == 0) {
                    titles.push('None')
                }
                result["titles"] = titles;
                let greatestLanguageCount = 0;
                let favoriteLanguage = "none";
            
                for (let [key, value] of languageList) {
                    if (value > greatestLanguageCount) {
                        favoriteLanguage = key;
                    }
                }
            
                result["favorite-language"] = favoriteLanguage;
                
                result["total-stars"] = starTotal;
                result["highest-starred"] = greatestStars;
                result["perfect-repos"] = perfectProjectTotal;
                result["followers"] = profile.followers;
                result["following"] = profile.following;
            
                resolve(result);
            })
            .catch(err => console.log('Error loading data from Github API', err))
        }, Math.floor(Math.random() * 1000))
    })
   
       
}

