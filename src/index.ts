import mongoose from 'mongoose'
import databaseConfig from './config/databaseConfig'
import logic from './logic'

mongoose.connect(`${databaseConfig.url}/${databaseConfig.database}`)
    .then(() => {
        console.log('Successfully connected to MongoDB')
    })
    .catch(console.error)

logic()