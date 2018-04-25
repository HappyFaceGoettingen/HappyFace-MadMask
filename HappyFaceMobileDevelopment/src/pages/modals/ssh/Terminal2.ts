import {SSH2Wrapper} from "./SSH2-Wrapper";
import {AlertController, ModalController, ViewController} from "ionic-angular";
import {DataModel} from "../../../data/DataModel";
import {PassModal} from "./pass-modal";

export class Terminal2
{
    ssh:boolean = false;
    outlet:boolean = false;
    sshWrapper:SSH2Wrapper = null;
    alertCtrl:AlertController = null;
    modalCtrl:ModalController = null;
    viewCtrl:ViewController = null;

    history_ = [];
    histpos_ = 0;
    histtemp_ = "";
    cmdLine_ = null;
    output_ = null;
    value = "";

    promt:string = "[usr@happy] # ";
    promtChangeCallback: (p:string) => void = null;

    CMDS_ = [
        'clear', 'date', 'echo', 'help', 'uname', 'whoami'
    ];

    constructor(cmdLineContainer, outputContainer, alertC, private model:DataModel,
                modalCtrl: ModalController, viewCtrl: ViewController) {

        //window.URL = window.URL || window.webkitURL;
        //window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

        this.cmdLine_ = document.querySelector(cmdLineContainer);
        this.output_ = document.querySelector(outputContainer);

        if(alertC != null && alertC != undefined) this.alertCtrl = alertC;
        else this.alertCtrl = null;

        if(modalCtrl != null && modalCtrl != undefined) this.modalCtrl = modalCtrl;
        else this.modalCtrl = null;

        if(viewCtrl != null && viewCtrl != undefined) this.viewCtrl = viewCtrl;
        else this.viewCtrl = null;

        /*let _this = this;
        window.addEventListener('click', function (e) {
            _this.cmdLine_.focus();
        }, false);*/

        //this.cmdLine_.addEventListener('click', this.inputTextClick_.bind(this), false);
        this.cmdLine_.addEventListener('keypress', this.valueHandler.bind(this), false);
        this.cmdLine_.addEventListener('keydown', this.backspaceHandler.bind(this), false);
        this.cmdLine_.addEventListener('keydown', this.historyHandler_.bind(this), false);
        this.cmdLine_.addEventListener('keydown', this.processNewCommand_.bind(this), false);

        /*this.util.toArray = function(list) {
            return Array.prototype.slice.call(list || [], 0);
        };*/
    }

    setPromtChange(callback: (p:string) => void)
    {
        this.promtChangeCallback = callback;
    }

    changePromt(str:string)
    {
        this.promt = str;
        if(this.promtChangeCallback != null && this.promtChangeCallback != undefined)
        {
            this.promtChangeCallback(this.promt);
        }
    }

    /*inputTextClick_()
    {
        this.cmdLine_.focus();
    }*/

    backspaceHandler(e)
    {
        if(e.keyCode == 8) {
            this.value = this.value.substring(0, this.value.length -1);
        }
    }

    valueHandler(e)
    {
        /* Deprecated
        if(!this.outlet)
        {
            if((e.keyCode > 31 && e.keyCode < 127) || (e.keyCode > 127 && e.keyCode < 255)) // Recognize only printable characters
            {
                this.value = this.value + String.fromCharCode(e.keyCode);
            }
        }*/

        if(!this.outlet)
        {
            if(e.key.length != null || e.key.length != undefined)
            {
                if(e.key.length == 1) this.value = this.value + e.key;
            }
            //console.log("KEY WAS: " + e.key + "  AND VALUE IS: " + this.value);
        }
    }

