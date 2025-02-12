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

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
    .then(personcount => {
      const addedDate = new Date()
      const addedTime = addedDate.toString()
      response.send(`<p>Phonebook has info for ${personcount} people.</p> <br/> ${addedTime}`)
    })
    .catch(error => next(error))
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

  Person.findByIdAndUpdate(request.params.id, person, {new: true, runValidators: true, context: 'query'})
  .then (updatedNote => {
    response.json(updatedNote)
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
  
    if (body.name === undefined) {
      return response.status(400).json({ error: 'name missing' })
    }

    if (body.number === undefined) {
      return response.status(400).json({ error: 'number missing' })
    }

    Person.findOne({name: body.name})
    .then(existingPerson => {
      if (existingPerson) {
        Person.findByIdAndUpdate(
          existingPerson._id,
          {number: body.number },
          {new: true, runValidators: true, context: 'query'}
      )
      .then(updatedPerson => response.json(updatedPerson))
      .catch(error => next(error));
      } 

      else{
        const person = new Person({
          name: body.name,
          number: body.number,
        });
        person.save()
        .then(savedPerson => {
          response.json(savedPerson)
        })
      .catch(error => next(error))
      }
    })
    .catch(error => next(error));
  })

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    else if (error.number === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    next(error)
  }
  
  app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})