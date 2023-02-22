const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require('dotenv').config();

const options = {
apis: ['./documentation/auth.documentation.js', './documentation/users.schemas.doc.js', './documentation/profiles.schemas.doc.js','./documentation/users.documentation.js','./documentation/tags.schemas.doc.js','./documentation/votes.schemas.doc.js',
'./documentation/publications.schemas.doc.js','./documentation/publications_types.documentation.js','./documentation/publications_types.schemas.doc.js'],
definition:{
	openapi: "3.0.0",
	info : {
		title: "Api ParaCuando",
		version: "0.0.9",
		description: "API para aplicación CRUD"
	}
}
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, PORT) => {
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/docs.json", (req, res) =>{
	res.setHeader({"Content-Type" : "application/json"});
	res.send(swaggerSpec)
});
console.log(`La documentación está disponible en ${process.env.URL}:${process.env.PORT}/api/v1/docs`)
};

module.exports = swaggerDocs;