    historyHandler_(e) {
        if (this.history_.length) {
            if (e.keyCode == 38 || e.keyCode == 40) {
                if (this.history_[this.histpos_]) {
                    this.history_[this.histpos_] = this.value;
                } else {
                    this.histtemp_ = this.value;
                }
            }

            if (e.keyCode == 38) { // up
                this.histpos_--;
                if (this.histpos_ < 0) {
                    this.histpos_ = 0;
                }
            } else if (e.keyCode == 40) { // down
                this.histpos_++;
                if (this.histpos_ > this.history_.length) {
                    this.histpos_ = this.history_.length;
                }
            }

            if (e.keyCode == 38 || e.keyCode == 40) {
                this.value = this.history_[this.histpos_] ? this.history_[this.histpos_] : this.histtemp_;
                //this.value = this.value; // Sets cursor to end of input.
                this.cmdLine_.value = this.value;
            }
        }
    }

    processNewCommand_(e)
    {
        if(e.keyCode == 9) // TAB
            e.preventDefault();
        else if(e.keyCode == 13) // ENTER
        {
            // Save shell history.
            if (this.value) {
                this.history_[this.history_.length] = this.value;
                this.histpos_ = this.history_.length;
            }

            if(this.ssh)
            {
                let cmd:string = this.value + "\n";
                //let ret:string = this.ssh_mocfunc(cmd);
                //this.output(ret);
                if(this.sshWrapper == null || this.sshWrapper == undefined) this.output("");
                else {
                    this.sshWrapper.write(cmd);
                }
            }
            else {
                let cmd = "";
                let args = [];
                if (this.value && this.value.trim()) {
                    args = this.value.split(' ').filter(function(val, i) {
                        return val;
                    });
                    cmd = args[0].toLowerCase();
                    args = args.splice(1); // Remove cmd from arg list.
                }

                cmd = cmd.replace(/[^\x20-\x7F]/g, "");
                switch (cmd) {
                    case 'cat':
                        let url = args.join(' ');
                        if (!url) {
                            //this.output('Usage: ' + cmd + ' https://s.codepen.io/...\nExample: ' + cmd + ' https://s.codepen.io/AndrewBarfield/pen/LEbPJx.js');
                            this.output("Usage: " + cmd + " < url >\n Example: " + cmd +
                                " https://github.com/HappyFaceGoettingen/HappyFace-MadMask/blob/timon_development/HappyFaceMobileDevelopment/README.md");

                            break;
                        }
                        let _this = this;
                        let req:XMLHttpRequest = new XMLHttpRequest();
                        req.onreadystatechange = function() {
                            if(req.readyState == 4) {
                                let encodedStr = req.responseText.replace(/[\u00A0-\u9999<>\&]/gim, (i) => {
                                    return '&#'+i.charCodeAt(0)+';';
                                });
                                _this.output('<pre>' + encodedStr + '</pre>');
                            }
                        };
                        break;
                    case 'clear':
                        this.output_.innerHTML = '';
                        this.value = '';
                        return;
                    case 'date':
                        this.output( new Date().toLocaleString() );
                        break;
                    case 'echo':
                        this.output( args.join(' ') );
                        break;
                    case 'help':
                        this.output('<div class="ls-files">' + this.CMDS_.join('<br>') + '</div>');
                        break;
                    case 'ssh':
                        this.moveToSSH();
                        break;
                    case 'uname':
                        this.output(navigator.appVersion);
                        break;
                    case 'whoami':
                        let result = "usr\n <img src=\"" + window.location + "\"><br><br>";
                        this.output(result);
                        break;
                    case 'exit':
                        if(this.viewCtrl != null) {
                            this.viewCtrl.dismiss();
                            break;
                        }
                        else break;
                    default:
                        if (cmd) {
                            this.output(cmd + ': command not found');
                        }
                }
            }

            window.scrollTo(0, Terminal2.getDocHeight_());
            this.value = ""; // Clear/setup line for next input.
        }
    }

