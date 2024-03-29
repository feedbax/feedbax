const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const closeAllTerminals = () => {
		const { terminals } = vscode.window;
		
		for (let i = 0; i < terminals.length; i += 1) {
			const terminal = terminals[i];
			terminal.dispose();
		}
	};

	const openTerminals = () => {
		const terminalsToOpen = {
			'@feedbax/frontend': '/workspace/feedbax/packages/frontend',
			'@feedbax/server': '/workspace/feedbax/packages/server',
			'@feedbax/api': '/workspace/feedbax/packages/api',
			'@feedbax/prisma': '/workspace/feedbax/packages/prisma',
			'@feedbax/common': '/workspace/feedbax/packages/common',
		};

		const terminalsEntries = Object.entries(terminalsToOpen);

		for (let i = 0; i < terminalsEntries.length; i += 1) {
			const [name, path] = terminalsEntries[i];
			
			const terminal = vscode.window.createTerminal(name);
	
			terminal.name = name;
			terminal.creationOptions.name = name;

			terminal.sendText(`cd ${path}`);
			terminal.sendText(`export PS1='[\\u${name}]$ '`);
			terminal.sendText("clear && history -c");
			terminal.show();
		}	
	};

	const resetTerminals = () => {
		closeAllTerminals();
		openTerminals();
	};

	context.subscriptions.push(
		vscode.commands.registerCommand('feedbax.terminals.open', () => openTerminals()),
		vscode.commands.registerCommand('feedbax.terminals.reset', () => resetTerminals())
	);
}

// eslint-disable-next-line no-undef
module.exports = {
	activate,
}
