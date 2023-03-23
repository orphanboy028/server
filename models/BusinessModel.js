const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema(
  {
    CompanyName: {
      type: String,
    },

    GstNumber: {
      type: String,
    },

    PanNumber: {
      type: String,
    },
    BusiessOwner: {
      type: String,
    },
  },
  { timestamps: true }
);

const Business = mongoose.model("Business", BusinessSchema);

module.exports = Business;