    output(data:string)
    {
        // Convert to HTML
        data = data.replace(/\n/gi, "<br/>");
        console.log("CONVERTED DATA: " + data);

        // Duplicate current input and append to output section.
        let line = this.cmdLine_.parentNode.parentNode.cloneNode(true);
        line.removeAttribute('id');
        line.classList.add('line');
        let input = line.querySelector('input.cmdline');
        input.autofocus = false;
        input.readOnly = true;
        this.output_.appendChild(line);

        // Clear current input section
        this.cmdLine_.parentNode.parentNode.querySelector('input.cmdline').value = "";

        // Print out
        if(this.ssh) this.output_.insertAdjacentHTML('beforeEnd', data);
        else this.output_.insertAdjacentHTML('beforeEnd', '<p>' + data + '</p>');
    }

    moveToSSH()
    {
        if(this.sshWrapper == null || this.sshWrapper == undefined)
        {
            try { this.sshWrapper = new SSH2Wrapper(); }
            catch(error)
            {
                if(this.alertCtrl != null)
                {
                    if(this.model.isAndroid())
                    {
                        let alert = this.alertCtrl.create({
                            title: "SSH not available",
                            subTitle: "An unknown error makes SSH Cordova plugin unavailable.\nPlease use external " +
                            "clients like JuiceSSH, ConnectBot or Terminus.",
                            cssClass: "alertText",
                            buttons: ["OK"]
                        });
                        alert.present();
                    }
                    else if(this.model.isiOS()) {
                        let alert = this.alertCtrl.create({
                            title: "SSH not available (yet)",
                            subTitle: "The SSH plugin is not available in iOS for now. Our intelligent (and extraordinary good looking) " +
                            "team is already working on it, but for now please use external ssh clients like Terminus or iTerminal",
                            cssClass: "alertText",
                            buttons: ["OK"]
                        });
                        alert.present();
                    }
                    else {
                        let alert = this.alertCtrl.create({
                            title: "SSH not available (yet)",
                            subTitle: "The SSH client is in this version of HappyFaceMobile (probably the browser version) not available. " +
                            "Due to the limitations of portable web apps (pwa), this feature might not be included at all. Please use your " +
                            "linux terminal to connect.",
                            cssClass: "alertText",
                            buttons: ["OK"]
                        });
                        alert.present();
                    }
                }
                else {
                    console.log("ERROR: SSH plugin is missing.");
                }
                this.sshWrapper = null;
                this.output("");
                return;
            }
        }

        this.outlet = true;
        let modal = this.modalCtrl.create(PassModal);
        modal.onDidDismiss(this.gotSSHPass.bind(this));
        modal.present();
    }


    gotSSHPass(data:any)
    {
        this.outlet = false;
        if(data == null || data.enter == undefined || !data.enter){
            this.output("");
            return;
        }

        this.ssh = true;
        this.sshWrapper.host = data.host;
        this.sshWrapper.port = data.port;
        this.sshWrapper.username = data.user;
        this.sshWrapper.password = data.pass;
        this.sshWrapper.onData = (data:string) => { this.output(data); };
        this.sshWrapper.onError = (error:string) => { console.log("SSH ERROR: " + error);};
        this.sshWrapper.connect();
        this.changePromt("[usr@ssh] # ");
        this.output("");
    }

    static getDocHeight_() {
        let d = document;
        return Math.max(
            Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
            Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
            Math.max(d.body.clientHeight, d.documentElement.clientHeight)
        );
    }


    /*ssh_mocfunc(cmd:string)
    {
        if(cmd.charCodeAt(cmd.length -1) == 10) cmd = cmd.substring(0, cmd.length -1);
        switch(cmd)
        {
            case 'cat':
                return 'Print out the content\nLine1\nLine2\nLine3\nEnd of stream\n';
            case 'promt':
                this.changePromt("[usr@data] # ");
                return "";
            case 'exit':
                this.ssh = false;
                this.changePromt("[usr@html5] # ");
                return "";
            default:
                return cmd + ': Command not found'
        }
    }*/
}
