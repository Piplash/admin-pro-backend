const mongoose = require('mongoose');
console.log('Mongoose Version: ', mongoose.version)

const dbConnection = async (cnv) => {

    try{
        await mongoose.connect(cnv);
        console.log('DB Online');
    } catch( error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar BD');
    }
}

module.exports = {
    dbConnection
}
