const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.db3"
  }
};

const db = knex(knexConfig);

router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: "Cohort id not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id/students", async (req, res) => {
  try {
    const students = await db("students").where({ cohort_id: req.params.id });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong with the server" });
  }
});

router.post("/", (req, res) => {
  db("cohorts")
    .insert(req.body)
    .then(cohort => {
      const [id] = cohort;

      db("cohorts")
        .where({ id })
        .first()
        .then(role => {
          res.status(200).json(role);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        db("cohorts")
          .where({ id: req.params.id })
          .first()
          .then(role => {
            res.status(200).json(role);
          });
      } else {
        res.status(404).json({ message: "Cohort id not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Cohort id not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
