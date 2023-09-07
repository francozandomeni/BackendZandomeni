
const fs = require('fs')

class UserManager {

        constructor(path) {
            this.path = path
        }

        async getUsers() {
            try {
                if(fs.existsSync(this.path)) {
                    const info = await fs.promises.readFile(this.path, 'utf-8')
                    return JSON.parse(info)
                } else {
                    return []
                }


            } catch (error) {
                return error
            }
        }

        async createUsers() {

        }
        async getUserById() {

        }

        async deleteUser() {

        }
}


async function test() {
    const manager1 = new UserManager('Users.json')
    const users = await manager1.getUsers()
    console.log(users)

}
test()
