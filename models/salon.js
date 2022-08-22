const mongoose = require("mongoose")
// CREATE SCHEMA
const service = new momgoose.Schema({
   hairCut: { womenHairCut: Number, menHairCut: Number, childrenHairCuts: Number },
   hairColor: { womenHairColor: Number, touch_up: Number,menHairColor: Number },
   face: { brows_threading: Number, brows_waxing: Number, men_brows: Number, upperLip: Number, chin: Number, neck: Number, fullFace:      Number },
   tinting: { browsTint: Number, eyeLashesTint: Number },
   eyeLashes: { natureLashes: Number, fullLashes: Number, touch_up: Number, strips: Number},
   facials: { expressFacial: Number, deluxeFacial: Number, acneFacial: Number, anti_agingFacial: Number},
   body_waxing: {underArms: Number, stomch: Number, chest: Number, womenBack: Number, mensBack: Number, menShoulders: Number, halfArms: Number, fullArms: Number, halfLegs: Number, fullLegs: Number, bikiniLine: Number, franchbikini: Number, fullBikini: Number, fullBody: Number }

});

// CREATE MODEL               COLLECTION  SCHEMA
const Service = mongoose.model("Service",serviceSchema);
module.exports = Service