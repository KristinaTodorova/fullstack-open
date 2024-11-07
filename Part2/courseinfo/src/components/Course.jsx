import Header from "./Header"
import Content from "./Content"

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

export default Course