# Ving Schema
You'll find the schemas in `server/vingschema/schemas`. A schema looks like this:

```js
{
    kind: 'User',
    tableName: 'users',
    owner: ['$id', 'admin'],
    props: [
        ...baseSchemaProps,
        {
            type: "string",
            name: "username",
            required: true,
            unique: true,
            length: 60,
            default: '',
            db: (prop) => dbString(prop),
            zod: (prop) => zodString(prop),
            view: [],
            edit: ['owner'],
        },
    ],
}
```

## Creating a New Schema

Use the [CLI](cli.html) to generate a new schema skeleton to work from.

```bash
./ving.mjs --new=Foo
```

## Attributes

### kind
A string that represents the unique name of the schema and everything generated from it. 

### tableName 
A string that is name of the MySQL database table it will be stored in.

### owner
An array containing the method for determining who owns this object. Owners can be assigned special rights on `props`. The owner can be any field that contains a User ID, so in the case of the `User` schema, it can use its own id by specifying `$id`, but in another table it might be `$userId`. It can also contain any number of roles. By default there are two roles: `admin` and `developer`, but you could add more.

### props
All schemas should have the base props of `id`, `createdAt`, and `updatedAt` by using `...baseSchemaProps`. After that it's up to you to add your own props to the list. There are many different types of props for different field types.

Props all have the fields `type`, `name`, `required`, `default`, `db`, `zod`, `view`, and `edit`, but can have more or less fields from there.

#### Prop Privileges

The `view` and `edit` props are arrays that can:

- Be empty, if no one should be able to view or edit that prop
- Contain the special keyword `public`, if everyone should be able to view or edit that prop
- Contain any role (such as `admin`)
- Contain the special keyword `owner`, so that whoever was defined as the owner in the attributes of the schema can view or edit that prop

If a role can `edit` a prop it can automatically `view` a prop.

> Roles can be defined inside the `User` schema. They have to be added as a [boolean prop type](boolean-props), and then also added to the `RoleOptions` at the bottom of the file.

#### Prop Types

##### Boolean Props
```js
{
    type: "boolean",
    name: 'admin',
    required: true,
    default: false,
    db: (prop) => dbBoolean(prop),
    enums: [false, true],
    enumLabels: ['Not Admin', 'Admin'],
    view: ['owner'],
    edit: ['admin'],
},
```

##### Date Props
```js
{
    type: "date",
    name: "startAt",
    required: true,
    autoUpdate: true,
    default: () => new Date(),
    db: (prop) => dbDateTime(prop),
    view: ['public'],
    edit: [],
},
```

##### Enum Props
```js
{
    type: "enum",
    name: 'useAsDisplayName',
    required: true,
    length: 20,
    default: 'username',
    db: (prop) => dbEnum(prop),
    enums: ['username', 'email', 'realName'],
    enumLabels: ['Username', 'Email Address', 'Real Name'],
    view: [],
    edit: ['owner'],
},
```

##### Id Props
These are used to add a parent relationship.
```js
{
    type: "id",
    name: 'userId',
    required: true,
    length: 36,
    db: (prop) => dbRelation(prop),
    relation: {
        type: 'parent',
        name: 'user',
        kind: 'User',
    },
    default: undefined,
    view: ['public'],
    edit: ['owner'],
},
```

##### String Props

```js
{
    type: "string",
    name: "email",
    required: true,
    unique: true,
    length: 256,
    default: '',
    db: (prop) => dbString(prop),
    zod: (prop) => zodString(prop).email(),
    view: [],
    edit: ['owner'],
},

```

##### Virtual Props

These are used to add a child relationship.
```js
{
    type: "virtual",
    name: 'apikeys',
    required: false,
    view: ['public'],
    edit: [],
    relation: {
        type: 'child',
        name: 'apikeys',
        kind: 'APIKey',
    },
},
```

## Generate Drizzle Tables from Ving Schema

Now that you've created or updated your schema, you can generate [Drizzle](drizzle.html) tables from  with this command:

```bash
./ving.mjs schema --makeTables
```

> Note that you shouldn't ever need to modify these files directly. If you need to change them, update the ving schema and run the above command again.