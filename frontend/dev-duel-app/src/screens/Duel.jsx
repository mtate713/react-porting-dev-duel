import {useState} from 'react'

import DevForm from '../components/DevForm';
import UserProfile from '../components/UserProfile';
import classes from './Screen.module.css'

const Duel = () => {
    const [formState, updateForm] = useState({
        firstUsername : '',
        secondUsername : '',
        submitted : false
    })

    const [usersState, setUsers] = useState({
        duelLeft : undefined,
        duelRight : undefined
    })
    

    let duelPage = undefined
    if (formState.submitted) {
        setUsers({duelLeft: formState.firstUsername, duelRight: formState.secondUsername})
        updateForm({...formState, submitted: false})
        
    }

    
    if (usersState.duelLeft !== undefined  && usersState.duelRight !== undefined ) {
        let usernames = []
        usernames.push(usersState.duelLeft)
        usernames.push(usersState.duelRight)
        duelPage = <UserProfile page='duel' usernames={usernames}/>
     
    }

    
    

    return (
        <main>
             <span className = {classes.pageTitle}>Duel!</span>
             <hr />
             <DevForm page='duel' state={formState} update={updateForm}/>
             {duelPage}

        </main>

    );
}

export default Duel;