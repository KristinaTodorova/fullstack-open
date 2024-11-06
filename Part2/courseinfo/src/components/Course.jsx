const Course = ({course}) => {

    const total = course.parts.reduce((sum, parts) => sum+parts.exercises,0)

    
    return(
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <p>total of {total} exercises</p>

        </div>
        )
}

const Header = (props) => {
    return(
        <h1 key={props.id}>
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