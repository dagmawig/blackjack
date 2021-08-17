function Card(props) {
    let id = props.card.value + props.card.suit;
    //console.log(id)
    return (
        <img alt='card' width={61.5} height={87.8} src={"/images/"+id+".png"}></img>
    );
};

export default Card;