const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    vigente: {
        type: Boolean,
        default: true
    }
});

MedicoSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.id = _id;
    return object
});

module.exports = model('Medico', MedicoSchema);