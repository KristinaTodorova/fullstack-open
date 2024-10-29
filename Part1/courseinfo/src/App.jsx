const Header = (props) => {
  console.log(props)
  return(
  <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  console.log(props)
  return(
    <div>
    <PartOne p={props.part1.name} ex={props.part1.exercises}/>
    <PartTwo p={props.part2.name} ex={props.part2.exercises}/>
    <PartThree p={props.part3.name} ex={props.part3.exercises}/>
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
  <p>Number of exercises: {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content 
      part1={part1}
      part2={part2}
      part3={part3}/>
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/>
    </div>
  )
}

export default App