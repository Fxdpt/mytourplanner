import { EntityRepository, Repository } from 'typeorm'
import {Message} from '../entity/Message'
import { Event } from '../entity/Event'

@EntityRepository(Message)
export class MessageRepository extends Repository<Message>{

    findMessagesForEvent(event:Event){
        return this.find({ where: { event: event } })
    }

}