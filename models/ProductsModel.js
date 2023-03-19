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
});

const Produts = mongoose.model("Products", productSchema);

module.exports = Produts;
