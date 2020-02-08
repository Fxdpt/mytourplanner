import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, Unique} from 'typeorm'
import { Message } from './Message'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true})
    email: string

    @Column({ nullable:true })
    username: string

    @Column()
    password: string

    @OneToMany(type => Message, messages => messages.user)
    messages: User[]
    
}
