import MedicineModel from "../models/medicine";
import PharmaPropModel from "../models/pharmaProp";

export const getMedicines = async (req, res) => {
    try {
        const docs = await MedicineModel.find({
            $or: [
                { 'Indications': { $in: req.body } },
                { 'IndicationsCommonName': { $in: req.body } }
            ]
        }).exec();

        // Process the matching documents in the 'docs' array
        console.log('Matching documents:', docs);
        return res.status(201).json(docs)
    } catch (err) {
        console.error('Error querying the database:', err);
        return res.status(404).json(err)
    }
}

export const getPharmacologicalProperties = async (req,res) => {
    const {name} = req.query
    try {
      // Find the medicine by name in the database
      const medicine = await PharmaPropModel.findOne({ Name: name });
  
      if (!medicine) {
        // If the medicine with the given name is not found, return a response indicating that it was not found.
        return res.status(404).json({ message: 'Pharmacological properties not found' });      }
  
      const properties = [];
     
      let count = 0
      // Extract the properties using bracket notation to handle special characters in keys
      for (const key in  medicine.Properties ) {
        if(count > 4)break;
        count++;
        properties.push( medicine.Properties[key])
      }
       res.status(200).json({properties})
    } catch (error) {
      // Handle any errors that may occur during the database query
      console.error('Error fetching pharmacological properties:', error);
      res.status(500).json({message: "Internal Server Error"})
     
    }
  };