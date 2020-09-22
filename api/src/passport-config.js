const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const {
  User,
  Order,
  Inter_Prod_Order
} = require('./db');


function initialize(passport) {

  const authenticateUser = async (req, email, password, done) => {

    const {
      idUser
    } = req.body

    const user = await User.findOne({
      where: {
        email: email
      }
    })

    ///////////////////////////////// In case the user doesnt exist
    if (user == null) {
      return done(null, false, {
        message: 'No user with that email'
      })
    }

    ///////////////////////////////// In case the user exist and test the password
    try {
      if (await bcrypt.compare(password, user.password)) {

        const orderUserLogin = await User.findOne({
          where: {
            email: email
          }
        }).then(user => {
          return Order.findOne({
            where: {
              idUser: user.idUser
            }
          })
        })

        const orderGuest = await Order.findOne({
          where: {
            idUser: idUser
          }
        })

        Order.findOne({
          where: {
            idUser: idUser
          }
        }).then(order => {
          return Inter_Prod_Order.findAll({
            where: {
              idOrder: order.idOrder
            }
          })
        }).then(inters => {
          inters.map(e => {
            return Inter_Prod_Order.create({
              ...e.dataValues,
              idOrder: orderUserLogin.idOrder
            })
          })
        }).then(() => {
          Inter_Prod_Order.destroy({
            where: {
              idOrder: orderGuest.idOrder
            }
          })
        }).then(() => {
          return User.destroy({
            where: {
              idUser: idUser
            }
          })
        }).catch()


        return done(null, user)
      } else {
        return done(null, false, {
          message: 'Password incorrect'
        })
      }
    } catch (e) {
      return done(e)
    }
  }

  const getUserId = async (id) => {
    await User.findOne({
      where: {
        idUser: id
      }
    })
  }





  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, authenticateUser))

  passport.serializeUser(function (user, done) {
    console.log('serializing user:', user);
    done(null, user.dataValues.idUser);
  });

  passport.deserializeUser(function (id, done) {
    console.log('deserializing user:')
    User.findOne({
      where: {
        idUser: id
      }
    }).then(user => {
      // console.log('thisUser', user.dataValues)
      done(null, user.dataValues);
    }).catch(done)
  });



  // passport.serializeUser(function (user, done) {
  //   console.log(user)
  //   done(null, user.idUser)
  // });

  // passport.deserializeUser(function(id, done) {
  //   User.findById(id).then(function(user) {
  //     console.log('deserializing user:',user);
  //     done(null, user);
  //   }).catch(function(err) {
  //     if (err) {
  //       throw err;
  //     }
  //  });
  // });

  // passport.deserializeUser(function (id, done) {
  //   done(null, getUserId(id));
  // });

}

module.exports = initialize