const Users = require('../models/Users'); // Import the Inventory model

// Get all inventory items
const getAllUsers = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAdmins = async(req,res)=>{
    try{
        const admins = await Users.find({role: {$in: ["ADMIN", "SUPERADMIN"]}});
        res.status(200).json(admins);
        console.log("ADMINS: ", admins)
    } catch (err){
        res.status(500).json({ message: err.message });
    }
};

const getClients = async(req,res)=>{
    try{
        const client = await Users.find({role: "CLIENT"});
        res.status(200).json(client);
        console.log("Clients: ", client)
    } catch (err){
        res.status(500).json({ message: err.message });
    }
};

const forApproval = async(req,res)=>{
    try{
        const for_approval = await Users.find({approved: false});
        res.status(200).json(for_approval);
        console.log("Pending Applications: ", for_approval)
    } catch (err){
        res.status(500).json({ message: err.message });
    }
};


// PLEASE DONATE FOR SPOTIFY PREMIUM 

// Exporting functions to be used in routes
module.exports = {
  getAllUsers,
  forApproval,
  getAdmins,
  getClients,

};
