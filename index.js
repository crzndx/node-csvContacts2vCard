//Converter Class
var Converter = require("csvtojson").core.Converter;
var fs = require("fs");
var vCard = require('vcards-js');

var csvFileName="./input.csv";
var fileStream=fs.createReadStream(csvFileName);
//new converter instance
var csvConverter=new Converter({constructResult:true, delimiter: ';'});

//create a new vCard
vCard = vCard();

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
    console.log(jsonObj); //here is your result json object

    jsonObj.forEach(function (data) {

        //set properties

        vCard.firstName = data.Vorname;
        vCard.lastName = data.Name;
        vCard.organization = 'FSI WINF IIS';
        vCard.cellPhone = data.Mobil;
        vCard.email = data.EMail;

        //save to file
        vCard.saveToFile('./vcards/'+data.Vorname+'-'+data.Name+'.vcf');

    });
});

//read from file
fileStream.pipe(csvConverter);