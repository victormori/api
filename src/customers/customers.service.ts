import { Injectable, NotFoundException } from "@nestjs/common";
import { UpsertDTO } from "./dto/upsert.dto";
import { findIndex } from "rxjs";

@Injectable()
export class CustomersService {
   private customers: Array<any>;
   // método especial - ele é chamado na criação
   constructor() {
     this.customers = [
        {
            "id": 1,
            "nome": "Félix",
            "email": "felix@gmail.com",
            "idade": 18
        },
        {
            "id": 2,
            "nome": "Gabriel",
            "email": "Gabriel@gmail.com",
            "idade": 25
        }
     ]
   }

   get() {
    return this.customers;
   }

   create(customer: UpsertDTO) {
     let id = 1;
     if(this.customers.length != 0) {
        id = this.customers[this.customers.length - 1].id + 1
     }
     this.customers.push({
      "id": id,
      ...customer
     });

     return {
        "message": "Salvo com sucesso"
     };
   }

   delete(id: number) {
      const position = this.customers.findIndex((customer) => customer.id == id);
      if (position == -1) {
         throw new NotFoundException('Cliente não encontrado!');
      }
      this.customers.splice(position, 1);

      return {
         'message': 'Deletado com sucesso!'
      }
   }

   update(id: number) {
      
   }
}