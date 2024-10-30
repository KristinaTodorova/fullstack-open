const Header = (props) => {
  console.log(props)
  return(
  <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  console.log(props)
  return(
    <div>
    <PartOne p={props.parts[0].name} ex={props.parts[0].exercises}/>
    <PartTwo p={props.parts[1].name} ex={props.parts[1].exercises}/>
    <PartThree p={props.parts[2].name} ex={props.parts[2].exercises}/>
    </div>
  )
}

const PartOne = (props) => {
  return(
    <p>{props.p}:{props.ex} </p>
  )
}

const PartTwo = (props) => {
  return(
    <p>{props.p}:{props.ex} </p>
  )
}

const PartThree = (props) => {
  return(
    <p>{props.p}:{props.ex} </p>
  )
}

const Total = (props) => {
  return(
  <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content 
      parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App