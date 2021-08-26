import { updateBank, updatePArray } from './stateSlice';
import { useDispatch } from 'react-redux';

function Pot(props) {
    let dispatch = useDispatch();

    let bank = props.bank;
    let pot = props.pot;
    let pArray = props.pArray;
    let chip = pArray[pArray.length-1];

    function remove() {
        dispatch(updateBank({bank: bank+chip, pot: pot-chip}));
        dispatch(updatePArray(pArray.slice(0,-1)));
    }
    return (
        <div className="pot row">
            <div className="pot-top col-12">
                Pot: ${pot}
            </div>
           {(pArray.length)?( <div className="pot-chip col-12">
                <input type="image" src={"/images/"+chip+".png"} width={110} height={100} value={chip} onClick={remove} className="chip btn"></input>
            </div>) : <div className="pot-chip col-12">
                <div type="image"  width={110} height={100}  className="chip btn"> YOUR POT</div>
            </div>}
        </div>
    )
};

export default Pot;