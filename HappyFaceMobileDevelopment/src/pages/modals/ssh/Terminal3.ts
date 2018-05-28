import * as xterm from "./exterm.js";
import * as fit from "./fit";
import {SSH3Wrapper} from "./SSH3-Wrapper";
import {Crypt} from "./Crypt";
import {PassModal} from "./pass-modal";
import {ModalController} from "ionic-angular";

export class Terminal3
{
    term = null;
    sshInteractive:boolean = false;
    activeProg:(command:string) => void = null;
    closeProg:() => void = null;
    shellprompt:string = '$ ';

    ssh:SSH3Wrapper = null;

    constructor(container:string, private modalCtrl:ModalController)
    {
        new Crypt();

        const _self = this;
        let   value = "";

        const terminalContainer = document.getElementById(container);

        const term = xterm({
            cursorBlink: true,
            rows: 120
        });

        term.open(terminalContainer);

        //console.log(term.cols);

        /* Compute size */
        const h = (window.getComputedStyle(document.getElementsByClassName('xterm-rows')[0].firstElementChild).lineHeight).substring(0,2);
        const w = 75;

        const rows = Math.floor(+window.getComputedStyle(terminalContainer).height.replace(/\D+/g, "") / +h) -4;
        //console.log(rows);

        term.resize(w, rows);

        //console.log(term);

        term.prompt = function () {
            term.write('\r\n' + _self.shellprompt);
        };

        term.writeln('Welcome to the ssh terminal');
        term.writeln('It uses xterm.js as a local terminal emulation.');
        term.writeln('Type "ssh" to start a ssh connection,.');
        term.writeln('');
        term.prompt();

        term.on('key', (key, ev) => {
            const printable = (
                !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
            );
            if(ev.ctrlKey && ev.key === "c") // STRG + C
            {
                this.controlC();
                return;
            }

            if (ev.keyCode == 13) {
                this.handleCommand(value);
                value = "";
                term.prompt();
            } else if (ev.keyCode == 8) {
                // Do not delete the prompt
                if (term.x > 2) {
                    term.write('\b \b');
                    value = value.substring(0, value.length-1);
                }
            } else if (printable) {
                term.write(key);
                value += key;
            }
        });

        term.on('paste', function (data, ev) {
            term.write(data);
            value += data;
        });

        this.term = term;
    }

    handleCommand(command:string)
    {
        if(this.sshInteractive)
        {
            if(this.activeProg == null) return;
            this.ssh.send(command + "\n");
        }
        else {
            this.term.write("\n\r");
            let cmd = "";
            let args = [];
            if (command && command.trim()) {
                args = command.split(' ').filter(function(val, i) {
                    return val;
                });
                cmd = args[0].toLowerCase();
                args = args.splice(1); // Remove cmd from arg list.
            }

            switch (cmd)
            {
                case 'echo':
                    this.term.write(args.join(" "));
                    break;
                case 'date':
                    this.term.write("  " + new Date());
                    break;
                case 'ssh':
                    this.sshInteractive = true;
                    this.askForCredentials();
                    /*this.term.write("Start ssh connection");
                    this.ssh = new SSH3Wrapper(this.term, this.interactiveEnd.bind(this));
                    this.shellprompt = "";
                    this.activeProg = this.ssh.send;
                    this.closeProg = this.ssh.close;*/
                    break;
                case 'clear':
                    this.term.clear();
                    break;
                default:
                    this.term.write("   unknown commmand: " + cmd);
            }
        }
    }

    interactiveEnd()
    {
        console.log(this.ssh);
        this.sshInteractive = false;
        this.shellprompt = "$ ";
        this.term.prompt();
    }

    controlC()
    {
        if(this.sshInteractive)
            this.ssh.close();
    }

    askForCredentials()
    {
        this.term.write("Start ssh connection");

        let modal = this.modalCtrl.create(PassModal);
        modal.onDidDismiss(this.gotCredentials.bind(this));
        modal.present();
    }

    gotCredentials(data:any)
    {
        if(data == null || data.enter == undefined || !data.enter)
        {
            this.term.write("SSH connection aborted");
            return;
        }

        this.ssh = new SSH3Wrapper(this.term, this.interactiveEnd.bind(this), null, {
            host: data.host,
            port: data.port,
            username: data.user,
            password: data.pass
        });
        this.shellprompt = "";
        this.activeProg = this.ssh.send;
        this.closeProg = this.ssh.close;
    }
}
