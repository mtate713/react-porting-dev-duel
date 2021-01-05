import {useState, useEffect} from 'react'
import classes from './UserProfile.module.css'

const UserProfile = (props) => {
    
    const [usersState, setUsers] = useState({
        first : {
          
                        'username': '',
                        'full-name' : '',
                        'location' : '',
                        'email' : '',
                        'bio' : '',
                        'avatar-url' : '',
                        'titles' : 'None',
                        'total-stars' : '',
                        'highest-starred' : '',
                        'public-repos' : '',
                        'perfect-repos' : 0,
                        'followers' : '',
                        'following' : '' 
                   

        },
        second : {
           
                        'username': '',
                        'full-name' : '',
                        'location' : '',
                        'email' : '',
                        'bio' : '',
                        'avatar-url' : '',
                        'titles' : 'None',
                        'total-stars' : '',
                        'highest-starred' : '',
                        'public-repos' : '',
                        'perfect-repos' : 0,
                        'followers' : '',
                        'following' : '' 
                    
                    
        }
    });
    const [errorState, updateError] = useState(undefined)
    const [apiRequestState, updateApiRequestState] = useState(false)
    let usernames = props.usernames
    let pageState = props.page

   
    
    useEffect(() => {
            let userRequestUrl = 'http://localhost:3001/api'
            if (pageState === 'inspect') {
                userRequestUrl += ('/user/' + usernames)   
            }
            else {
                userRequestUrl += ('/users?username=' + usernames[0] + '&username=' + usernames[1])
            }
            fetch(userRequestUrl)
            .then(response => response.json()) 
                .then(data => {
                    if (pageState === 'inspect') {
                        setUsers({...usersState, first: data})
                    }
                    else {
                        setUsers({first: data[0], second: data[1]})

                    }
                    updateApiRequestState(true)
                    
                })
                .catch(err => {updateError(err)})
            
    }, [usernames])
    console.log(usersState)
    function duel(duelerLeft, duelerRight) {
        let leftTotal = 0;
        let rightTotal = 0;
      
        if (duelerLeft["total-stars"] > duelerRight["total-stars"]) {
          leftTotal += 1
        }
        else if (duelerLeft["total-stars"] === duelerRight["total-stars"]) {
          leftTotal += 1;
          rightTotal += 1;
        }
        else {
          rightTotal += 1;
        }
        
        if (duelerLeft["highest-starred"] > duelerRight["highest-starred"]) {
          leftTotal += 1
        }
        else if (duelerLeft["highest-starred"] === duelerRight["highest-starred"]) {
          leftTotal += 1;
          rightTotal += 1;
        }
        else {
          rightTotal += 1;
        }
      
        if (duelerLeft["public-repos"] > duelerRight["public-repos"]) {
          leftTotal += 1
        }
        else if (duelerLeft["public-repos"] === duelerRight["public-repos"]) {
          leftTotal += 1;
          rightTotal += 1;
        }
        else {
          rightTotal += 1;
        }
      
        if (duelerLeft["perfect-repo"] > duelerRight["perfect-repo"]) {
          leftTotal += 1
        }
        else if (duelerLeft["perfect-repo"] === duelerRight["perfect-repo"]) {
          leftTotal += 1;
          rightTotal += 1;
        }
        else {
          rightTotal += 1;
        }
      
        if (duelerLeft.followers > duelerRight.followers) {
          leftTotal += 1
        }
        else if (duelerLeft.followers === duelerRight.followers) {
          leftTotal += 1;
          rightTotal += 1;
        }
        else {
          rightTotal += 1;
        }
      
        if (leftTotal > rightTotal) {
          return duelerLeft
        }
        else if (leftTotal === rightTotal) {
          return "Tie"
        }
        else {
          return duelerRight
        }
      }

    let inspectResults = <div></div>
    let duelSecondUser = <div></div>
    let duelWinnerResults = <div></div>
    
    let winner
    let winnerDisplay
    if (pageState === "duel") {
        winner = duel(usersState.first, usersState.second)
        if (winner === "Tie") {
            winnerDisplay = "Tie"
        }
        else {
            winnerDisplay = "WINNER: " + winner.username + "!"
        }
    }

    if (apiRequestState) {
        duelWinnerResults =   <section className={classes.duelResults}>
                                    <span className={classes.vs}>{usersState.first.username} VS {usersState.second.username}</span>
                                    <span className={classes.winner}>{winnerDisplay}</span>
                                </section>

        duelSecondUser =  <section className="userResults">
                                <span className={classes.username}>{usersState.second.username}</span>
                                <span className="fullName">{usersState.second.name}</span>
                                <span className="location">{usersState.second.location}</span>
                                <span className="email">{usersState.second.email}</span>
                                <span className="bio">{usersState.second.bio}</span>
                                <img className="avatar" src={usersState.second["avatar-url"]} alt="avatar" />
                                <div className={classes.stats}>
                                    <div className={classes.stat}>
                                            <span className={classes.label}>Titles:&nbsp;</span>
                                            <span className={classes.value}>{usersState.second["titles"]}</span>
                                    </div>
                                    <div className={classes.stat}>
                                        <span className={classes.label}>Favorite language:&nbsp;</span>
                                        <span className={classes.value}>{usersState.second["favorite-language"]}</span>
                                    </div>
                                    <div className={classes.stat}>
                                        <span className={classes.label}>Total stars:&nbsp;</span>
                                        <span className={classes.value}>{usersState.second["total-stars"]}</span>
                                    </div>
                                    <div className={classes.stat}>
                                        <span className={classes.label}>Highest star count:&nbsp;</span>
                                        <span className={classes.value}>{usersState.second["highest-starred"]}</span>
                                    </div>
                                    <div className={classes.stat}>
                                        <span className={classes.label}>Public repos:&nbsp;</span>
                                        <span className={classes.value}>{usersState.second["public-repos"]}</span>
                                    </div>
                                    <div className={classes.stat}>
                                        <span className={classes.label}>'Perfect' Repos:&nbsp;</span>
                                        <span className={classes.value}>{usersState.second["perfect-repo"]}</span>
                                    </div>
                                    <div className={classes.stat}>
                                        <span className={classes.label}>Followers:&nbsp;</span>
                                        <span className={classes.value}>{usersState.second.followers}</span>
                                    </div>
                                    <div className={classes.stat}>
                                        <span className={classes.label}>Following:&nbsp;</span>
                                        <span className={classes.value}>{usersState.second.following}</span>
                                    </div>
                                </div>
                            </section>

    inspectResults = <section className="userResults">
                            <span className={classes.username}>{usersState.first.username}</span>
                            <span className="fullName">{usersState.first.name}</span>
                            <span className="location">{usersState.first.location}</span>
                            <span className="email">{usersState.first.email}</span>
                            <span className="bio">{usersState.first.bio}</span>
                            <img className="avatar" src={usersState.first["avatar-url"]} alt="avatar" />
                            <div className={classes.stats}>
                                <div className={classes.stat}>
                                    <span className={classes.label}>Titles:&nbsp;</span>
                                    <span className={classes.value}>{usersState.first["titles"]}</span>
                                </div>
                                <div className={classes.stat}>
                                    <span className={classes.label}>Favorite language:&nbsp;</span>
                                    <span className={classes.value}>{usersState.first["favorite-language"]}</span>
                                </div>
                                <div className={classes.stat}>
                                    <span className={classes.label}>Total stars:&nbsp;</span>
                                    <span className={classes.value}>{usersState.first["total-stars"]}</span>
                                </div>
                                <div className={classes.stat}>
                                    <span className={classes.label}>Highest star count:&nbsp;</span>
                                    <span className={classes.value}>{usersState.first["highest-starred"]}</span>
                                </div>
                                <div className={classes.stat}>
                                    <span className={classes.label}>Public repos:&nbsp;</span>
                                    <span className={classes.value}>{usersState.first["public-repos"]}</span>
                                </div>
                                <div className={classes.stat}>
                                    <span className={classes.label}>'Perfect' Repos:&nbsp;</span>
                                    <span className={classes.value}>{usersState.first["perfect-repo"]}</span>
                                </div>
                                <div className={classes.stat}>
                                    <span className={classes.label}>Followers:&nbsp;</span>
                                    <span className={classes.value}>{usersState.first.followers}</span>
                                </div>
                                <div className={classes.stat}>
                                    <span className={classes.label}>Following:&nbsp;</span>
                                    <span className={classes.value}>{usersState.first.following}</span>
                                </div>
                            </div>
                        </section>

 
    }
    

    if (errorState !== undefined) {
        inspectResults =    <section className="userError">
                                <span className="error">{errorState}</span>
                            </section>
    }

    if (pageState === 'inspect') {
        return (
           
                inspectResults
        
            
        )
    }
    else {
        return (
            <section className= {classes.duelContainer}>
                {inspectResults}
                {duelSecondUser}
                {duelWinnerResults}
            </section>
        )
    }

}



export default UserProfile;