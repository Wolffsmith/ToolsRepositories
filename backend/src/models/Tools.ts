import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tools')
class Tool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  description: string;

  @Column()
  tags: string;
}

export default Tool;
