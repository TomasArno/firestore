import * as express from "express";
import { fsDb } from "./db";

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`running server on port ${port}`);
});

const usersRef = fsDb.collection("users");

app.get("/users", (req, res) => {
  usersRef
    .get()
    .then((snap) => {
      const arr = [];
      if (snap.empty) {
        return "Nothing for here";
      } else {
        let docs = snap.docs;

        for (const doc of docs) {
          arr.push(doc.data());
        }
        return arr;
      }
    })
    .then((data) => {
      res.send(data);
    });
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const userDoc = usersRef.doc(userId);

  userDoc.get().then((snap) => {
    if (!snap.exists) {
      return "The document that you are looking for doesn´t exist";
    } else {
      return res.json(snap.data());
    }
  });
});

app.post("/users/:id", (req, res) => {
  const userId = req.params.id;
  const userDoc = usersRef.doc(userId);
  userDoc.create(req.body).then(() => {
    res.send(`user ID: ${userId} was succesfully attached`);
  });
});

app.patch("/users/:id", (req, res) => {
  req.body.updatedAt = new Date(); // Agrego data personalizada al request con informacion util para mi
  const userId = req.params.id;
  const userDoc = usersRef.doc(userId);

  userDoc.update(req.body).then(() => {
    res.send(`user ID: ${userId} was succesfully modified`);
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const userDoc = usersRef.doc(userId);

  userDoc.delete().then(() => {
    res.send(`user ID: ${userId} was succesfully deleted`);
  });
});
