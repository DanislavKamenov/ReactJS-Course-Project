const mongoose = require('mongoose');
const propertyIsRequired = '{0} is required.';
const encryption = require('../utils/encryption');
const roleService = require('../services/roleService');

const userSchema = mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        required: propertyIsRequired.replace('{0}', 'Email'),
        unique: true
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: propertyIsRequired.replace('{0}', 'Name'),
    },
    avatar: {
        type: mongoose.SchemaTypes.String,
        default: 'https://www.georeferencer.com/static/img/person.png'
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: propertyIsRequired.replace('{0}', 'Password'),
    },
    salt: {
        type: mongoose.SchemaTypes.String,
        required: propertyIsRequired.replace('{0}', 'Salt'),
    },
    roles: [{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Role',
        required: propertyIsRequired.replace('{0}', 'Role'),
    }],
    roleNames: [{
        type: String,
        required: propertyIsRequired.replace('{0}', 'RoleNames'),
    }],
    isAdmin: {
        type: Boolean,
        required: true
    },
    isSilenced: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    }
});

userSchema.method({
    authenticate: function (password) {
        let hashedPassword = encryption.generateHashedPassword(this.salt, password);

        if (hashedPassword === this.password) {
            return true;
        }
        return false;
    }
});

userSchema.pre('validate', function (next) {
    if (!this.salt) {
        this.salt = encryption.generateSalt();
        this.password = encryption.generateHashedPassword(this.salt, this.password);
        return next();
    }
    next();
});

userSchema.pre('validate', function(next) {
    roleService
        .get({_id: {$in: this.roles}})
        .then(roles => {
            const roleNames = roles.map(r => r.name);
            this.roleNames = roleNames;
            this.isAdmin = roleNames.includes('Admin');
            next();
        })
        .catch(console.log);
});

const User = mongoose.model('User', userSchema);

module.exports = User;