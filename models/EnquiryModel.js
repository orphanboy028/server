const mongoose = require("mongoose");

const EnquerySchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// populate business
EnquerySchema.pre("find", function (next) {
  this.find()
    .populate({
      path: "product",
      model: "Products",
    })
    .populate({
      path: "user",
      model: "User",
    });
  next();
});
const Enquiries = mongoose.model("Enquiries", EnquerySchema);

module.exports = Enquiries;
