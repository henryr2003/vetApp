
import "../styles/checkPet.css"

function CheckPet({currentSelectedPet, toggleCheck, isCheckOpen}){

    return (


        <>
            {isCheckOpen && 
            <div className={`checkWindow ${isCheckOpen ? "open" : ""}`} >

                <div className="closeButton" onClick={toggleCheck}>

                    X
                </div>

                <div className="info">


                    <h2> Pet Tracker™ </h2>

                    <div className="progressBar">
                    
                        <div className="partProgress start selected">

                            <div className="text"> Checked In</div>

                        </div>

                        <div className={`partProgress ${currentSelectedPet.status != "Checked In" ? "selected" : ""}`}>
                            <div className="text"> In Surgery</div>

                        </div>

                        <div className={`partProgress end ${currentSelectedPet.status == "Ready" ? "selected" : ""}`}>

                            <div className="text"> Ready</div>

                            
                        </div>

                    
                    </div>

                    <div className="estTime">
                        <h3> Estimated Ready Time: </h3>    
            {}
                        <h3> {currentSelectedPet.estimate && (currentSelectedPet.estimate.split(":")[0] + ":" + currentSelectedPet.estimate.split(":")[1] + " " + currentSelectedPet.amPM)} </h3>
                    </div>

               

                    


                </div>

                


            </div>
}       
        </>
    )
}

export default CheckPet;