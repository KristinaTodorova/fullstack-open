require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
const Person = require('./models/person')

const app = express()

app.use(bodyparser.json());
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use(morgan('tiny'))

morgan.token('req-body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/info', (request, response) => {
    const personcount = persons.length
    const addedDate = new Date();
    const addedTime = addedDate.toString();
    response.send(`<p>Phonebook has info for ${personcount} people.</p> <br/> ${addedTime}`)
  })

  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
      response.json(note)
    })
  })

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {response.status(204).end()
    })
    .catch(error => next(error))
    })


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }
  
  Person.findByIdAndUpdate(request.params.id, person, {new: true})
  .then (updatedNote => {
    response.json(updatedNote)
  })

  .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    /* const nameExists = persons.map(person => person.name).some(name => name === body.name);
    if (nameExists) {
        return response.status(400).json({ 
            error: 'Name must be unique' 
        });
    } */
  
    if (body.name === undefined) {
      return response.status(400).json({ error: 'name missing' })
    }

    if (body.number === undefined) {
      return response.status(400).json({ error: 'number missing' })
    }
  
    const person = new Person({
      name: body.name,
      number: body.number,
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})