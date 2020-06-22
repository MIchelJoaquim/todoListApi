import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, BaseEntity } from 'typeorm';

@Injectable()
export class BaseService<T extends BaseEntity> {

    
}
