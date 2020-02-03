import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from 'typeorm'
import { Message } from './Message'
import { Event } from './Event'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column({ nullable:true })
    username: string

    @Column()
    password: string

    @OneToMany(type => Message, messages => messages.user)
    messages: User[]
    
}
