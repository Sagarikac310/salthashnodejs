var crypto = require('crypto');

var creepy = function(clear){
    //Random salt
    let length = 16;
    let salt = crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);    

    //SHA
    let hash = crypto.createHmac("sha512",salt);
    hash.update(clear);
    return{
        salt:salt,
        hash:hash.digest('hex')
    }
};

var clearpass = "FOOBAR";
var creeped = creepy(clearpass);
console.log(creeped);

var validate = function(loginpass, hashedpass, salt)
{
    let hash = crypto.createHmac("sha512",salt);
     hash.update(loginpass);
     loginpass = hash.digest("hex");
     return loginpass ==  hashedpass;
};

var validated = validate("FOOBAR", creeped.hash, creeped.salt);
console.log(validated ? "YES" : "NO");
