import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm'
import { Message } from './Message'
import { Place } from './Place'
import { Band } from './Band'
import { User } from './User'

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'datetime'})
    date: Date

    @OneToMany( type => Message, messages => messages.event)
    messages: Message[]

    @ManyToOne( type => Place, place => place.events)
    place: Place

    @ManyToMany( type => Band)
    @JoinTable()
    bands: Band[]

    @ManyToMany(type => User)
    @JoinTable()
    users: User[]
}