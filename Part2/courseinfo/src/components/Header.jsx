const Header = (props) => {
    return(
        <h3 key={props.id}>
            {props.name}
        </h3>
    )
}

export default Header