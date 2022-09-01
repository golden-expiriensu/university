import { Sex } from 'src/user/dto';

export const user = {
  alice: {
    email: 'alice@gmail.com',
    name: 'Alice',
    phone: '+447975000111',
    password: '150689',
    dateOfBirth: new Date('1989-15-06'),
    sex: Sex.Female,
  },
  bob: {
    email: 'bob@gmail.com',
    name: 'Bob',
    phone: '+447975000222',
    password: '290292',
    dateOfBirth: new Date('1992-29-02'),
    sex: Sex.Male,
  },
};
