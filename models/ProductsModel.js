const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
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
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  lefCategory: {
    type: String,
    required: true,
  },
  properties: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
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
