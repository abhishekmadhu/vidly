const { get } = require("lodash");


async function getSalt () {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash('1234', salt);
    console.log(salt, hashedPassword)
}

getSalt();

