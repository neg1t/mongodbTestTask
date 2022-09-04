import { model, Schema } from 'mongoose'

interface Diff {
    year: number
    diff: number
}

interface ICountryDiff {
    _id: string
    longitude: number
    latitude: number
    allDiffs: Diff[]
}

const DiffSchema: Schema<Diff> = new Schema({
    year: {
        type: Number,
        required: true
    },
    diff: {
        type: Number,
        required: true
    }
})

const CountryDiffSchema: Schema<ICountryDiff> = new Schema({
    _id: {
        unique: false
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    allDiffs: {
        type: [DiffSchema],
        required: true
    }
}, {
    collection: 'country_diff',
    versionKey: false
})

export default model<ICountryDiff>('country_diff', CountryDiffSchema)