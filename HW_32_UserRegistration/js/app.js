const userManager =  createUserManager();
let registrationForm = document.forms.registrationForm;
const errors = document.querySelector('#errors');
const registeredUsers = document.querySelector('.registeredUsers');

registrationForm.onsubmit = function(event)  {
    event.preventDefault();

    try {
        const objUser = Object.fromEntries(new FormData(event.target))
        if (objUser.age === ''){
            throw new Error('Age is required');
        }
        objUser.age = +objUser.age;
        const newUser = createUser(objUser);
        userManager.addUser(newUser);
        errors.textContent = '';
        console.log('User successfully registered');
        arrayUsersToHTML(userManager.getUsers());
        event.target.reset();
    } catch (error) {
        errors.textContent = error.message;
    }finally {
        console.log('Registration attempt completed');
    }

}

function arrayUsersToHTML(arrayUsers) {
    registeredUsers.textContent = 'Registered Users:';
    arrayUsers.forEach(({name, age}) => {
        let p = document.createElement('p');
        p.textContent = name + ', ' + age + ' years old';
        registeredUsers.append(p);
    })
}