// import mongoose from "mongoose";

// const ticketSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId, // Reference to User collection
//       ref: "User",
//     },
//     source: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     destination: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     issuedAt: {
//       type: Date,
//       default: Date.now, // Automatically sets to the current date/time
//     },
//     expiredAt: {
//       type: Date,
//       default: function () {
//         return new Date(this.issuedAt.getTime() + 1 * 60 * 60 * 1000);
//       },
//     },
//     status: {
//       type: String,
//       enum: ["Active", "Cancelled", "Completed", "In Journey", "Expired"], // Track ticket status
//       default: "Active",
//     },
//     ticketToken: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//   },
//   {
//     timestamps: true, // Automatically add createdAt and updatedAt fields
//   }
// );

// // Ensure unique ticket token generation on each save
// ticketSchema.pre("save", function (next) {
//   if (!this.ticketToken) {
//     this.ticketToken = `TICKET-${Math.random()
//       .toString(36)
//       .substr(2, 9)
//       .toUpperCase()}`;
//   }
//   next();
// });

// ticketSchema.pre("save", function (next) {
//   const currentTime = new Date();
//   if (this.expiredAt < currentTime && this.status === "Active") {
//     this.status = "Expired";
//   }
//   next();
// });

// export const Ticket = mongoose.model("Ticket", ticketSchema);



import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ticketToken: {
    type: String,
    required: true,
    unique: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  via: {
    type: [String], // Array of station names
    default: [], // Optional, can be empty
  },
  price: {
    type: Number,
    required: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Expired", "In Journey", "Completed"],
    default: "Active",
  },
});

export const Ticket = mongoose.model("Ticket", ticketSchema);
