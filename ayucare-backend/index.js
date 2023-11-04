import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MedicineModel from './models/medicine.js';
// import array from './array.js';
// import pharma from './pharmaco.js';
// //import postRoutes from './routes/posts.js';
// //import userRoutes from './routes/user.js';
import PharmaPropModel from './models/pharmaProp.js';

const app = express();  // this we do everytime
dotenv.config();  // this we do everytime
// const uploadMedicine = async (medicine) => {
//     try {

//         const newMedicine = new MedicineModel(medicine);
//         await newMedicine.save();
//         console.log('Medicine saved:', newMedicine);

//     } catch (error) {
//       console.error('Error uploading medicines:', error);
//     }
//   }
//   const uploadPharma = async (PharmaProp) => {
//     try {

//         const newpharma = new PharmaPropModel(PharmaProp);
//         await newpharma.save();
//         console.log('Pharma saved:', newpharma);

//     } catch (error) {
//       console.error('Error uploading Pharma:', error);
//     }
//   }

// const getMedicines = async (indications) =>{
//   MedicineModel.find({
//       $or: [
//         { 'Indications': { $in: indications } },
//         { 'IndicationsCommonName': { $in: indications } }
//       ]
//     }).toArray(function(err, docs) {
//       if (err) {
//         console.error('Error querying the database:', err);
//       } else {
//         // Process the matching documents in the 'docs' array
//         console.log('Matching documents:', docs);
//       }
// })}

// const getMedicines = async (indications) => {
//   try {
//     const docs = await MedicineModel.find({
//       $or: [
//         { 'Indications': { $in: indications } },
//         { 'IndicationsCommonName': { $in: indications } }
//       ]
//     }).exec();

//     // Process the matching documents in the 'docs' array
//     console.log('Matching documents:', docs);
//   } catch (err) {
//     console.error('Error querying the database:', err);
//   }
// }



 const getPharmacologicalProperties = async (name) => {
  
  try {
    // Find the medicine by name in the database
    const medicine = await PharmaPropModel.findOne({ Name: name });

    if (!medicine) {
      // If the medicine with the given name is not found, return a response indicating that it was not found.
     console.log("not found")
    }

    const properties = [];
    let v = medicine.Properties;
    let count = 0
    // Extract the properties using bracket notation to handle special characters in keys
    for (const key in v ) {
      if(count > 4)break;
      count++;
      properties.push(v[key])
    }
     
    // Return the properties as a response
   console.log(properties)
  } catch (error) {
    // Handle any errors that may occur during the database query
    console.error('Error fetching pharmacological properties:', error);
   
  }
};


app.use(bodyParser.json({ limit: '30mb', extended: true }));  // images
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));  // to accept the data
app.use(cors());  // to allow cross-origin resource sharing

//app.use('/posts', postRoutes);  // every route in postRoutes will start with /posts - this is a middleware - should be after cors always
//app.use('/user', userRoutes);  // every route in userRoutes will start with /user - this is a middleware - should be after cors always




const CONNECTION_URL = process.env.CONNECTION_URL;  // GOT THIS URL FROM MONGODB ATLAS - CLUSTER - CONNECT - CONNECT YOUR APPLICATION
const PORT = process.env.PORT || 5000;  // process.env.PORT is for heroku
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })  // connecting to the database, second parameter is to avoid warnings
  .then(() => app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
    // for(const p of pharma)
    // {
    //    uploadPharma(p)
    // }
    // getMedicines([ 'Heart Diseases','Prameha' ])
    getPharmacologicalProperties("Lohasava")
  }))  // if connection is successful, then start the server
  .catch((error) => console.log(error.message));  // if connection is not successful, then log the error