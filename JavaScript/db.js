 // db.js //mongodb+srv://*****************
 const mongoose = require('mongoose');
 const express = require('express');
 const app = express();
 
 const uri = '**************';
 
 const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true
 };
 
 mongoose.connect(uri, options).then(
   () => { console.log('Connected to Mongo'); },
   err => { console.error('Error connecting to Mongo: ' + err); }
 );
 
 const RequestSchema = new mongoose.Schema({
   names: [String],
   createdAt: { type: Date, default: Date.now }
 });
 
 const UserSchema = new mongoose.Schema({
   username: String,
   requests: [RequestSchema]
 });
 
 const User = mongoose.model('User', UserSchema);
 
 app.use(express.json());
 
 app.post('/requests', (req, res) => {
  const { username, names } = req.body;
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        user = new User({ username: username, requests: [] });
      }
      user.requests.push({ names: names });
      return user.save();
    })
    .then((savedUser) => {
      res.json(savedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving user');
    });
});

 app.get('/lastnames', (req, res) => {
  User.findOne()
    .sort({ createdAt: -1 })
    .select({ requests: { $slice: -1 } })
    .then((user) => {
      if (!user || user.requests.length === 0) {
        res.status(404).json({ error: 'No data found' });
      } else {
        const names = user.requests[0].names.slice(-3);
        res.json({ names });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data');
    });
});


app.get('/lastSearches', (req, res) => {
  const username = req.query.username;
  User.findOne({ username: username })
    .then(user => {
      if (user) {
        res.json({ names: user.requests.map(request => request.names).flat() });
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data');
    });
});

app.delete('/deleteName', (req, res) => {
  const { username, name } = req.body;
  User.findOne({ username: username })
    .then(user => {
      if (user) {
        user.requests.forEach(request => {
          request.names = request.names.filter(n => n !== name);
        });
        user.requests = user.requests.filter(request => request.names.length > 0);
        user.save()
          .then(() => res.status(200).send('Name deleted'))
          .catch(err => {
            console.error(err);
            res.status(500).send('Error saving user');
          });
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error finding user');
    });
});


 app.use(express.static('./HTML'));
 app.use('/css', express.static('./CSS'));
 app.use('/assets', express.static('./Assets')); 
 app.use('/js', express.static('./JavaScript'));
 
 const PORT = process.env.PORT || 5001;
 
//  app.listen(PORT, () => {
//    console.log(`Server is running on port ${PORT}`);
//  });

 app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
