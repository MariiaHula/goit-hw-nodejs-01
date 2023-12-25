const { program } = require("commander");
program
  .option("--action <type>")
  .option("--id <type>")
  .option("--name <type>")
  .option("--email <type>")
  .option("--phone <type>");

program.parse();

const argv = program.opts();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "listContacts":
      const allContactParams = await listContacts();
      return console.table(allContactParams);

    case "getContactById":
      const getContact = await getContactById(id);
      return console.log(getContact);

    case "addContact":
      const createdContact = await addContact({ name, email, phone });
      return console.log(createdContact);

    case "removeContact":
      const deletedContact = await removeContact(id);
      return console.log(deletedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
