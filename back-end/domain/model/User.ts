class User {
    name: string;

    constructor(user:{name: string}) {
      this.name = user.name;
    }
  
    equals(otherUser: User): boolean {
      return this.name === otherUser.name;
    }
  }
  