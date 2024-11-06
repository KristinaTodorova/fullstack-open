const Course = ({course}) => {
    return(
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
        </div>
        )
}

const Header = (props) => {
    return(
        <h1>
            {props.name}
        </h1>
    )

}

const Content = (props) => {
    return (
        <div>
            <Part parts={props.parts}/>
        </div>
    )
}

const Part = (props) => {
    return (
       
            props.parts.map( (part) => 
                <div key={part.id}>
                    {part.name} {part.exercises}
                </div>
            )

    )
}

export default Course