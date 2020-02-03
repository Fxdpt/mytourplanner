import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm'
import { User } from './User'
import { Event } from './Event'

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'longtext' })
    content: string

    @ManyToOne(type => User, user => user.messages)
    user: User

    @ManyToOne(type => Event, event => event.messages)
    event : Event

}