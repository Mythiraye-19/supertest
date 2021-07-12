import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = 'bdb4ab06a87c91650cc4a14adc47a5c7cf472507c7721777bd6d025b71097d78';
import { expect } from 'chai';

describe('Users', () => {
    it('GET /users', () => {
        //request.get('users?access-token=${TOKEN}').end((err, res) => {
           //expect(res.body.data).to.not.be.empty; 
           //done();
        //});
        return request.get('users?access-token=${TOKEN}').then((res) => {
            expect(res.body.data).to.be.empty;
        });
    });


 it('GET/users/:id', async () => {
     const res = await request.get('users/17?access-token=${TOKEN}');
     expect(res.body.data.id).to.be.eq(17);
   });


   it('GET/users with query params', async () => {
       const url =  'users?access-token=${TOKEN}&page=5&gender=Female&status=Active';
      const res = await request.get(url);
       expect(res.body.data).to.not.be.empty;
       res.body.data.forEach((data) => {
           expect(data.gender).to.be.eq('Female');
           expect(data.status).to.be.eq('Active');

       });
   });
    it('POST /users',() => {
        const data = {
            email: 'test-op-4567@mail.ca',
            name: 'my name',
            gender: 'Male',
            status: 'Inactive',
        };
        return request
        .post('users')
        .set('Authorization', 'Bearer ${TOKEN}')
        .send(data)
        .then((res) => {
            console.log(res.body);
        });
    });

    it('PUT /users/:id',() => {
       const data = {
           status:'Active',
           name:'King',
       };
       return request
       .put('users/8')
       .set('Autorization', 'Bearer ${TOKEN}')
       .send(data)
       .then((res) =>{
           console.log(res.body);
       });
    });
    it('DELETE /users/:id', () => {
        return request
        .delete('users/45')
        .set('Autorization', 'Bearer ${TOKEN}')
        .then((res) => {
            expect(res.body.data).to.be.eq(null);
        });
    });
    
});
