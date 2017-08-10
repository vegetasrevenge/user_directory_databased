const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');



const userSchema = new Schema ({
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  email: {
    type: String
  },
  university: {
    type: String
  },
  job: {
    type: String
  },
  company: {
    type: String
  },
  skills: {
    type: Array
  },
  phone: {
    type: String
  },
  address: {
    type: {
      street_num: String,
      street_name: String,
      city: String,
      state_or_province: String,
      postal_code: String,
      country: String,
    }
  }
});

userSchema.virtual('password')
  .get(function() { return null })
  .set(function(value) {
    const hash = bcrypt.hashSync(value, 10);
    this.passwordHash = hash;
  });

userSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

userSchema.statics.authenticate = function(username, password, done) {
  this.findOne({ username: username }, function(err, user) {
    if (err) {
      console.log('error attempting to use static authenticate function', err);
      done(err);
    }
    else if (user && user.authenticate(password)) {
    done(null, user);
    }
    else {
    done(null, false);
    }
  });
}

module.exports =
  mongoose.model('user', userSchema);
