//CRUD CREATE READ UPDATE DELETE
//IMPORTAMOS TODAS LAS LIBRERIAS NECESARIAS PARA EL PROYECTO COMO EXPRESS Y BODY-PARSER QUE VIENE DENTRO DE EXPRESS
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); //CON ESTO NUESTRA API PUEDE SERVIR A OTROS LADOS
const {exalumno, school} = require("./exalumnos");

const PORT = process.env.PORT || 2000; //DECLARAMOS EL PUERTO QUE SE ESTARÁ USANDO PARA EL LOCALHOST

const app = express(); //INICIALIZAMOS NUESTRA APP CON EXPRESS

app.use(cors()); //INICIALIZAMOS CORS
app.use(bodyParser.urlencoded({extended: true})); //ACA SE DECLARAN UTILIDADES DE BODYPARSER PARA MANTENER ACTUALIZADO LOS LINKS DE MONGODB
app.use(bodyParser.json()); // Y DESPUES SE PARSEA A UN JSON

//Aca se declaran mis endpoints
app.get("/", (request, response) => {
  response.send("<h1>weyes</h1>");
});

app.post("/create/graduate", (request, response) => {
  const {nombre, generation, carrera, age, currentJob, income} = request.body;
  // const everyKeyObj = request.body; //Acá guardo todo el objeto, no llaves especificas

  const newGraduate = exalumno({
    nombre,
    generation,
    carrera,
    age,
    currentJob,
    income
  });

  // const newGraduate = exalumno(everyKeyObj); // Aca creo mi variable con su objeto

  newGraduate.save((err, graduate) => {
    !err ? response.status(201).send(graduate) : response.status(400).send(err);
  });
});

app.get("/all/graduate", (req, res) => {
  exalumno
    .find() //Si quiero hacer una query esp. es con find({nombre: "Salomon"})
    .exec()
    .then(exalumno => res.status(200).send(exalumno))
    .catch(err => res.status(409).send(err));
});

app.get("/graduate/:id", (req, res) => {
  const {id} = req.params;
  exalumno
    .findById(id)
    .exec()
    .then(exalumno => res.status(200).send(exalumno))
    .catch(err => res.status(409).send(err));
});

app.get("/all/schools", (req, res) => {
  school
    .find()
    .exec()
    .then(school => res.status(200).send(school))
    .catch(err => res.status(409).send(err));
});

app.get("/school/:id", (req, res) => {
  const {id} = req.params;
  school
    .findById(id)
    .populate("graduates") //populate me sirve para obtener informacion dependiendo del id
    .exec()
    .then(school => res.status(200).send(school))
    .catch(err => res.status(409).send(err));
});

app.post("/create/school", (req, res) => {
  const {nombre, graduates} = req.body;
  const newSchool = school({
    nombre,
    graduates
  });

  newSchool.save((err, body) => {
    !err ? res.status(200).send(body) : res.status(409).send(err);
  });
});

app.listen(PORT, () => {
  console.log(`Server iniciado en ${PORT}`);
});
