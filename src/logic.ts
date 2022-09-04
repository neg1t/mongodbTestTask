import SchoolInfo, { ISchoolInfo } from './model/SchoolInfo'
import firstCollection from './collections/first.json'
import secondCollection from './collections/second.json'
import StudentCount, { IStudentCount } from './model/StudentCount'

const initializeDataToDatabase: Promise<void> = new Promise(async (resolve, reject) => {
    await StudentCount.create(secondCollection as IStudentCount[])
    await SchoolInfo.create(firstCollection as ISchoolInfo[])
    resolve()
})

const aggregationPipeline: Promise<void> = new Promise((resolve, reject) => {
    initializeDataToDatabase.then(async () => {
        await SchoolInfo.aggregate([
            {
                $lookup: {
                    from: 'student_count',
                    localField: 'country',
                    foreignField: 'country',
                    as: 'studentCounter',
                },
            },
            {
                $addFields: {
                    overallStudentsObject: { $arrayElemAt: ['$studentCounter', 0] },
                },
            },
            {
                $addFields: {
                    longitude: { $arrayElemAt: ['$location.ll', 0] },
                    latitude: { $arrayElemAt: ['$location.ll', 1] },
                    allDiffs: {
                        $map: {
                            input: '$students',
                            as: 's',
                            in: {
                                diff: { $subtract: ['$$s.number', '$overallStudentsObject.overallStudents'] },
                                year: '$$s.year',
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    longitude: 1,
                    latitude: 1,
                    allDiffs: 1,
                },
            },
            {
                $out: 'country_diff',
            },
        ])
        resolve()
    })
})

export default async () => {
    await aggregationPipeline
}
