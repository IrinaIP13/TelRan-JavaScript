const userManager =  createUserManager();
let registrationForm = document.forms.registrationForm;
const errors = document.querySelector('#errors');
const registeredUsers = document.querySelector('.registeredUsers');

let activeFilter = 'all'
const buttonAll = document.createElement('button');
const buttonAdults = document.createElement('button');
const divButtons = document.createElement('div');
divButtons.append(buttonAll, buttonAdults);

function updateFilterButton() {
    buttonAll.classList.toggle('filter-active', activeFilter === 'all');
    buttonAdults.classList.toggle('filter-active', activeFilter === 'adults');
}

registrationForm.onsubmit = function(event)  {
    event.preventDefault();

    try {
        const objUser = Object.fromEntries(new FormData(event.target))
        objUser.age = +objUser.age;
        const newUser = createUser(objUser);
        userManager.addUser(newUser);
        errors.textContent = '';
        console.log('User successfully registered');
        arrayUsersToHTML(userManager.getUsers());
        event.target.reset();
    } catch (error) {
        console.error(error.message);
        errors.textContent = error.message;
    }finally {
        console.log('Registration attempt completed');
    }
}


function arrayUsersToHTML(arrayUsers) {

    registeredUsers.textContent = 'Registered Users (' + arrayUsers.length + '):';
    registeredUsers.append(divButtons);
    buttonAll.textContent = 'Show All';
    buttonAdults.textContent = 'Show Adults';

    arrayUsers.forEach(({name, age, id}) => {
        let p = document.createElement('p');
        let buttonDel = document.createElement('button');
        buttonDel.textContent = 'Delete';
        buttonDel.style.color = 'red';
        buttonDel.id = id;
        p.textContent = name + ', ' + age + ' years old';
        p.append(buttonDel);
        registeredUsers.append(p);

        buttonDel.addEventListener('click', (e) => {
            userManager.deleteUser(e.target.id);
            arrayUsersToHTML(userManager.getUsers());
        });
    })
}

buttonAll.addEventListener('click', event => {
    activeFilter = 'all';
    updateFilterButton()
    arrayUsersToHTML(userManager.getUsers());
})

buttonAdults.addEventListener('click', event => {
    activeFilter = 'adults';
    updateFilterButton()
    arrayUsersToHTML(userManager.getUsers().filter(user => user.age >= 18));
})

