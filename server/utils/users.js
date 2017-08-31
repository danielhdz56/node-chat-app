[{
    id: '',
    name: 'Daniel',
    room: 'My Room'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor () {
        this.users = []
    }
    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
}

module.exports = {Users}

// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old`;
//     }
// }

// var me = new Person('Daniel', 23);
// var description = me.getUserDescription();
// console.log(description);