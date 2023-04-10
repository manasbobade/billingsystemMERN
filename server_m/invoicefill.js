const mongoose = require("mongoose");

const InvoicesScehma = new mongoose.Schema(
  {
          customername:String,
          mobile:Number,
          item:String,
          price:Number,
          quantity:Number,
          totalbill:Number,
  },
  {
    collection: "Invoices",
  }
);

mongoose.model("Invoices", InvoicesScehma);