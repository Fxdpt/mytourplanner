import { EntityRepository, Repository } from 'typeorm'
import {Event} from '../entity/Event'

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {

    findOneWithRelations(eventId:number){
        return this.findOne({
            where: {
                id: eventId
            },
            relations: ["place", "users", "bands"]
        })
    }

    findWithUsers(eventId:number){
        return this.findOne({
            where: {
                id: eventId
            },
            relations: ["users"]
        })
    }

    findAllWithRelations(){
        return this.find({ relations: ["place", "users", "bands"] })
    }
}