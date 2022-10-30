import inquirer from "inquirer";
import { cac } from "cac";
const cli = cac("ntbot");

const requireLetterAndNumber = (value: string) => {
  if (/\w/.test(value) && /\d/.test(value)) {
    return true;
  }
  return "Password need to have at least a letter and a number";
};

cli.command("start", "Start the NTBot client.").action((options: any) => {
  console.log(options);
});

inquirer
  .prompt([
    {
      type: "input",
      name: "username",
      message: "Plz enter your Minecraft username",
    },
    {
      type: "input",
      name: "server",
      message: "Plz enter your Minecraft server",
      filter(val) {
        return val.toLowerCase();
      },
    },
    {
      type: "input",
      name: "port",
      message: "Plz enter your Minecraft port",
      validate(input) {
        if (/([0-9])/g.test(input)) {
          return true;
        }
        throw Error("Please provide a valid API key secret.");
      },
    },
    {
      type: "password",
      name: "password",
      mask: "*",
      message: "Plz enter your Minecraft user password",
      validate: requireLetterAndNumber,
    },
    {
      type: "list",
      name: "version",
      message: "What version do you need",
      choices: ["1.12.2", "1.16.3", "1.17.1"],
    },
  ])
  .then((answers) => {
    console.log(JSON.stringify(answers, null, "  "));
  });
// cli.help()
cli.parse();
