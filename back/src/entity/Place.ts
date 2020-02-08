import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Event } from './Event'

@Entity()
export class Place {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    city: string

    @OneToMany(type => Event, events => events.place)
    events: Event[]

}