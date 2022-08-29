class User {
    constructor (name, lastName, books, pets) {
        this.name = name;
        this.lastName = lastName;
        this.books = books;
        this.pets = pets;
    }


    getFullName() {
        return `${this.name} ${this.lastName}`
    }

    addPets(petName){
        this.pets.push(petName)
        return this.pets
    }

    countPets() {
        return this.pets.length
    }

    addBooks(name, author) {
        const newObject = {
            name: name,
            author: author
        }
        this.books.push(newObject)
        return this.books
    }

    getBookNames() {
        return [...this.books].map(name => name.name)
    }
}

const user = new User('Elon', 'Musk', [{name: 'El señor de las moscas',author: 'William Golding'}, {name: 'Fundacion', author: 'Isaac Asimov'}], ['dog', 'cat'] )

console.log(user)
console.log(user.getFullName())
console.log(user.addPets('hamster'))
console.log(user.countPets())
console.log(user.addBooks('El Eternauta', 'Héctor Germán Oesterheld'))
console.log(user.getBookNames())