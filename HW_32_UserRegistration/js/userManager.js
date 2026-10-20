function createUserManager() {
    let users = [];

    return {
        addUser: (user) => users.push(user),
        getUsers: () => [...users],
        deleteUser: (id) => {users = users.filter(user => user.id !== id)},
    }
}


