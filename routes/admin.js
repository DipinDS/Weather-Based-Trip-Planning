var express = require('express');
var router = express.Router();
const fs = require('fs')
const productHelper = require('../helpers/product-helpers')
const verifyLogin = (req, res, next) => {
  if (req.session.login) {
    next()
  } else {
    res.redirect('/admin')
  }
}
router.post('/login', (req, res) => {
  productHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.login = true
      req.session.admin = response.admin
      // productHelper.getAllProducts().then((places) => {

      res.redirect('/admin/all-locations')
      // })
      // res.render('admin/view-locations')
    } else {
      req.session.loginErr = true
      res.redirect('/login')
    }
  })
})
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})
router.get('/view-users', (req, res) => {
  productHelper.getAllUsers().then((users) => {
  res.render('admin/view-users', { users: users, admin : true })
  })
})

/* GET users listing. */
router.get('/all-locations', function (req, res, next) {
  productHelper.getAllProducts().then((places) => {

    res.render('admin/view-locations', { places, admin: true })
  })
});

router.get('/', (req, res, next) => {
  res.render('admin/login', { admin: true })
})

router.get('/add-location', verifyLogin, (req, res) => {
  res.render('admin/add-location', { activityType: ['Clear', 'Rainy', 'Windy'] })
});

router.post('/add-location', (req, res) => {
  const imageFields = ['Image', 'ClearImage1', 'ClearImage2', 'ClearImage3', 'RainyImage1', 'RainyImage2', 'RainyImage3', 'WindyImage1', 'WindyImage2', 'WindyImage3'];
console.log(req.body);
  productHelper.addProduct(req.body, (id, error) => {
    if (error) {
      console.error('Error adding product:', error);
      // Handle the error (e.g., send an error response)
      res.status(500).send('Internal Server Error');
    } else {
      const folderPath = `./public/location-images/Locations/${id}`;

      // Create the folder if it doesn't exist
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      imageFields.forEach((fieldName) => {
        let image = req.files[fieldName];
        if (image) {
          image.mv(`${folderPath}/${id}_${fieldName}.jpg`, (err) => {
            // image.mv(`${folderPath}/${id}_${fieldName}.jpg`, (err) => {
            if (err) {
              console.log(err);
              // Handle the error (e.g., log it or send an error response)
            }
          });
        }
      });

      res.redirect('/admin/add-location');
    }
  });
});



router.get('/delete-location', async (req, res) => {
  try {
    let locationId = req.query.id
    const folderPath = `./public/location-images/Locations/${locationId}`;

    // Check if the directory exists before attempting to delete
    if (fs.existsSync(folderPath)) {
      fs.rmdirSync(folderPath, { recursive: true });
    }

    await productHelper.deleteLocation(locationId);
    res.redirect('/admin/all-locations');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/edit-location', async (req, res) => {
  let locationId = req.query.id
  let location = await productHelper.getProduct(locationId)
  console.log('getProduct');
  console.log(location);
  console.log('getProduct');
  res.render('admin/edit-location', { location, activityType: ['Clear', 'Rainy', 'Windy'] })
})

router.post('/edit-location', (req, res) => {
  let locationId = req.query.id;

  productHelper.updateLocation(locationId, req.body)
    .then(() => {
      const imageFields = ['Image', 'ClearImage1', 'ClearImage2', 'ClearImage3', 'RainyImage1', 'RainyImage2', 'RainyImage3', 'WindyImage1', 'WindyImage2', 'WindyImage3'];
      // const folderPath = `./public/test-images/${locationId}`;
      const folderPath = `./public/location-images/Locations/${locationId}`;


      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      for (const fieldName of imageFields) {
        if (req.files && req.files[fieldName]) {
          let img = req.files[fieldName];
          if (img) {
            img.mv(`${folderPath}/${locationId}_${fieldName}.jpg`, (err) => {
              if (err) {
                console.log(err);
              }
            });
          }
        }
      }

      res.redirect('/admin/all-locations');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/view-feedback', verifyLogin, (req, res) => {
  productHelper.getAllFeedbacks().then((feedbacks) => {
    console.log(feedbacks);
    res.render('admin/view-feedback', { feedbacks, admin: true })
  })
});

router.get('/view-suggestion', verifyLogin, (req, res) => {
  productHelper.getAllSuggestions().then((suggestions) => {
    console.log(suggestions);
    res.render('admin/view-suggestion', { suggestions, admin: true })
  })
});

module.exports = router;
