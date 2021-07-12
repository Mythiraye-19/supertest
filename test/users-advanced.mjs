import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
import { expect } from 'chai';
const TOKEN = '8e1667d3208580c1c49c75c3cb982fb674fe401df67eb6830673a4a86b382ec8';

describe('Users', () => {
    let userId;
  describe('POST',() => {
    it('/users',async () => {
        const data = {
            email: 'king56@mail.li',
            name: 'Silk',
            gender: 'Male',
            status: 'Active',
        };
        const res = await request
            .post('users')
            .set("Authorization", 'Beare r${TOKEN}')
            .send(data);
        console.log(res.body);
        userId = res.body.data.id;
        console.log(userId);
    });
    });  
    describe('GET', () => {
    it('/users', async () => {
        const res = await request.get('users?access-token=${TOKEN}');
        expect(res.body.data).to.not.be.empty;
    });


 it('/users/:id', async () => {
     const res = await request.get('users/17?access-token=${TOKEN}');
     expect(res.body.data.id).to.be.eq(userId);
   });


   it('/users with query params', async () => {
       const url =  'users?access-token=${TOKEN}&page=5&gender=Female&status=Active';
      const res = await request.get(url);
       expect(res.body.data).to.not.be.empty;
       res.body.data.forEach((data) => {
           expect(data.gender).to.be.eq('Female');
           expect(data.status).to.be.eq('Active');

       });
   });
});
describe('PUT',() =>{
    it('/users/:id',async () => {
       const data = {
           status:'Active',
           name:'King',
       };
       const res = await request
            .put('users/${userId}')
            .set('Authorization', 'Bearer ${TOKEN}')
            .send(data);
        console.log(res.body);
    });
    });
    describe('DELETE',() =>{
    it('/users/:id', async () => {
        const res = await request
            .delete('users/${userId}')
            .set('Authorization', 'Bearer ${TOKEN}');
        expect(res.body.data).to.be.eq(null);
    });
});
});
