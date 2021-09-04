import { updateBank, updatePot, updatePArray } from './stateSlice';
import { useDispatch } from 'react-redux';
import './bank.css';

export let getArray = (money) =>{

    let hundreds = Math.floor(money / 100);
    money -= hundreds * 100;
    let fiftys = Math.floor(money / 50);
    money -= fiftys * 50;
    let twentyfives = Math.floor(money / 25);
    money -= twentyfives * 25;
    let fives = Math.floor(money / 5);
    money -= fives * 5;
    let ones = money;

    let mArray = [];
    let chips = [hundreds, fiftys, twentyfives, fives, ones];
    let value = [100, 50, 25, 5, 1];

    for (let i = 0; i < chips.length; i++) {
        for (let j = 0; j < chips[i]; j++) {
            mArray.push(value[i]);
        }
    }

    return mArray;
}

function Bank(props) {
    let dispatch = useDispatch();

    let bank = props.bank;
    let pot = props.pot;
    let pArray = props.pArray;
    let width = 82.5;
    let height = 75;
    

    function bet(e) {
        let betMoney = parseInt(e.currentTarget.value);
        dispatch(updateBank(bank - betMoney));
        dispatch(updatePot(pot + betMoney))
        dispatch(updatePArray([...pArray, betMoney]))
    }
    function allIn() {
        dispatch(updateBank(0));
        dispatch(updatePot(pot + bank))
        dispatch(updatePArray(getArray(pot + bank)));
    }
    function clearBet() {
        dispatch(updateBank(bank + pot));
        dispatch(updatePot(0));
        dispatch(updatePArray([]));
    }

    return (
        <>
            <div className="bank-total col-4">
                <div className="bank-total-text">
                    <b>Bank:</b> ${bank}
                </div>
                <div className="bank-all-in">
                    {(bank > 0) ? (<button className="all-in-button btn btn-success" onClick={allIn}>
                        ALL IN
                    </button>) : (<button className="all-in-button btn btn-success" onClick={clearBet}>
                        CLEAR BET
                    </button>)}
                </div>
            </div>
            {(bank > 0) ? (<div className="bank-chip col-3">
                <input type="image" src={"/images/1.png"} width={width} height={height} value={1} onClick={bet} className="chip btn"></input>
            </div>) : null}
            {(bank >= 5) ? (<div className="bank-chip col-3">
                <input type="image" src={"/images/5.png"} width={width} height={height} value={5} onClick={bet} className="chip btn"></input>
            </div>) : null}
            {(bank >= 25) ? (<div className="bank-chip col-3">
                <input type="image" src={"/images/25.png"} width={width} height={height} value={25} onClick={bet} className="chip btn"></input>
            </div>) : null}
            {(bank >= 50) ? (<div className="bank-chip col-3">
                <input type="image" src={"/images/50.png"} width={width} height={height} value={50} onClick={bet} className="chip btn"></input>
            </div>) : null}
            {(bank >= 100) ? (<div className="bank-chip col-3">
                <input type="image" src={"/images/100.png"} width={width} height={height} value={100} onClick={bet} className="chip-1 btn"></input>
            </div>) : null}
        </>
    )
};

export default Bank;
