import { updateBank, updatePArray } from './stateSlice';
import { useDispatch } from 'react-redux';
import './pot.css';
function Pot(props) {
    let dispatch = useDispatch();

    let bank = props.bank;
    let pot = props.pot;
    let pArray = props.pArray;
    let chip = pArray[pArray.length - 1];
    let width = 82.5;
    let height = 75;
    function remove() {
        dispatch(updateBank({ bank: bank + chip, pot: pot - chip }));
        dispatch(updatePArray(pArray.slice(0, -1)));
    }
    return (
        <>
            <div className="pot-title col-6">
                Pot: ${pot}
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