const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const { terminals } = vscode.window;
	const terminalsToOpen = {
		'@feedbax/frontend': '/workspace/feedbax/backend/packages/frontend',
		'@feedbax/server': '/workspace/feedbax/backend/packages/server',
		'@feedbax/api': '/workspace/feedbax/backend/packages/api',
		'@feedbax/prisma': '/workspace/feedbax/backend/packages/prisma',
		'@feedbax/common': '/workspace/feedbax/backend/packages/common',
	};

	vscode.window.onDidOpenTerminal((terminal) => {
		if (terminal.name === '') terminal.dispose();
	});

	for (let i = 0; i < terminals.length; i += 1) {
		const terminal = terminals[i];

		if (terminal.name in terminalsToOpen) {
			delete terminalsToOpen[terminal.name];
		}
	}

	const terminalsEntries = Object.entries(terminalsToOpen);

	for (let i = 0; i < terminalsEntries.length; i += 1) {
		const [name, path] = terminalsEntries[i];
		
		const terminal = vscode.window.createTerminal(name);

		terminal.sendText(`cd ${path}`);
		terminal.sendText(`export PS1='\\u${name}: '`);
		terminal.sendText("clear");
		terminal.show();	
	}
}

// eslint-disable-next-line no-undef
module.exports = {
	activate,
}
