const Course = ({courses}) => {
    return(
        <div>
            <h1>Web development curriculum</h1>
            {courses.map((course) => (
                        <div key={course.id}>
                        <Header name={course.name}/>
                        <Content parts={course.parts}/>
                        <h4>total of {course.parts.reduce((sum, parts) => sum+parts.exercises,0)} exercises</h4>
                        </div>
            ))}
        </div>
    )
    }

const Header = (props) => {
    return(
        <h3 key={props.id}>
            {props.name}
        </h3>
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