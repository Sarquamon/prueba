//Importamos la libreria de mongoose
const mongoose = require("mongoose");

//Importo mi URL de mongo
const URL_MONGO =
  "mongodb+srv://admin:VZUQAaTr9wBgU5Jx@devfcintaroja-lmcx2.mongodb.net/test?retryWrites=true&w=majority";

//Se conecta y se verifica mi conexion con la base de datos
mongoose.connect(URL_MONGO, {useNewUrlParser: true}, err => {
  if (!err) {
    console.log("Conexion exitosa con mongoDB");
  } else {
    console.log(`Shiieeeet
    error: ${err}`);
  }
});

//Este es mi esquema
const Schema = mongoose.Schema;

// aca creamos el esquema y lo inicializamos
const exalumnosSchema = new Schema(
  {
    nombre: String,
    generation: Number,
    carrera: String,
    age: Number,
    currentJob: String,
    income: Number
  },
  {timestamps: true}
);

const schoolSchema = new Schema(
  {
    name: String,
    graduates: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exalumno"
        }
      ]
    }
  },
  {timestamps: true}
);

//Incializo mi modelo. Este es mi modelo
const exalumno = mongoose.model("Exalumno", exalumnosSchema);
const school = mongoose.model("School", schoolSchema);

module.exports = {
  exalumno,
  school
};
