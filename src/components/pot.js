import './pot.css';
function Pot(props) {

    let pot = props.pot;
    let pArray = props.pArray;
    let chip = pArray[pArray.length - 1];
    let width = 82.5;
    let height = 75;
    let remove = props.remove;
    
    return (
        <>
            <div className="pot-title col-6">
                <b>Pot:</b> ${pot}
            </div>
            {(pArray.length) ? (<div className="pot-chip col-6">
                <input type="image" src={"/images/" + chip + ".png"} width={width} height={height} value={chip} onClick={remove} className="chip btn"></input>
            </div>) : <div className="col-6">
                <div className="empty-pot" style={{color: "white"}}> YOUR POT <br/>HERE</div>
            </div>}
        </>
    )
};

export default Pot;