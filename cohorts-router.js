const router = require('express').Router()
const knex = require('knex')

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.db3'
  },
  debug: true,
}

const db = knex(knexConfig)

router.post('/', (req, res) => {
  if(!req.body.name) {
    res.status(400).json({ error: 'missing required field: name'})
  } else {
    db('cohorts').insert(req.body)
    .then(ids => {
      const id = ids[0]
      db('cohorts').where({ id: id }).first()
      .then(cohort => {
        res.status(201).json(cohort)
      })
    }).catch(err => res.status(500).json(err))
  }
})

router.get('/', (req, res) => {
  db('cohorts').then(cohorts => {
    res.status(200).json(cohorts)
  }).catch(err => {
    res.status(500).json(err)
  })
})

router.get('/:id', (req, res) => {
  const cohortId = req.params.id
  db('cohorts').where({ id: cohortId })
  .first()
  .then(cohort => {
    res.status(200).json(cohort)
  }).catch(err => {
    res.status(500).json(err)
  })
})

router.put('/:id', (req, res) => {
  db('cohorts').where({ id: req.params.id })
  .update(req.body)
  .then(cohort => {
    if(cohort) {
      res.status(200).json(cohort)
    } else {
      res.status(400).json({ message: 'Cohort not found' })
    }
  }).catch(err => res.status(500).json(err))
})

router.delete('/:id', (req, res) => {
  db('cohorts').where({ id: req.params.id })
  .del()
  .then(cohort => {
    if(cohort) {
      res.status(204).json(cohort)
    } else {
      res.status(404).json({ message: 'Cohort cannot be deleted' })
    }
  }).catch(err => res.status(500).json(err))
})

module.exports = router
