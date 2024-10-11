const Sequence = require('@model/sequenceModel');
 
async function getNextSequence(modelName) {
    const sequenceDoc = await Sequence.findOneAndUpdate(
        { modelName: modelName },  
        { $inc: { sequenceValue: 125 } },  
        { new: true, upsert: true }  
    );

    return sequenceDoc.sequenceValue;
}