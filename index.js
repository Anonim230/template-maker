const configsToFiles = require('./lib/config')
const { writeFileSync, mkdirSync, readFileSync, existsSync } = require("fs");
const { join } = require("path");
// OS module and process
// const os = require("os")
// console.log(os.totalmem()/1024/1024);

const commands = process.argv.slice(2);
var commandList = {
    commands: () => ['file', 'read', 'web-project', 'server', 'graphql', 'react-app', 'help'],
    file: args => {
        let text = args[1] ? args.slice(1).join(' ') : []
        writeFileSync(args[0], JSON.stringify(text))
    },
    "web-project": args => {
        console.log(existsSync(__dirname, ...args))
        writeFileSync(join(__dirname, ...args, 'index.html'), configsToFiles['web-project'].html)
        mkdirSync(join(__dirname, ...args, 'src'))
        writeFileSync(join(__dirname, ...args, 'src', 'script.js'), configsToFiles['web-project'].js)
        mkdirSync(join(__dirname, ...args, 'src', 'styles'))
        writeFileSync(join(__dirname, ...args, 'src', 'styles', 'style.css'), configsToFiles['web-project'].css)
    },
    server: args => {
        writeFileSync(join(__dirname, ...args, 'index.js'), configsToFiles.server)
    },
    'react-app': args => {
        writeFileSync(join(__dirname, ...args, 'package.json'), configsToFiles['react-app'].package.replace('REPLACE_TEXT', args[args.length - 1]))
            // writeFileSync(join(__dirname, ...args, 'package-lock.json'), configsToFiles['react-app']['package-lock'].replace('REPLACE_TEXT', args[args.length - 1]))
        writeFileSync(join(__dirname, ...args, '.gitignore'), configsToFiles['react-app']['gitignore'])
        mkdirSync(join(__dirname, ...args, 'src'))
        mkdirSync(join(__dirname, ...args, 'public'))
        writeFileSync(join(__dirname, ...args, 'public', 'index.html'), configsToFiles['react-app'].public.index)
        writeFileSync(join(__dirname, ...args, 'public', 'manifest.json'), configsToFiles['react-app'].public.manifest)
        writeFileSync(join(__dirname, ...args, 'public', 'robots.txt'), configsToFiles['react-app'].public.robots)
        writeFileSync(join(__dirname, ...args, 'src', 'index.jsx'), configsToFiles['react-app'].src.index)
        writeFileSync(join(__dirname, ...args, 'src', 'App.jsx'), configsToFiles['react-app'].src.App)
    },
    graphql: args => {
        const REPLACE_TEXT = args[2] || 'user'
        writeFileSync(join(__dirname, ...args, 'server.js'), configsToFiles.graphql.server)
        writeFileSync(join(__dirname, ...args, 'config.js'), configsToFiles.graphql.config)
        mkdirSync(join(__dirname, ...args, 'lib'))
        writeFileSync(join(__dirname, ...args, 'lib', 'jwt.js'), configsToFiles.graphql.lib.jwt)
        writeFileSync(join(__dirname, ...args, 'lib', 'postgres.js'), configsToFiles.graphql.lib.postgres)
        mkdirSync(join(__dirname, ...args, 'model'))
        writeFileSync(join(__dirname, ...args, 'model', 'model.sql'), configsToFiles.graphql.model.model.replace('REPLACE_TEXT', REPLACE_TEXT))
        mkdirSync(join(__dirname, ...args, 'modules'))
        mkdirSync(join(__dirname, ...args, 'modules', REPLACE_TEXT))
        writeFileSync(join(__dirname, ...args, 'modules', REPLACE_TEXT, 'index.js'), configsToFiles.graphql.modules.index)

    },
    read: args => console.log(readFileSync(args[0], 'utf8')),
    help: () => console.log(`\x1b[37mYou can type \x1b[36m${commandList.commands().reduce((prev,curr) => prev + ', ' + curr)}\x1b[37m commands`),
    check_path: args => {
        const path = join(__dirname, ...args)
        let splitted_path = path.split('\\')
        let shadow_path = splitted_path.shift() + '\\'
        for (let i of splitted_path)
            if (!existsSync(shadow_path += `\\${i}`)) mkdirSync(shadow_path)
        return true
    }
};
var secondArg = [];
var lastCommand = false;
while (commands.length > 0) {
    let command = commands.shift();
    let isCommand = command.startsWith('-')
    if (isCommand) command = command.slice(1)
    if (!isCommand) secondArg.push(command.toString())
    else if (isCommand && command in commandList) {
        commandList.check_path(commands)
        if (lastCommand) lastCommand(secondArg)
        secondArg = [];
        lastCommand = commandList[command]
    }
    console.log(command, isCommand, command in commandList);
}
if (lastCommand) lastCommand(secondArg)
secondArg = []