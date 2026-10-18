function createUser({ username = '', age, ...rest }) {
    // Сейчас rest — пустой объект, так как форма содержит только name и age.
    // Предусмотрен для дополнительных свойств пользователя в будущем.
    username = username.trim();
    if (!username){
        throw new Error('Name is required');
    }
    if (120 < age || age < 0 || !Number.isInteger(age)){
        throw new Error('Invalid age');
    }

    return  {...rest, id: crypto.randomUUID(), name: username, age: age};
}
