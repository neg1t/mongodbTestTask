import { model, Schema } from 'mongoose'

interface Student {
    year: number
    number: number
}

export interface ISchoolInfo {
    _id: string
    country: string
    city: string
    name: string
    location: {
        ll: number[]
    }
    students: Student[]
}

const StudentSchema: Schema<Student> = new Schema({
    year: {
        type: Number,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
})
const LocationSchema: Schema<{ll: number[]}> = new Schema({
    ll: {
        type: [Number],
        required: true
    }
})
const SchoolInfoSchema: Schema<ISchoolInfo> = new Schema({
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: LocationSchema,
        required: true,
    },
    students: {
        type: [StudentSchema],
        required: true
    }
}, {
    collection: 'school_info',
    versionKey: false
})

export default model<ISchoolInfo>('school_info', SchoolInfoSchema)