const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express()

app.use(express.json());
app.use(bodyparser.json());
app.use(cors());
app.use(express.static('dist'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(morgan('tiny'))

morgan.token('req-body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
    const personcount = persons.length
    const addedDate = new Date();
    const addedTime = addedDate.toString();
    response.send(`<p>Phonebook has info for ${personcount} people.</p> <br/> ${addedTime}`)
  })

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } 
    
    else {
        response.status(404).end()
      }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

const generateId = () => {
    const newId = persons.length > 0
      ? Math.floor(Math.random() * 1500)
      : 0
    return String(newId)
  }
  

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'Name is missing' 
      })
    }

    
    const nameExists = persons.map(person => person.name).some(name => name === body.name);
    if (nameExists) {
        return response.status(400).json({ 
            error: 'Name must be unique' 
        });
    }

    if (!body.number) {
        return response.status(400).json({ 
          error: 'Number is missing' 
        })
      }
  
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})