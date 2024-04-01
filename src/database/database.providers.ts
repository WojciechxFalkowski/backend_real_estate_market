import { DataSource } from 'typeorm'
import { DATA_SOURCE } from './database.contracts'
import { ConfigService } from '@nestjs/config'

// export const databaseProviders = [
//   {
//     provide: DATA_SOURCE,
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'mysql',
//         host: 'localhost',
//         port: 3306,
//         username: 'root',//newuser
//         password: '',//newuser1! lub puste
//         database: 'database_name',
//         entities: [
//           __dirname + '/../**/*.entity{.ts,.js}'
//         ],
//         synchronize: true,
//         logging: false
//       })

//       return dataSource.initialize()
//     }
//   }
// ]

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.root_user'),
        password: configService.get('database.root_password'),
        database: configService.get('database.database_name'),
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}'
        ],
        synchronize: true,
        logging: false
      })

      return dataSource.initialize()
    },
    inject: [ConfigService],
  }
]