const mongoose = require("mongoose")
 
// CREATE SCHEMA

const serviceSchema = new mongoose.Schema({
   hairCut: { womenHairCut: Number, menHairCut: Number, childrenHairCuts: Number },
   hairColor: { womenHairColor: Number, touch_up: Number,menHairColor: Number },
   face: { brows_threading: Number, brows_waxing: Number, men_brows: Number, upperLip: Number, chin: Number, neck: Number, fullFace:      Number },
   tinting: { browsTint: Number, eyeLashesTint: Number },
   eyeLashes: { natureLashes: Number, fullLashes: Number, touch_up: Number, strips: Number},
   facials: { expressFacial: Number, deluxeFacial: Number, acneFacial: Number, anti_agingFacial: Number},
   body_waxing: {underArms: Number, stomach: Number, chest: Number, womenBack: Number, mensBack: Number, menShoulders: Number, halfArms: Number, fullArms: Number, halfLegs: Number, fullLegs: Number, bikiniLine: Number, frenchBikini: Number, fullBikini: Number, fullBody: Number }

}); {timestamps: true }
//GLOBAL CONFIGURATION
// const mongoURI = "mongodb://127.0.0.1:127017" + "server"
// const db = mongoose.connection
// CREATE MODEL               COLLECTION  SCHEMA
const Service = mongoose.model("Service",serviceSchema);
module.exports = Service