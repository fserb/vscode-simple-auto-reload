// eslint-disable-next-line
const vscode = require('vscode');

const CDP = require('chrome-remote-interface');

function debounce(func, wait, immediate = false) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

let currentTarget = null;
let config = null;

function request(obj = {}) {
  return Object.assign({
    "host": config.host,
    "port": config.port,
    "secure": config.secure
  }, obj);
}

const reload = debounce(async () => {
  if (currentTarget === null) return;
  console.log("RELOAD");

  const client = await CDP(request({target: currentTarget}));
  client.Page.reload();
}, 100);

function activate(context) {
  config = vscode.workspace.getConfiguration("vscode-simple-auto-reload");
  context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(
    async _doc => {
      console.log("SAVE");
      if (currentTarget === null) return;
      reload();
    }));

  context.subscriptions.push(vscode.commands.registerCommand(
    'vscode-simple-auto-reload.selectTab', async () => {
      const tabs = await CDP.List(request());

      const items = tabs.map(i => { return {
        label: i.title + " - " + i.url,
        url: i.url,
        wsurl: i.webSocketDebuggerUrl,
      }; });

      const sel = await vscode.window.showQuickPick(items);
      console.log(sel);
      if (sel) {
        vscode.window.showInformationMessage('Auto reloading: ' + sel.label);
        currentTarget = sel.wsurl;
      }
    }));

  context.subscriptions.push(vscode.commands.registerCommand(
    'vscode-simple-auto-reload.stop', async () => {
      currentTarget = null;
      vscode.window.showInformationMessage('Auto reload stopped');
    }));
}

// this method is called when your extension is deactivated
function deactivate() {}

// eslint-disable-next-line
module.exports = {
  activate,
  deactivate
};
