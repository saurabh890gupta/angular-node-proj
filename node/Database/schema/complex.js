const userSchema = new Schema({
  UserID: {
    type: mongoose.Schema.Types.Mixed,
  },
  User_Info: {
    First_Name: {
      type: String,
    },
    Last_Name: {
      type: String,
    },
    Current_Address: {
      type: String,
    },
    Email_Address: {
      type: String,
    },
  },
      Phone_Numbers: [{
        Home_Phone: {
          type: Number,
        },
        Work_Phone: {
          type: Number,
        },
        Cell_Phone: {
          type: Number,
        },
            Phone_verified: [{
              Home: Boolean,
              Work: Boolean,
              Cell: Boolean,
            }],
      }],
})
