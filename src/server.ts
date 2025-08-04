import { server } from '.'
import { env } from '../env/env'

server
   .listen({
      host: '0.0.0.0',
      port: env.PORT,
   })
   .then(() => {
      console.log('🚀 HTTPs server is Running ')
   })
