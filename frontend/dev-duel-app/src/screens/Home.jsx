
import {useHistory} from 'react-router-dom'
import classes from './Screen.module.css'

const Home = () => {   

    const history = useHistory()

    function routeChange(link) { 
        let path = link; 
        history.push(path);
    }


    return (
        <main>
             <span className = {classes.pageTitle}>Dev-Duel!</span>
             <hr />
             <section className={classes.index}>
                        <div className={classes.linkContainer}>
                            <span>Judge someone's competence</span>
                            <button className={classes.devDuelButton} onClick={event => routeChange('inspect')}>inspect</button>
                        </div>
                        <div className={classes.linkContainer}>
                            <span>Ultimate test of developer egos</span>
                            <button className={classes.devDuelButton} onClick={event => routeChange('duel')}>duel</button>
                        </div>
             </section>
            
        </main>
        
    );

}


export default Home;