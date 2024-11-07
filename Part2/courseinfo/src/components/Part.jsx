const Part = (props) => {
    return (
            props.parts.map( (part) => 
                <div key={part.id}>
                    {part.name} {part.exercises}
                </div>
            )
    )
}

export default Part