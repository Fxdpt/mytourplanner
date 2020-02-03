import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export class Band {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true})
    picture: string

}