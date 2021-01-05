import {useState} from 'react'

import DevForm from '../components/DevForm';
import UserProfile from '../components/UserProfile';
import classes from './Screen.module.css'

const Inspect = () => {
    const [formState, updateForm] = useState({
        firstUsername : '', 
        submitted : false,
    })

    const [userState, setUser] = useState(undefined)

    let inspectPage = undefined
    if (formState.submitted) {
        setUser(formState.firstUsername)
        updateForm({...formState, submitted: false})
        
    }
    

    if (userState !== undefined) {
        inspectPage = <UserProfile page='inspect' usernames={userState}/>
     
    }
 
    

    return (
        <main>
             <span className = {classes.pageTitle}>Inspect</span>
             <hr />
             <DevForm page='inspect' state={formState} update={updateForm}/>
             {inspectPage}

        </main>

    );
}

export default Inspect;