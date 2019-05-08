const router = require('express').Router();
const knex = require('knex');


const knexConfig = {
  client: 'sqlite3', 
  useNullAsDefault: true, 
  connection: {
    filename: './data/rolex.db3'
  }
}

const db = knex(knexConfig); 


router.get('/', (req, res) => {
 
  db('roles')
  .then(roles => {
    res.status(200).json(roles)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});



router.get('/:id', (req, res) => {

db('roles')
.where({id: req.params.id})
.then(role => {
  if(role) {
    res.status(200).json(role);

  }else {
    res.status(404).json({message: 'Role id not found'})
  }
})
.catch(error => {
  res.status(500).json(error);
})
});

router.post('/', (req, res) => {
  
  db('roles')
  .insert(req.body)
  .then(role => {
    const [id] = role;

    db('roles')
    .where({id})
    .first()
    .then(role => {
      res.status(200).json(role)
    })
  })
  .catch(error => {
    res.status(500).json(error)
  })
});



router.put('/:id', (req, res) => {

  db('roles')
  .where({id: req.params.id})
  .update(req.body)
  .then(count => {
    if(count > 0){ 
      db('roles')
      .where({id: req.params.id})
      .first()
      .then(role => {
        res.status(200).json(role)
      })
    }else{
      res.status(404).json({message: 'role id not found'})
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

router.delete('/:id', (req, res) => {

  db('roles')
  .where({id: req.params.id})
  .del()
  .then(count => {
    if(count > 0) {
      res.status(204).end();
    }else{
      res.status(404).json({message: 'role id not found'})
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

module.exports = router;