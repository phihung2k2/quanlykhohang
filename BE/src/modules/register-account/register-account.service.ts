import { Injectable } from '@nestjs/common';
import { CreateRegisterAccountInput } from './dto/create-register-account.input';
import { UpdateRegisterAccountInput } from './dto/update-register-account.input';

@Injectable()
export class RegisterAccountService {
  create(createRegisterAccountInput: CreateRegisterAccountInput) {
    return 'This action adds a new registerAccount';
  }

  findAll() {
    return `This action returns all registerAccount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registerAccount`;
  }

  update(id: number, updateRegisterAccountInput: UpdateRegisterAccountInput) {
    return `This action updates a #${id} registerAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} registerAccount`;
  }
}
