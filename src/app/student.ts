export class GetStudent{
    id:string;
    firstName:string;
    lastName:string;
    age:number;
    constructor(id:string,firstName:string,lastName:string,age:number){
      this.id=id;
      this.firstName=firstName;
      this.lastName=lastName;
      this.age=age;
    }
  }

export class AddStudent{
  firstName:string;
  lastName:string;
  age:number;
  constructor(fname:string,lname:string,age:number){
    this.firstName=fname;
    this.lastName=lname;
    this.age=age;
  }
}