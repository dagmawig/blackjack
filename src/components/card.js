function Card(props) {
    let id = props.card.value + props.card.suit;
    let faceUp = props.card.faceUp;
    //console.log(id)

    return (faceUp)? (
        <img alt='card' width={61.5} height={87.8} src={"/images/"+id+".png"}></img>
    ) : (
        <img alt='card' width={61.5} height={87.8} src={"/images/back.png"}></img>
    );
};

export default Card;