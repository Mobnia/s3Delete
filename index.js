var aws = require('aws-sdk');
var BUCKET = '<<S3_BUCKET>>';
aws.config.loadFromPath(require('path').join(__dirname, './aws-config.json'));
var s3 = new aws.S3();
//require json file with uploads collection
var file = require('./uploads');
var path = require('path');
var url = require("url");
var extension = "ini";

var key = [];
var objects = file.filter(filed => {
    var parsed =  url.parse(""+filed.url);
    //check file match extension
    var filename = path.basename(parsed.pathname);

     // for when there is an extension
     if(extension !==''){
         if(filename.indexOf(extension) !== -1){
             return key.push({"Key": ""+filename})
         }
     }
     else if(path.extname(filename)===''){
         return key.push({"Key": ""+filename})
     }

});
var count =0;
for (keyed in key){
    var params = {
        Bucket: BUCKET,
        Delete: { // required
            Objects: [key[keyed]],
        },
    };
console.log(JSON.stringify(params));
   /*s3.deleteObjects(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });*/
   count ++;
}
console.log(count);
