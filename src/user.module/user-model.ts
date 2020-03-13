import {ApiModelProperty} from '@nestjs/swagger';
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity({name: 'users'})
export class UserModel {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @Column({unique: true})
  oktaId: string;

  @ApiModelProperty()
  @Column({unique: true})
  userName: string;

  @ApiModelProperty()
  @Column()
  firstName: string;

  @ApiModelProperty()
  @Column()
  lastName: string;

  @ApiModelProperty()
  @Column()
  email: string;

  @ApiModelProperty()
  @Column()
  status: string;

  @ApiModelProperty()
  @Column({nullable:true})
  mobilePhone: string;

  // @OneToMany(() => PhotoModel, photo => photo.owner)
  // photos: Promise<Array<PhotoModel>>;
  //
  // @ManyToMany(() => UserModel, user => user.likedPhotos)
  // likedPhotos: Promise<Array<PhotoModel>>;
}
