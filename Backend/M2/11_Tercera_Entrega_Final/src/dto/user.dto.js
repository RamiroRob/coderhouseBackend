class UserDTO {
    constructor(user) {
        this.name = `${user.first_name} ${user.last_name}` || user.name
        this.email = user.email
        this.role = user.role
    }
}

export default UserDTO;

