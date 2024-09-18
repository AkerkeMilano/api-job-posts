import {app} from './app'
import {SETTINGS} from './settings'
import { runDbMigrations } from './db/migrations'

const start = async () => {
    const connect = await runDbMigrations()
    if(!connect) {
        console.log("not connected to DB")
        process.exit(1)
    }

    app.listen(SETTINGS.PORT, () => {
        console.log('...server started in port ' + SETTINGS.PORT)
    })
}

start()