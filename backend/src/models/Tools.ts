import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// Utilizei o typeOrm para criação da model e controle das migrations
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
