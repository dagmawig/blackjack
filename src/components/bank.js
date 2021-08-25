import { updateBank } from './stateSlice';
import { useDispatch } from 'react-redux';

function Bank(props) {
    let dispatch = useDispatch();

    let bank = props.bank;
    let pot = props.pot;

    function bet(e) {
        let betMoney = parseInt(e.currentTarget.value);
        dispatch(updateBank({bank: bank-betMoney, pot: pot+betMoney}));
    }
    function allIn() {
        dispatch(updateBank({bank: 0, pot: pot+bank}));
    }
    function clearBet() {
        dispatch(updateBank({bank: bank+pot, pot: 0}));
    }
    return (
        <div className="bank">
            <div className="bank-top row">
                <div className="bank-total col-4">
                    <div className="bank-total-text">
                        Bank: ${bank}
                    </div>
                    <div className="bank-all-in">
                        {(bank>0)?(<button className="all-in-button btn btn-success" onClick={allIn}>
                            ALL IN
                        </button>) : (<button className="all-in-button btn btn-success" onClick={clearBet}>
                            CLEAR BET
                        </button>)}
                    </div>
                </div>
                {(bank>0)? (<div className="bank-chip col-4">
                    <input type="image" src={"/images/1.png"} width={110} height={100} value={1} onClick={bet} className="chip btn"></input>
                </div>) : null}
                {(bank>=5)? (<div className="bank-chip col-4">
                    <input type="image" src={"/images/5.png"} width={110} height={100} value={5} onClick={bet} className="chip btn"></input>
                </div>) : null}
                {(bank>=25)? (<div className="bank-chip col-4">
                    <input type="image" src={"/images/25.png"} width={110} height={100} value={25} onClick={bet} className="chip btn"></input>
                </div>) : null}
                {(bank>=50)? (<div className="bank-chip col-4">
                    <input type="image" src={"/images/50.png"} width={110} height={100} value={50} onClick={bet} className="chip btn"></input>
                </div>) : null}
                {(bank>=100)? (<div className="bank-chip col-4">
                    <input type="image" src={"/images/100.png"} width={110} height={100} value={100} onClick={bet} className="chip-1 btn"></input>
                </div>) : null}
            </div>
        </div>
    )
};

export default Bank;