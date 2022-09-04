import {model, Schema} from 'mongoose'

export interface IStudentCount {
    country: string
    overallStudents: number
}

const StudentCountSchema: Schema<IStudentCount> = new Schema({
    country: {
        type: String,
        required: true
    },
    overallStudents: {
        type: Number,
        required: true
    }
}, {
    collection: 'student_count',
    versionKey: false
})

export default model<IStudentCount>('student_count', StudentCountSchema)