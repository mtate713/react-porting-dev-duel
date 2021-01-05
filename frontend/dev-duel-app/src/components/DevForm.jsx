import classes from './DevForm.module.css'
const DevForm = (props) => {

    let pageState = props.page
    const formState = props.state
    const updateForm = props.update

    const handleSubmit = event => {
        updateForm({...formState, submitted: true})
        event.preventDefault()
    }
    

    let duelSecondUser = <input placeholder='username' value={formState.secondUsername} onChange= {event => updateForm({...formState, secondUsername: event.target.value})}/>

    if (pageState !== 'duel') {
        duelSecondUser = undefined
    }

    return ( 
        <div>
            <section className="formContainer">
                <form onSubmit={handleSubmit}>
                    <div className={classes.inputContainer}>
                        <input placeholder='username' value={formState.firstUsername} onChange= {event => updateForm({...formState, firstUsername: event.target.value})}/>
                        {duelSecondUser}
                        
                    </div>
                    <button className= {classes.submitButton} type="submit">{pageState}</button>
                </form>
            </section>
        </div>
        
    )
    

}

export default DevForm;