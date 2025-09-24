import type { IGymRepository } from '@/repositories/gyms-repository'

interface SearchGymsUseCaseRequest {
   query: string
   page: number
}

export class SearchGymsService {
   constructor(private gymsRepository: IGymRepository) {}

   async execute({ page, query }: SearchGymsUseCaseRequest) {
      const gyms = await this.gymsRepository.searchMany(query, page)

      return {
         gyms,
      }
   }
}
