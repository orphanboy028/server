const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  images: [
    {
      url: {
        type: String,
      },
      altText: {
        type: String,
      },
    },
  ],
  imageGallery: [
    {
      url: {
        type: String,
        required: true,
      },
      altText: {
        type: String,
        required: true,
      },
    },
  ],
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    min: 0,
  },
  category: {
    type: String,
  },
  subCategory: {
    type: String,
  },
  lefCategory: {
    type: String,
  },
  properties: {
    type: mongoose.Schema.Types.Mixed,
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

productSchema.pre("save", function (next) {
  // Access the user ID through `this.user`
  this.user = this.user || this.getQuery().user;
  next();
});

const Produts = mongoose.model("Products", productSchema);

module.exports = Produts;
